package com.rdn;

import com.rdn.model.Entry;
import com.rdn.pages.AddEntry;
import com.rdn.pages.LoginPage;
import com.rdn.repositories.EntryRepository;
import com.rdn.utils.SeleniumTest;
import com.rdn.utils.TestContextInitializer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = DtrackApplication.class, initializers = TestContextInitializer.class)
@SeleniumTest
public class AddEntryTest {

    @Autowired
    private WebDriver driver;

    @Autowired
    private EntryRepository entryRepository;

    private LoginPage loginPage;
    private AddEntry addEntry;
    private WebDriverWait webDriverWait;

    @Before
    public void setUp() throws Exception {
        loginPage = PageFactory.initElements(driver, LoginPage.class);
        addEntry = PageFactory.initElements(driver, AddEntry.class);
        webDriverWait = new WebDriverWait(driver, 5);
        MainPageTest.waitForWebElementToBeVisible(webDriverWait, loginPage.getUserName());
    }

    @Test
    public void shouldSaveEntry() throws InterruptedException {
        LoginPageTest.loginSucessfully(loginPage);
        MainPageTest.waitForWebElementToBeVisible(webDriverWait, addEntry.getType());
        addEntry.getType().sendKeys("test1");
        addEntry.getValue().sendKeys("22.2");
        addEntry.getAddEntryButton().click();
        WebElement successMessage = addEntry.getSuccessMessage();
        MainPageTest.waitForWebElementToBeVisible(webDriverWait, successMessage);
        assertThat(successMessage.getText(), is("Success Message\nData was successfully added!"));
        List<Entry> entries = entryRepository.findByUserAndType("user", "test1");
        assertThat(entries.size(), is(1));
        assertThat(entries.get(0).getDoubleValue(), is(22.2));
    }

}
