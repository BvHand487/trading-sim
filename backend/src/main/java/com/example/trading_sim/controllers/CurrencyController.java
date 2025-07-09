package com.example.trading_sim.controllers;

import com.example.trading_sim.models.Currency;
import com.example.trading_sim.models.Transaction;
import com.example.trading_sim.services.CurrencyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/currencies")
public class CurrencyController
{
    private final CurrencyService service;

    public CurrencyController(CurrencyService service)
    {
        this.service = service;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Currency>> readAll()
    {
        List<Currency> currencies = service.findAll();

        return new ResponseEntity<>(currencies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Currency> readById(@PathVariable Integer id)
    {
        Optional<Currency> currency = service.findById(id);

        if (currency.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(currency.get(), HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Currency> create(@RequestBody Currency currency)
    {
        currency.setId(null);

        Currency savedCurrency = service.save(currency);
        return new ResponseEntity<>(savedCurrency, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Transaction> deleteById(@PathVariable Integer id)
    {
        if (!service.existsById(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        service.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
