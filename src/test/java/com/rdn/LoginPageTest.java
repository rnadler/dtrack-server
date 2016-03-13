package com.rdn;

import com.rdn.pages.LoginPage;
import com.rdn.pages.MainPage;
import com.rdn.utils.SeleniumTest;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DtrackApplication.class)
@SeleniumTest
public class LoginPageTest {

    @Autowired
    private WebDriver driver;

    private LoginPage loginPage;

    @Before
    public void setUp() throws Exception {
        loginPage = PageFactory.initElements(driver, LoginPage.class);
    }

    @Test
    public void hasLoginPageElements() {
        assertThat(loginPage.getTitle(), is("Data Tracker"));
        assertThat(loginPage.getUserName().getText(), is(""));
        assertThat(loginPage.getPassword().getText(), is(""));
        assertThat(loginPage.getVersion().getText().contains("."), is(true));
    }
    @Test
    public void testFailedLoginMessage() {
        loginPage.getUserName().sendKeys("badusername");
        loginPage.getPassword().sendKeys("badpassword");
        loginPage.getSignInButton().click();
        assertThat(loginPage.getInvalidMessage().getText(), is("Invalid username and password."));
    }

    public static void loginSucessfully(LoginPage page) {
        page.getUserName().sendKeys("user");
        page.getPassword().sendKeys("password");
        page.getSignInButton().click();
    }
}