package com.rdn.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class Entry {
    @Id
    @Getter
    private String id;

    @Getter
    @Setter
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDateTime;

    @Getter
    @Setter
    private String type;

    @Getter
    @Setter
    private long value;
}

// $ curl -i -X POST -H "Content-Type:application/json" -d '{  "createdDateTime" : "2015-10-20T01:30:00.000", "type" : "sda1",  "value" : 20 }' http://localhost:8080/entries
// $ curl -X DELETE http://localhost:8080/entries/569ad677c8300779f47a8ce6