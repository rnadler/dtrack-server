package com.rdn;

import com.rdn.pages.LoginPage;
import com.rdn.pages.RegisterPage;
import com.rdn.utils.SeleniumTest;
import com.rdn.utils.TestContextInitializer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Collections;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = DtrackApplication.class, initializers = TestContextInitializer.class)
@SeleniumTest
public class RegisterPageTest {

    private static final String XX = "xx";
    @Autowired
    private WebDriver driver;

    private RegisterPage registerPage;
    private WebDriverWait webDriverWait;

    @Before
    public void setUp() throws Exception {
        registerPage = PageFactory.initElements(driver, RegisterPage.class);
        LoginPage loginPage = PageFactory.initElements(driver, LoginPage.class);
        WebElement register = loginPage.getRegister();
        webDriverWait = new WebDriverWait(driver, 5);
        webDriverWait.until(ExpectedConditions.elementToBeClickable(register));
        register.click();
        waitForWebElementToBeVisible(registerPage.getLogin());
    }
    private void setLoginAndEmail(String login, String email, WebElement webElement) throws InterruptedException {
        registerPage.getLogin().sendKeys(login);
        registerPage.getEmail().sendKeys(email);
        registerPage.getPassword().sendKeys("A1b2c3!");
        registerPage.getConfirmPassword().sendKeys("A1b2c3!");
        registerPage.getRegisterButton().click();
        waitForWebElementToBeVisible(webElement);
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
        setLoginAndEmail("user", "user@localhost.com", registerPage.getLoginExistsMessage());
        assertThat(registerPage.getLoginExistsMessage().getText(), is("Login name already registered! Please choose another one."));
    }

    @Test
    public void testEmailExistsMessage() throws InterruptedException {
        setLoginAndEmail("user2", "user@localhost.com", registerPage.getEmailExistsMessage());
        assertThat(registerPage.getEmailExistsMessage().getText(), is("E-mail is already in use! Please choose another one."));
    }

    @Test
    public void testSuccessMessage() throws InterruptedException {
        setLoginAndEmail("user3", "user3@localhost.com", registerPage.getSuccessMessage());
        assertThat(registerPage.getSuccessMessage().getText(), is("Registration saved! Go to the Login page to sign in."));
    }

    private void sendAndClearChars(WebElement webElement, String chars) {
        webElement.sendKeys(chars);
        for (int i = 0; i < chars.length(); i++) {
            webElement.sendKeys(Keys.BACK_SPACE);
        }
    }
    @Test
    public void testDirtyUsername() {
        WebElement login = registerPage.getLogin();
        sendAndClearChars(login, XX);
        assertThat(registerPage.getUsernameDirtyMessage().getText(), is("Your username is required."));
        login.sendKeys("xx-yy");
        assertThat(registerPage.getUsernameDirtyMessage().getText(), is("Your username can only contain lower-case letters and digits."));
    }

    @Test
    public void testDirtyEmail() {
        WebElement email = registerPage.getEmail();
        sendAndClearChars(email, XX);
        assertThat(registerPage.getEmailDirtyMessage().getText(), is("Your e-mail is required."));
        email.sendKeys("xxyy");
        assertThat(registerPage.getEmailDirtyMessage().getText(), containsString("Your e-mail is required to be at least 5 characters."));
        email.sendKeys("xxxyzz@myhost");
        assertThat(registerPage.getEmailDirtyMessage().getText(), is("Your e-mail is invalid."));
    }

    @Test
    public void testDirtyPassword() {
        WebElement password = registerPage.getPassword();
        sendAndClearChars(password, XX);
        assertThat(registerPage.getPasswordDirtyMessage().getText(), is("Your password is required."));
        password.sendKeys("xxyy");
        assertThat(registerPage.getPasswordDirtyMessage().getText(), is("Your password is required to be at least 5 characters."));
    }

    @Test
    public void testDirtyConfirmPassword() {
        WebElement confirmPassword = registerPage.getConfirmPassword();
        sendAndClearChars(confirmPassword, XX);
        assertThat(registerPage.getConfirmPasswordDirtyMessage().getText(), is("Your confirmation password is required."));
        confirmPassword.sendKeys("xxyy");
        assertThat(registerPage.getConfirmPasswordDirtyMessage().getText(), is("Your confirmation password is required to be at least 5 characters."));
    }
}