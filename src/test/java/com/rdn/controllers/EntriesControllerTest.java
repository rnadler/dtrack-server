package com.rdn.controllers;

import com.rdn.DtrackApplication;
import com.rdn.model.Entry;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.time.LocalDateTime;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DtrackApplication.class)
@WebIntegrationTest("server.port=0")  // random port
public class EntriesControllerTest {
    private RestTemplate rest;
    private LocalDateTime now;

    @Value("${local.server.port}")
    int port;

    private String getBaseUrl() {
        return String.format("http://localhost:%d/api/v1/entries", port);
    }

    @Before
    public void setUp() {
        String user = "user";
        rest = new TestRestTemplate(user, user);
        now = LocalDateTime.now();
    }

    @Test
    public void shouldGetEntriesForUser() {

        ResponseEntity<Entry[]> response = rest.getForEntity(getBaseUrl(), Entry[].class);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        for (Entry entry : response.getBody()) {
            assertThat(entry.getUser(), is("user"));
        }
    }

    private URI createEntry() {
        Entry entry = new Entry("", now, "intTest", "5.50");
        ResponseEntity<Entry> response = rest.postForEntity(getBaseUrl(), entry, Entry.class);
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        assertThat(response.getBody().getUser(), is("user"));
        return response.getHeaders().getLocation();
    }

    @Test
    public void shouldSaveEntry() {
        URI entryUri = createEntry();
        ResponseEntity<Entry> entryResponse = rest.getForEntity(entryUri, Entry.class);
        assertThat(entryResponse.getStatusCode(), is(HttpStatus.OK));
        assertThat(entryResponse.getBody().getUser(), is("user"));
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
