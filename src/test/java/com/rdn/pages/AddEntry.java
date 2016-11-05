package com.rdn.pages;

import lombok.Getter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class AddEntry {

    @Getter
    @FindBy(id = "type")
    private WebElement type;

    @Getter
    @FindBy(id = "value")
    private WebElement value;

    @Getter
    @FindBy(id = "addentry")
    private WebElement addEntryButton;
}
