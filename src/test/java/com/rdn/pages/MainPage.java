package com.rdn.pages;

import lombok.Getter;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class MainPage {

    @Getter
    @FindBy(id = "signout")
    private WebElement signoutButton;

    private final WebDriver driver;

    public MainPage(WebDriver driver) {
        this.driver = driver;
    }
}
