package com.example.trading_sim.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "wallets")
public class Wallet
{
    @Id
    private Integer id;
    private Integer user_id;
    private Float balance;


    public Wallet() {}

    public Wallet(Integer id, Integer user_id, Float balance)
    {
        this.id = id;
        this.user_id = user_id;
        this.balance = balance;
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
        return this.user_id;
    }

    public void setUserId(Integer user_id)
    {
        this.user_id = user_id;
    }

    public Float getBalance()
    {
        return this.balance;
    }

    public void setBalance(Float balance)
    {
        this.balance = balance;
    }
}
