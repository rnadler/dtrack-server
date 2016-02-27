package com.rdn.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@RequiredArgsConstructor
public class Entry {
    @Id
    @Getter
    private String id;

    @Getter
    @NonNull
    private String user;

    @Getter
    @NonNull
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDateTime;

    @Getter
    @NonNull
    private String type;

    @Getter
    @NonNull
    private long value;

    @Getter
    @Setter
    private String units;
}

// $ curl -i -X POST -H "Content-Type:application/json" -d '{  "createdDateTime" : "2015-10-20T01:30:00.000", "type" : "sda1",  "value" : 20 }' http://localhost:8080/entries
// $ curl -X DELETE http://localhost:8080/entries/569ad677c8300779f47a8ce6