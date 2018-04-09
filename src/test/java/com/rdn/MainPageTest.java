package com.rdn;

import com.rdn.pages.LoginPage;
import com.rdn.pages.MainPage;
import com.rdn.utils.SeleniumTest;
import com.rdn.utils.TestContextInitializer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = DtrackApplication.class, initializers = TestContextInitializer.class)
@SeleniumTest
public class MainPageTest {

    @Autowired
    private WebDriver driver;

    private LoginPage loginPage;
    private MainPage mainPage;
    private WebDriverWait webDriverWait;

    @Before
    public void setUp() throws Exception {
        loginPage = PageFactory.initElements(driver, LoginPage.class);
        mainPage = PageFactory.initElements(driver, MainPage.class);
        webDriverWait = new WebDriverWait(driver, 5);
        waitForWebElementToBeVisible(webDriverWait, loginPage.getUserName());
    }
    public static void waitForWebElementToBeVisible(WebDriverWait waiter, WebElement webElement) {
//        waiter.until(ExpectedConditions.visibilityOfAllElements(Collections.singletonList(webElement)));
    }
    @Test
    public void testLogoutMessage() {
        LoginPageTest.loginSucessfully(loginPage);
        mainPage.getLogoutLink().click();
        assertThat(loginPage.getSuccessMessage().getText(), is("You have been logged out."));
    }

    @Test
    public void testNotification() throws InterruptedException {
        LoginPageTest.loginSucessfully(loginPage);
        webDriverWait.until(ExpectedConditions.elementToBeClickable(mainPage.getSendNotificationButton()));
        Thread.sleep(1000);  // Angular2 loads components asynchronously
        mainPage.getSendNotificationButton().click();
        waitForWebElementToBeVisible(webDriverWait, mainPage.getNotificationMessage());
        assertThat(mainPage.getNotificationMessage().getText().startsWith("Notification received"), is(true));
    }
}