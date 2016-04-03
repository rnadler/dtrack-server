package com.rdn.controllers;


import com.rdn.model.Entry;
import com.rdn.model.EntryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/v1/entries")
@Slf4j
class EntriesController {

    @Autowired
    private EntryRepository entryRepository;

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Entry> add(Authentication authentication, @RequestBody Entry input) {
        String userId = authentication.getName();
        Entry newEntry = new Entry(userId, input.getCreatedDateTime(), input.getType(), input.getValue());
        newEntry.setUnits(input.getUnits());
        Entry result = entryRepository.save(newEntry);
        log.debug("Added Entry: user=" + result.getUser() + " type=" + result.getType() + " id=" + result.getId());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(result.getId()).toUri());
        return new ResponseEntity<>(result, httpHeaders, HttpStatus.CREATED);

    }
    @RequestMapping(value = "/{entryId}", method = RequestMethod.DELETE)
    ResponseEntity<?>  deleteEntry(Authentication authentication, @PathVariable String entryId) {
        String userId = authentication.getName();
        HttpStatus status = HttpStatus.OK;
        boolean deleteIt = entryRepository.findByUserAndId(userId, entryId) != null;
        if (deleteIt) {
            entryRepository.delete(entryId);
        } else {
            status = HttpStatus.FORBIDDEN;
        }
        log.debug("Delete Entry: user=" + userId + " id=" + entryId + " deleted=" + deleteIt);

        return new ResponseEntity<>(null, null, status);
    }
    @RequestMapping(value = "/{entryId}", method = RequestMethod.GET)
    Entry readEntry(Authentication authentication, @PathVariable String entryId) {
        String userId = authentication.getName();
        Entry entry = entryRepository.findByUserAndId(userId, entryId);
        boolean foundEntry = entry != null;
        log.debug("Find Entry: user=" + authentication.getName() + " id=" + entryId + " found=" + foundEntry);
        return entry;
    }
    @RequestMapping(value = "/type/{typeId}", method = RequestMethod.GET)
    Collection<Entry> readEntriesByType(Authentication authentication, @PathVariable String typeId) {
        String userId = authentication.getName();
        List<Entry> entries = entryRepository.findByUserAndType(userId, typeId);
        log.debug("Find Entries by Type: user=" + userId + " type=" + typeId + " foundCount=" + entries.size());
        return entries;
    }

    @RequestMapping(method = RequestMethod.GET)
    Collection<Entry> readEntries(Authentication authentication) {
        String userId = authentication.getName();
        List<Entry> entries = entryRepository.findByUser(userId);
        log.debug("Find Entries for User: user=" + userId + " foundCount=" + entries.size());
        return entries;
    }
}

