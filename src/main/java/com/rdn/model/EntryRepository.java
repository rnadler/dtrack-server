package com.rdn.model;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "entries", path = "entries")
public interface EntryRepository extends MongoRepository<Entry, String> {
    List<Entry> findByType(@Param("type") String type);
}
