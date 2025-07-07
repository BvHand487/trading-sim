package com.example.trading_sim.services;

import com.example.trading_sim.models.User;
import com.example.trading_sim.models.Wallet;
import com.example.trading_sim.repositories.UserRepository;
import com.example.trading_sim.repositories.WalletRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class WalletService
{
    private final WalletRepository repository;

    WalletService(WalletRepository repository)
    {
        this.repository = repository;
    }

    public List<Wallet> findAllByUserId(Integer userId)
    {
        return repository.findAllByUserId(userId);
    }

    public Optional<Wallet> findByIdAndUserId(Integer id, Integer userId)
    {
        return repository.findByIdAndUserId(id, userId);
    }

    public boolean existsByIdAndUserId(Integer id, Integer userId)
    {
        return repository.existsByIdAndUserId(id, userId);
    }

    public boolean existsById(Integer id) { return repository.existsById(id); }
    public List<Wallet> findAll() { return (List<Wallet>) repository.findAll(); }
    public Optional<Wallet> findById(Integer id) { return repository.findById(id); }
    public Wallet save(Wallet wallet) { return repository.save(wallet); }
    public void deleteById(Integer id) { repository.deleteById(id); }
}
