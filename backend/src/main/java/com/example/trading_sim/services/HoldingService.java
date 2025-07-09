package com.example.trading_sim.services;

import com.example.trading_sim.models.Currency;
import com.example.trading_sim.models.Holding;
import com.example.trading_sim.repositories.CurrencyRepository;
import com.example.trading_sim.repositories.HoldingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoldingService {

    private final HoldingRepository repository;

    public HoldingService(HoldingRepository repository)
    {
        this.repository = repository;
    }

    public List<Holding> findAllByWalletId(Integer walletId) {
        return repository.findAllByWalletId(walletId);
    }

    public void deleteByWalletIdAndCurrencyId(Integer walletId, Integer currencyId) {
        repository.deleteByWalletIdAndCurrencyId(walletId, currencyId);
    }

    public void deleteAllByWalletId(Integer walletId) {
        repository.deleteAllByWalletId(walletId);
    }

    public Optional<Holding> findByWalletIdAndCurrencyId(Integer walletId, Integer currencyId)
    {
        return repository.findByWalletIdAndCurrencyId(walletId, currencyId);
    }


    public boolean existsById(Integer id) { return repository.existsById(id); }
    public List<Holding> findAll() { return (List<Holding>) repository.findAll(); }
    public Optional<Holding> findById(Integer id) { return repository.findById(id); }
    public Holding save(Holding holding) { return repository.save(holding); }
    public void deleteById(Integer id) { repository.deleteById(id); }
}
