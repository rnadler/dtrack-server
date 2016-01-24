package com.rdn;

import com.rdn.pages.LoginPage;
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
@WebIntegrationTest(value = "server.port=9000")
@SeleniumTest
public class LoginPageTest {

    @Autowired
    private WebDriver driver;

    private LoginPage loginPage;

    private String baseUrl;

    @Before
    public void setUp() throws Exception {
        loginPage = PageFactory.initElements(driver, LoginPage.class);
    }

    @Test
    public void hasLoginPageElements() {
        assertThat(loginPage.getTitle(), is("Data Tracker"));
        assertThat(loginPage.getUserName().getText(), is(""));
        assertThat(loginPage.getPassword().getText(), is(""));
    }
}