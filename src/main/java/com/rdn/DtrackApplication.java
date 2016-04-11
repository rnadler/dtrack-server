package com.rdn;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerInitializedEvent;
import org.springframework.context.ApplicationListener;

@SpringBootApplication
@Slf4j
public class DtrackApplication implements ApplicationListener<EmbeddedServletContainerInitializedEvent> {

	public static void main(String[] args) {
		SpringApplication.run(DtrackApplication.class, args);
	}

	@Override
	public void onApplicationEvent(EmbeddedServletContainerInitializedEvent event) {
		log.info("Server running on port " + event.getEmbeddedServletContainer().getPort());
	}
}
