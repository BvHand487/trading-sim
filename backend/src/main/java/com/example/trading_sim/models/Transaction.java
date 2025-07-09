package com.example.trading_sim.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Table(name = "transactions")
public class Transaction {
    @Id
    private Integer id;
    @Column("type")
    private TransactionType type;
    private Float quantity;
    private Float price;
    @Column("wallet_id")
    private Integer walletId;
    @Column("currency_id")
    private Integer currencyId;
    @Column("created_at")
    private Date createdAt;

    public Transaction() {}

    public Transaction(Integer id, TransactionType type, Float quantity, Float price, Integer walledId, Date createdAt)
    {
        this.id = id;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.walletId = walledId;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public Float getQuantity() {
        return quantity;
    }

    public void setQuantity(Float quantity) {
        this.quantity = quantity;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getWalletId() {
        return walletId;
    }

    public void setWalletId(Integer walletId) {
        this.walletId = walletId;
    }

    public Integer getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Integer currencyId) {
        this.currencyId = currencyId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
