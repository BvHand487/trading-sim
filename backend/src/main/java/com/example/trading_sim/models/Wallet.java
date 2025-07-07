package com.example.trading_sim.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Table(name = "wallets")
public class Wallet
{
    @Id
    private Integer id;
    private String name;
    private Float balance;
    @Column("created_at")
    private Date createdAt;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column("user_id")
    private Integer userId;

    public Wallet() { }

    public Wallet(Integer id, Integer user_id, String name, Float balance, Date createdAt)
    {
        this.id = id;
        this.userId = user_id;
        this.name = name;
        this.balance = balance;
        this.createdAt = createdAt;
    }

    public Integer getId()
    {
        return this.id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public Integer getUserId()
    {
        return this.userId;
    }

    public void setUserId(Integer userId)
    {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getBalance()
    {
        return this.balance;
    }

    public void setBalance(Float balance)
    {
        this.balance = balance;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
