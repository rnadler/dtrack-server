package com.rdn.model;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EntryRepository extends MongoRepository<Entry, String> {
    List<Entry> findByType(@Param("type") String type);
    List<Entry> findByUser(@Param("user") String user);
    List<Entry> findByUserAndType(@Param("user") String user, @Param("type") String type);
    Entry findByUserAndId(@Param("user") String user, @Param("id") String id);
}
