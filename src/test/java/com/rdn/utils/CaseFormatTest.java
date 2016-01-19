package com.rdn.utils;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CaseFormatTest {
    @Test
    public void convertsCamelCaseToLowerUnderscore() {
        assertThat(CaseFormat.toLowerUnderscore("LoginPageTest"))
                .isEqualTo("login_page_test");
    }
}
