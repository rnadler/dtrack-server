package com.rdn.pages;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class RegisterPage {

    @Getter
    @FindBy(id = "login")
    private WebElement login;

    @Getter
    @FindBy(id = "email")
    private WebElement email;

    @Getter
    @FindBy(id = "password")
    private WebElement password;

    @Getter
    @FindBy(id = "confirmPassword")
    private WebElement confirmPassword;

    @Getter
    @FindBy(id = "passwordMismatchMessage")
    private WebElement passwordMismatchMessage;

    @Getter
    @FindBy(id = "emailExistsMessage")
    private WebElement emailExistsMessage;

    @Getter
    @FindBy(id = "loginExistsMessage")
    private WebElement loginExistsMessage;

    @Getter
    @FindBy(id = "failedMessage")
    private WebElement failedMessage;

    @Getter
    @FindBy(id = "successMessage")
    private WebElement successMessage;

    @Getter
    @FindBy(id = "registerButton")
    private WebElement registerButton;

    @Getter
    @FindBy(id = "usernameDirtyMessage")
    private WebElement usernameDirtyMessage;
    @Getter
    @FindBy(id = "emailDirtyMessage")
    private WebElement emailDirtyMessage;

    @Getter
    @FindBy(id = "passwordDirtyMessage")
    private WebElement passwordDirtyMessage;

    @Getter
    @FindBy(id = "confirmPasswordDirtyMessage")
    private WebElement confirmPasswordDirtyMessage;

    private final WebDriver driver;

    public RegisterPage(WebDriver driver) {
        this.driver = driver;
    }
}
