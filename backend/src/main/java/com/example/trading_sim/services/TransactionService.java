package com.example.trading_sim.services;

import com.example.trading_sim.models.Transaction;
import com.example.trading_sim.models.Wallet;
import com.example.trading_sim.repositories.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionRepository repository;

    TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public List<Transaction> findAllByUserId(Integer userId) {
        return repository.findAllByUserId(userId);
    }

    public Optional<Transaction> findByIdAndUserId(Integer id, Integer userId) {
        return repository.findByIdAndUserId(id, userId);
    }

    public boolean existsByIdAndUserId(Integer id, Integer userId) {
        return repository.existsByIdAndUserId(id, userId);
    }

    public boolean existsById(Integer id) {
        return repository.existsById(id);
    }

    public List<Transaction> findAll() {
        return (List<Transaction>) repository.findAll();
    }

    public Optional<Transaction> findById(Integer id) {
        return repository.findById(id);
    }

    public Transaction save(Transaction transaction) {
        return repository.save(transaction);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
