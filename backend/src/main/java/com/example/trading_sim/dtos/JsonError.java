package com.example.trading_sim.dtos;

/*
Represents an error in the form of the following JSON:
{
    "error": "..."
}
 */
public class JsonError
{
    private String error;

    public JsonError() {}

    public JsonError(String error)
    {
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
