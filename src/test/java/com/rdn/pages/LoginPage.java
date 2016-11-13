package com.rdn.pages;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

import java.util.List;

public class LoginPage {

    @Getter
    @FindBy(how = How.NAME, using = "username")
    private WebElement userName;

    @Getter
    @FindBy(how = How.NAME, using = "password")
    private WebElement password;

    @Getter
    @FindBy(how = How.ID, using = "signin")
    private WebElement signInButton;

    @Getter
    @FindBy(id = "successMessage")
    private WebElement successMessage;

    @Getter
    @FindBy(id = "failureMessage")
    private WebElement failureMessage;

    @Getter
    @FindBy(id = "version")
    private WebElement version;

    @Getter
    @FindBy(id = "register")
    private WebElement register;

    private final WebDriver driver;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public String getTitle() {
        return driver.getTitle();
    }
}
