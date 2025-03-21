package com.example.cis4900.spring.template.housing.models;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.sql.Timestamp;


class LabourMarketTest {
    
    private LabourMarket labour;

    @BeforeEach
void setUp() {
    labour = new LabourMarket.Builder()
        .recNum(1)
        .survYear(2024)
        .survMnth(2)
        .lfsStat(3)
        .prov(4)
        .cma(5)
        .age12(6)
        .age6(7)
        .sex(8)
        .marStat(9)
        .educ(10)
        .mjh(11)
        .everWork(12)
        .ftptLast(13)
        .cowMain(14)
        .immig(15)
        .naics21(16)
        .noc10(17)
        .noc43(18)
        .hrlyEarn(19.5f)
        .unionStatus(20)
        .permTemp(21)
        .estSize(22)
        .firmSize(23)
        .durUnemp(24)
        .flowUnem(25)
        .schoolN(26)
        .eFamType(27)
        .finalWt(28.5f)
        .lastUpdated(new Timestamp(System.currentTimeMillis()))
        .build();
    }

    @Test
    void testGetters() {
        assertEquals(18, labour.getNoc43());
        assertEquals(5, labour.getCity());
    }

}
