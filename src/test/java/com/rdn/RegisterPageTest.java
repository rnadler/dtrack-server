package com.rdn;

import com.rdn.pages.LoginPage;
import com.rdn.pages.RegisterPage;
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
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Collections;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DtrackApplication.class, initializers = TestContextInitializer.class)
@SeleniumTest
public class RegisterPageTest {

    @Autowired
    private WebDriver driver;

    private RegisterPage registerPage;
    private WebDriverWait webDriverWait;

    @Before
    public void setUp() throws Exception {
        registerPage = PageFactory.initElements(driver, RegisterPage.class);
        LoginPage loginPage = PageFactory.initElements(driver, LoginPage.class);
        WebElement register = loginPage.getRegister();
        webDriverWait = new WebDriverWait(driver, 50);
        webDriverWait.until(ExpectedConditions.elementToBeClickable(register));
        register.click();
        waitForWebElementToBeVisible(registerPage.getLogin());
    }
    private void setLoginAndEmail(String login, String email) throws InterruptedException {
        registerPage.getLogin().sendKeys(login);
        registerPage.getEmail().sendKeys(email);
        registerPage.getPassword().sendKeys("A1b2c3!");
        registerPage.getConfirmPassword().sendKeys("A1b2c3!");
        registerPage.getRegisterButton().click();
    }
    private void waitForWebElementToBeVisible(WebElement webElement) {
        webDriverWait.until(ExpectedConditions.visibilityOfAllElements(Collections.singletonList(webElement)));
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
        waitForWebElementToBeVisible(registerPage.getLoginExistsMessage());
        assertThat(registerPage.getLoginExistsMessage().getText(), is("Login name already registered! Please choose another one."));
    }

    @Test
    public void testEmailExistsMessage() throws InterruptedException {
        setLoginAndEmail("user2", "user@localhost");
        waitForWebElementToBeVisible(registerPage.getEmailExistsMessage());
        assertThat(registerPage.getEmailExistsMessage().getText(), is("E-mail is already in use! Please choose another one."));
    }

    @Test
    public void testSuccessMessage() throws InterruptedException {
        setLoginAndEmail("user3", "user3@localhost");
        waitForWebElementToBeVisible(registerPage.getSuccessMessage());
        assertThat(registerPage.getSuccessMessage().getText(), is("Registration saved! Go to the Login page to sign in."));
    }

    @Test
    public void testDirtyUsername() {
        WebElement login = registerPage.getLogin();
        login.sendKeys("xx");
        login.clear();
        assertThat(registerPage.getUsernameDirtyMessage().getText(), is("Your username is required."));
        login.sendKeys("xx-yy");
        assertThat(registerPage.getUsernameDirtyMessage().getText(), is("Your username can only contain lower-case letters and digits."));
    }

    @Test
    public void testDirtyEmail() {
        WebElement email = registerPage.getEmail();
        email.sendKeys("xx");
        email.clear();
        assertThat(registerPage.getEmailDirtyMessage().getText(), is("Your e-mail is required."));
        email.sendKeys("xxyy");
        assertThat(registerPage.getEmailDirtyMessage().getText(), containsString("Your e-mail is required to be at least 5 characters."));
        email.sendKeys("zz");
        assertThat(registerPage.getEmailDirtyMessage().getText(), is("Your e-mail is invalid."));
    }

    @Test
    public void testDirtyPassword() {
        WebElement password = registerPage.getPassword();
        password.sendKeys("xx");
        password.clear();
        assertThat(registerPage.getPasswordDirtyMessage().getText(), is("Your password is required."));
        password.sendKeys("xxyy");
        assertThat(registerPage.getPasswordDirtyMessage().getText(), is("Your password is required to be at least 5 characters."));
    }

    @Test
    public void testDirtyConfirmPassword() {
        WebElement confirmPassword = registerPage.getConfirmPassword();
        confirmPassword.sendKeys("xx");
        confirmPassword.clear();
        assertThat(registerPage.getConfirmPasswordDirtyMessage().getText(), is("Your confirmation password is required."));
        confirmPassword.sendKeys("xxyy");
        assertThat(registerPage.getConfirmPasswordDirtyMessage().getText(), is("Your confirmation password is required to be at least 5 characters."));
    }
}