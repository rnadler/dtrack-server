package com.rdn.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;

import java.lang.annotation.*;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;
import static org.springframework.test.context.TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS;

@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@TestExecutionListeners(listeners = SeleniumTestExecutionListener.class, mergeMode = MERGE_WITH_DEFAULTS)
@SpringBootTest(webEnvironment = DEFINED_PORT, properties = "server.port=9000")
public @interface SeleniumTest {

    Class<? extends WebDriver> driver() default FirefoxDriver.class;

    String baseUrl() default "http://localhost:9000";
}
