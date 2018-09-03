package com.rdn.config;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.rdn.model.util.JSR310DateConverters;
import lombok.extern.slf4j.Slf4j;
import org.mongeez.Mongeez;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.singletonList;


@Configuration
@Profile("!cloud")
@EnableMongoRepositories("com.rdn.repositories")
@Import(value = MongoAutoConfiguration.class)
@Slf4j
public class DatabaseConfiguration extends AbstractMongoConfiguration {

    private static final String MONGEEZ_MASTER_XML = "/config/mongeez/master.xml";

    private Mongo mongo;
    private MongoProperties mongoProperties;

    public DatabaseConfiguration(Mongo mongo, MongoProperties mongoProperties) {
        this.mongo = mongo;
        this.mongoProperties = mongoProperties;
    }

    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener() {
        return new ValidatingMongoEventListener(validator());
    }

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }

    @Override
    protected String getDatabaseName() {
        return mongoProperties.getDatabase();
    }

    @Bean
    public MongoCustomConversions customConversions() {
        List<Converter<?, ?>> converters = new ArrayList<>();
        converters.add(JSR310DateConverters.DateToZonedDateTimeConverter.INSTANCE);
        converters.add(JSR310DateConverters.ZonedDateTimeToDateConverter.INSTANCE);
        converters.add(JSR310DateConverters.DateToLocalDateConverter.INSTANCE);
        converters.add(JSR310DateConverters.LocalDateToDateConverter.INSTANCE);
        converters.add(JSR310DateConverters.DateToLocalDateTimeConverter.INSTANCE);
        converters.add(JSR310DateConverters.LocalDateTimeToDateConverter.INSTANCE);
        return new MongoCustomConversions(converters);
    }

    @Bean
    @Profile("!fast")
    public Mongeez mongeez() {
        log.debug("Configuring Mongeez: " + MONGEEZ_MASTER_XML);
        Mongeez mongeez = new Mongeez();
        mongeez.setFile(new ClassPathResource(MONGEEZ_MASTER_XML));
        mongeez.setMongo(mongo);
        mongeez.setDbName(mongoProperties.getDatabase());
        mongeez.process();
        return mongeez;
    }

    @Override
    public MongoClient mongoClient() {
        return new MongoClient(singletonList(new ServerAddress(
                mongoProperties.getHost(), mongoProperties.getPort())));
    }
}
