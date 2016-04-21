package com.rdn;

import com.rdn.pages.LoginPage;
import com.rdn.pages.RegisterPage;
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
public class RegisterPageTest {

    @Autowired
    private WebDriver driver;

    private RegisterPage registerPage;
    private LoginPage loginPage;

    @Before
    public void setUp() throws Exception {
        registerPage = PageFactory.initElements(driver, RegisterPage.class);
        loginPage = PageFactory.initElements(driver, LoginPage.class);
        loginPage.getRegister().click();
        Thread.sleep(1000);
    }
    private void setLoginAndEmail(String login, String email) throws InterruptedException {
        registerPage.getLogin().sendKeys(login);
        registerPage.getEmail().sendKeys(email);
        registerPage.getPassword().sendKeys("A1b2c3!");
        registerPage.getConfirmPassword().sendKeys("A1b2c3!");
        registerPage.getRegisterButton().click();
        Thread.sleep(1000);
    }

    @Test
    public void hasRegisterPageElements() throws InterruptedException {
        assertThat(registerPage.getLogin().getText(), is(""));
        assertThat(registerPage.getEmail().getText(), is(""));
        assertThat(registerPage.getPassword().getText(), is(""));
        assertThat(registerPage.getConfirmPassword().getText(), is(""));
        assertThat(registerPage.getRegisterButton().isEnabled(), is(false));
    }

    @Test
    public void testUserExistsMessage() throws InterruptedException {
        setLoginAndEmail("user", "user@localhost");
        assertThat(registerPage.getLoginExistsMessage().getText(), is("Login name already registered! Please choose another one."));
    }

    @Test
    public void testEmailExistsMessage() throws InterruptedException {
        setLoginAndEmail("user2", "user@localhost");
        assertThat(registerPage.getEmailExistsMessage().getText(), is("E-mail is already in use! Please choose another one."));
    }

    @Test
    public void testSuccessMessage() throws InterruptedException {
        setLoginAndEmail("user3", "user3@localhost");
        assertThat(registerPage.getSuccessMessage().getText(), is("Registration saved! Go to the Login page to sign in."));
    }

}