package com.rdn.controllers;

import com.rdn.DtrackApplication;
import com.rdn.model.Entry;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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
@WebIntegrationTest("server.port=9000")
public class EntriesControllerTest {
    private final String BASE_URL = "http://localhost:9000/api/v1/entries";
    private RestTemplate rest;
    private LocalDateTime now;

    @Before
    public void setUp() {
        rest = new TestRestTemplate("user", "password");
        now = LocalDateTime.now();
    }

    @Test
    public void shouldGetEntriesForUser() {

        ResponseEntity<Entry[]> response = rest.getForEntity(BASE_URL, Entry[].class);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        for (Entry entry : response.getBody()) {
            assertThat(entry.getUser(), is("user"));
        }
    }

    private URI createEntry() {
        Entry entry = new Entry("", now, "intTest", "5.50");
        ResponseEntity<Entry> response = rest.postForEntity(BASE_URL, entry, Entry.class);
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
        TestRestTemplate adminRest = new TestRestTemplate("admin", "password");
        ResponseEntity<Entry> entryResponse = adminRest.getForEntity(entryUri, Entry.class);
        assertThat(entryResponse.getStatusCode(), is(HttpStatus.OK));
        assertThat(entryResponse.getBody() == null, is(true));
    }

    @Test
    public void shouldReadEntriesByType() {
        ResponseEntity<Entry[]> response = rest.getForEntity(BASE_URL + "/type/odd", Entry[].class);
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
