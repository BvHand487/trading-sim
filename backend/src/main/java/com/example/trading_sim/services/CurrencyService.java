package com.example.trading_sim.services;

import com.example.trading_sim.models.Currency;
import com.example.trading_sim.models.Transaction;
import com.example.trading_sim.repositories.CurrencyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {

    private final CurrencyRepository repository;

    public CurrencyService(CurrencyRepository repository)
    {
        this.repository = repository;
    }

    public boolean existsById(Integer id) { return repository.existsById(id); }
    public List<Currency> findAll() { return (List<Currency>) repository.findAll(); }
    public Optional<Currency> findById(Integer id) { return repository.findById(id); }
    public Currency save(Currency currency) { return repository.save(currency); }
    public void deleteById(Integer id) { repository.deleteById(id); }
}
