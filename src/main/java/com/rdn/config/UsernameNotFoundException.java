package com.rdn.config;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UsernameNotFoundException extends org.springframework.security.core.userdetails.UsernameNotFoundException {
    public UsernameNotFoundException(String msg) {
        super(msg);
        log.debug(msg);
    }
}
