package com.example.trading_sim.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "currencies")
public class Currency
{
    @Id
    private Integer id;
    private String symbol;
    private String name;
    @Column("logo_url")
    private String logoUrl;


    public Currency() {}

    public Currency(Integer id, String symbol, String name, String logoUrl)
    {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.logoUrl = logoUrl;
    }

    public Integer getId()
    {
        return this.id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}
