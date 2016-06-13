package com.rdn.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;

/**
 * This exception is throw in case of a not activated user trying to authenticate.
 */
@Slf4j
public class UserNotActivatedException extends AuthenticationException {

    public UserNotActivatedException(String message) {
        super(message);
        log.debug(message);
    }

    public UserNotActivatedException(String message, Throwable t) {
        super(message, t);
        log.debug(message);
    }
}
