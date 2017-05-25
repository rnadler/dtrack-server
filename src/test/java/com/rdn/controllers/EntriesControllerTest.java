package com.rdn.controllers;

import com.rdn.DtrackApplication;
import com.rdn.model.Entry;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.net.URI;
import java.time.LocalDateTime;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = DtrackApplication.class, webEnvironment = RANDOM_PORT)
public class EntriesControllerTest {
    private static final String USER = "user";
    private TestRestTemplate rest;
    private LocalDateTime now;

    @Value("${local.server.port}")
    int port;

    private String getBaseUrl() {
        return String.format("http://localhost:%d/api/v1/entries", port);
    }

    @Before
    public void setUp() {
        rest = new TestRestTemplate(USER, USER);
        now = LocalDateTime.now();
    }

    @Test
    public void shouldGetEntriesForUser() {

        ResponseEntity<Entry[]> response = rest.getForEntity(getBaseUrl(), Entry[].class);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        for (Entry entry : response.getBody()) {
            assertThat(entry.getUser(), is(USER));
        }
    }

    private URI createEntry() {
        Entry entry = new Entry("", now, "intTest", "5.50");
        ResponseEntity<Entry> response = rest.postForEntity(getBaseUrl(), entry, Entry.class);
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        assertThat(response.getBody().getUser(), is(USER));
        return response.getHeaders().getLocation();
    }

    @Test
    public void shouldSaveEntry() {
        URI entryUri = createEntry();
        ResponseEntity<Entry> entryResponse = rest.getForEntity(entryUri, Entry.class);
        assertThat(entryResponse.getStatusCode(), is(HttpStatus.OK));
        assertThat(entryResponse.getBody().getUser(), is(USER));
        assertThat(entryResponse.getBody().getCreatedDateTime(), is(now));
        assertThat(entryResponse.getBody().getDoubleValue(), is(5.5));
    }

    @Test
    public void shouldNotAllowCrossUserEntryAccess() {
        URI entryUri = createEntry();
        String admin = "admin";
        TestRestTemplate adminRest = new TestRestTemplate(admin, admin);
        ResponseEntity<Entry> entryResponse = adminRest.getForEntity(entryUri, Entry.class);
        assertThat(entryResponse.getStatusCode(), is(HttpStatus.OK));
        assertThat(entryResponse.getBody() == null, is(true));
    }

    @Test
    public void shouldReadEntriesByType() {
        ResponseEntity<Entry[]> response = rest.getForEntity(getBaseUrl() + "/type/odd", Entry[].class);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        for (Entry entry : response.getBody()) {
            assertThat(entry.getType(), is("odd"));
        }
    }

    @Test
    public void shouldDeleteEntry() {
        URI entryUri = createEntry();
        rest.delete(entryUri);
        ResponseEntity<Entry> entryResponse = rest.getForEntity(entryUri, Entry.class);
        assertThat(entryResponse.getStatusCode(), is(HttpStatus.OK));
        assertThat(entryResponse.getBody() == null, is(true));
    }
    @Test
    public void shouldNotAllowCrossUserDelete() {
        URI entryUri = createEntry();
        TestRestTemplate adminRest = new TestRestTemplate("admin", "password");
        adminRest.delete(entryUri);
        ResponseEntity<Entry> entryResponse = rest.getForEntity(entryUri, Entry.class);
        assertThat(entryResponse.getStatusCode(), is(HttpStatus.OK));
        assertThat(entryResponse.getBody() == null, is(false));
    }
}
