package com.rdn.controllers;


import com.rdn.model.Entry;
import com.rdn.model.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1/entries")
class EntriesController {

    @Autowired
    private EntryRepository entryRepository;

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> add(Authentication authentication, @RequestBody Entry input) {
        String userId = authentication.getName();
        Entry newEntry = new Entry(userId, input.getCreatedDateTime(), input.getType(),input.getValue());
        newEntry.setUnits(input.getUnits());
        Entry result = entryRepository.save(newEntry);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(result.getId()).toUri());
        return new ResponseEntity<>(null, httpHeaders, HttpStatus.CREATED);

    }
    @RequestMapping(value = "/{entryId}", method = RequestMethod.DELETE)
    ResponseEntity<?>  deleteEntry(Authentication authentication, @PathVariable String entryId) {
        entryRepository.delete(entryId);
        return new ResponseEntity<>(null, null, HttpStatus.OK);
    }
    @RequestMapping(value = "/{entryId}", method = RequestMethod.GET)
    Entry readEntry(Authentication authentication, @PathVariable String entryId) {
        return entryRepository.findOne(entryId);
    }
    @RequestMapping(value = "/type/{typeId}", method = RequestMethod.GET)
    Collection<Entry> readEntriesByType(Authentication authentication, @PathVariable String typeId) {
        String userId = authentication.getName();
        return entryRepository.findByUserAndType(userId, typeId);
    }

    @RequestMapping(method = RequestMethod.GET)
    Collection<Entry> readEntries(Authentication authentication) {
        String userId = authentication.getName();
        return this.entryRepository.findByUser(userId);
    }
}

