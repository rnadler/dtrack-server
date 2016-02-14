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
    @FindBy(how = How.ID, using = "invalidMessage")
    private WebElement invalidMessage;

    @Getter
    @FindBy(how = How.ID, using = "logoutMessage")
    private WebElement logoutMessage;

    private final WebDriver driver;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public String getTitle() {
        return driver.getTitle();
    }
}
