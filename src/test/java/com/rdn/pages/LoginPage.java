package com.rdn.pages;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class LoginPage {

    @Getter
    @FindBy(how = How.NAME, using = "username")
    private WebElement userName;

    @Getter
    @FindBy(how = How.NAME, using = "password")
    private WebElement password;

    private final WebDriver driver;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public String getTitle() {
        return driver.getTitle();
    }
}
