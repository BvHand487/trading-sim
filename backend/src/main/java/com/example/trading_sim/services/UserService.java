package com.example.trading_sim.services;

import com.example.trading_sim.dtos.UserCredentials;
import com.example.trading_sim.models.User;
import com.example.trading_sim.models.Wallet;
import com.example.trading_sim.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;
    private final WalletService walletService;


    UserService(UserRepository repository, WalletService walletService)
    {
        this.repository = repository;
        this.walletService = walletService;
    }

    @Transactional
    public User createUserWithWallet(UserCredentials credentialsWithHashedPassword)
    {
        var user = new User(
                null,
                credentialsWithHashedPassword.getUsername(),
                credentialsWithHashedPassword.getPassword()
        );

        return createUserWithWallet(user);
    }

    @Transactional
    public User createUserWithWallet(User user)
    {
        User savedUser = repository.save(user);

        Wallet wallet = new Wallet();
        wallet.setUserId(savedUser.getId());
        wallet.setBalance(10000f);
        walletService.save(wallet);

        return savedUser;
    }

    public boolean existsByCredentials(UserCredentials credentials)
    {
        return repository.existsByCredentials(credentials.getUsername(), credentials.getPassword());
    }

    public boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public void deleteByUsername(String username) {
        repository.deleteByUsername(username);
    }


    public boolean existsById(Integer id) { return repository.existsById(id); }
    public List<User> findAll() { return (List<User>) repository.findAll(); }
    public Optional<User> findById(Integer id) { return repository.findById(id); }
    public User save(User user) { return repository.save(user); }
    public void deleteById(Integer id) { repository.deleteById(id); }
}
