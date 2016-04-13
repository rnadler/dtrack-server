package com.rdn.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.rdn.model.util.LocalDateTimeDeserializer;
import com.rdn.model.util.LocalDateTimeSerializer;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@NoArgsConstructor
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
    private String value;

    @Getter
    @Setter
    private String units;

    public double getDoubleValue() {
        return Double.parseDouble(value);
    }
}

// $ curl -i -X POST -H "Content-Type:application/json" -d '{  "user" : "user", "createdDateTime" : "2015-10-20T01:30:00.000", "type" : "sda1",  "value" : "20.2" }' http://localhost:8080/entries
// $ curl -X DELETE http://localhost:8080/entries/569ad677c8300779f47a8ce6