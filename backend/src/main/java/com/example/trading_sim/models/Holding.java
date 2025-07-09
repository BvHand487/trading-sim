package com.example.trading_sim.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;


@Table(name = "holdings")
public class Holding
{
    @Id
    private Integer id;
    private Float amount;
    @Column("currency_id")
    private Integer currencyId;
    @Column("wallet_id")
    private Integer walletId;

    public Holding() {}

    public Holding(Integer id, Float amount, Integer currencyId, Integer walledId)
    {
        this.id = id;
        this.amount = amount;
        this.currencyId = currencyId;
        this.walletId = walledId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Integer getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Integer currencyId) {
        this.currencyId = currencyId;
    }

    public Integer getWalletId() {
        return walletId;
    }

    public void setWalletId(Integer walletId) {
        this.walletId = walletId;
    }
}
