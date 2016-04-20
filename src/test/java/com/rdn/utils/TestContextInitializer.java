package com.rdn.utils;

import com.mongodb.Mongo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;

@Slf4j
public class TestContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    @Override
    public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
        String dbName = "dtrack-server";
        log.info("Drop database: " + dbName);
        new Mongo("localhost:27017").dropDatabase(dbName);
    }
}
