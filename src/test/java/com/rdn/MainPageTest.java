package com.rdn;

import com.rdn.pages.LoginPage;
import com.rdn.pages.MainPage;
import com.rdn.utils.SeleniumTest;
import com.rdn.utils.TestContextInitializer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DtrackApplication.class, initializers = TestContextInitializer.class)
@SeleniumTest
public class MainPageTest {

    @Autowired
    private WebDriver driver;

    private LoginPage loginPage;
    private MainPage mainPage;

    @Before
    public void setUp() throws Exception {
        loginPage = PageFactory.initElements(driver, LoginPage.class);
        mainPage = PageFactory.initElements(driver, MainPage.class);
    }

    @Test
    public void testLogoutMessage() {
        LoginPageTest.loginSucessfully(loginPage);
        mainPage.getSignoutButton().click();
        assertThat(loginPage.getLogoutMessage().getText(), is("You have been logged out."));
    }

    @Test
    public void testNotification() throws InterruptedException {
        LoginPageTest.loginSucessfully(loginPage);
        Thread.sleep(1000); // time for websocket/STOMP subscription setup
        mainPage.getSendNotificationButton().click();
        Thread.sleep(1000); // time for server notification and UI update
        assertThat(mainPage.getNotificationMessage().getText().startsWith("Notification received"), is(true));
    }
}