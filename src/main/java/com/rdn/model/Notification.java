package com.rdn.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@NoArgsConstructor
@Getter
public class Notification {
    @NonNull
    private String user;
    @NonNull
    private String type;
}
