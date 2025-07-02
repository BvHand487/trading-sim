package com.example.trading_sim.entities;

public class User
{
    private Integer id;
    private String username;

    public User() {}

    public User(Integer id, String username)
    {
        this.id = id;
        this.username = username;
    }

    public Integer getId()
    {
        return this.id;
    }

    public String getUsername()
    {
        return this.username;
    }
}
