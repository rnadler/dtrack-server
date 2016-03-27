package com.rdn.model;

import com.rdn.DtrackApplication;
import org.apache.commons.lang3.RandomUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;

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
        createDataForUser("user", 0, QTY/2);
        createDataForUser("admin", QTY/2, QTY/2);
    }

    private void createDataForUser(String user, int start, int count) {
        DecimalFormat df = new DecimalFormat("#.##");
        df.setRoundingMode(RoundingMode.CEILING);
        for (int i = start; i < start + count; i++) {
            double value = i + RandomUtils.nextDouble(0.0, 0.99);
            Entry entry = new Entry(user, now.minusMinutes(i), i%2 == 0 ? "even" : "odd", df.format(value));
            entry.setUnits("sec");
            entryRepository.save(entry);
        }
    }
    private long getEntryValueAsLong(Entry entry) {
        return (long) entry.getDoubleValue();
    }

    @Test
    public void testEntrySave() {
        List<Entry> all = entryRepository.findAll();
        assertThat(all.size(), is(QTY));
        for (Entry entry : all) {
            assertThat(entry.getCreatedDateTime().until(now, ChronoUnit.MINUTES), is(getEntryValueAsLong(entry)));
        }
    }

    @Test
    public void testEntryFindByType() {
        List<Entry> entries = entryRepository.findByType("even");
        assertThat(entries.size(), is(QTY/2));
        entries = entryRepository.findByType("odd");
        assertThat(entries.size(), is(QTY/2));
    }
    @Test
    public void testEntryFindByUser() {
        List<Entry> entries = entryRepository.findByUser("user");
        assertThat(entries.size(), is(QTY/2));
        // TODO: Fix ordering issue (T-27) -- first 3 user entries are after the all the admin entries!?!
        //assertThat(getEntryValueAsLong(entries.get(0)), is(0L));
        entries = entryRepository.findByUser("admin");
        assertThat(entries.size(), is(QTY/2));
        assertThat(getEntryValueAsLong(entries.get(0)), is(QTY/2L));
    }
    @Test
    public void testEntryFindByUserAndType() {
        List<Entry> entries = entryRepository.findByUserAndType("user", "even");
        assertThat(entries.size(), is(QTY/4));
        // TODO: Same as above
        //assertThat(getEntryValueAsLong(entries.get(0)), is(0L));
        entries = entryRepository.findByUserAndType("admin", "even");
        assertThat(entries.size(), is(QTY/4));
        assertThat(getEntryValueAsLong(entries.get(0)), is(QTY/2L));
    }
}
