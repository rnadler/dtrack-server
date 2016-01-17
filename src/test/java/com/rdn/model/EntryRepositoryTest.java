package com.rdn.model;

import com.rdn.DtrackApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(DtrackApplication.class)
public class EntryRepositoryTest {

    @Autowired
    private EntryRepository entryRepository;

    private static final int QTY = 20;
    private LocalDateTime now;
    @Before
    public void setUp() {
        entryRepository.deleteAll();
        now = LocalDateTime.now();
        for (int i = 0; i < QTY; i++) {
            Entry entry = new Entry();
            entry.setCreatedDateTime(now.minusMinutes(i));
            entry.setType( i%2 == 0 ? "even" : "odd");
            entry.setValue(i);
            entryRepository.save(entry);
        }
    }

    @Test
    public void testEntrySave() {
        List<Entry> all = entryRepository.findAll();
        assertThat(all.size(), is(QTY));
        for (Entry entry : all) {
            assertThat(entry.getCreatedDateTime().until(now, ChronoUnit.MINUTES), is(entry.getValue()));
        }
    }

    @Test
    public void testEntryFindByType() {
        List<Entry> entries = entryRepository.findByType("even");
        assertThat(entries.size(), is(QTY/2));
        entries = entryRepository.findByType("odd");
        assertThat(entries.size(), is(QTY/2));
    }
}
