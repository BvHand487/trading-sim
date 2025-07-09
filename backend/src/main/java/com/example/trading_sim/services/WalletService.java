package com.example.trading_sim.services;

import com.example.trading_sim.models.Transaction;
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
public class WalletService {
    private final WalletRepository repository;

    WalletService(WalletRepository repository) {
        this.repository = repository;
    }

    /*
    Since a user cant have 2 wallet with the same name - this function returns the next available unique name e.g:
    Wallet 1: "Wallet Name" then Wallet 2 will be "Wallet Name #2"
    Wallet 1: "Wallet Name #5" then Wallet 2 will be "Wallet Name #6"
    */
    private String getUniqueName(String baseName, Integer userId) {
        String walletName = baseName;
        int suffix = 2;

        while (existsByNameAndUsedId(walletName, userId)) {
            if (walletName.matches(".*#\\d+$")) {
                walletName = baseName.replaceAll("#\\d+$", "").trim();
            }

            walletName = baseName + " #" + suffix;
            suffix++;
        }

        return walletName;
    }

    public Wallet saveByUserId(Wallet wallet, Integer userId) {

        String uniqueName = getUniqueName(wallet.getName(), userId);
        wallet.setName(uniqueName);
        return repository.save(wallet);
    }


    public List<Wallet> findAllByUserId(Integer userId) {
        return repository.findAllByUserId(userId);
    }

    public Optional<Wallet> findByIdAndUserId(Integer id, Integer userId) {
        return repository.findByIdAndUserId(id, userId);
    }

    public boolean existsByIdAndUserId(Integer id, Integer userId) {
        return repository.existsByIdAndUserId(id, userId);
    }

    public boolean existsByNameAndUsedId(String name, Integer userId) {
        return repository.existsByNameAndUsedId(name, userId);
    }

    public Integer countByUserId(Integer userId) {
        return repository.countByUserId(userId);
    }

    public boolean existsById(Integer id) {
        return repository.existsById(id);
    }

    public List<Wallet> findAll() {
        return (List<Wallet>) repository.findAll();
    }

    public Optional<Wallet> findById(Integer id) {
        return repository.findById(id);
    }

    public Wallet save(Wallet wallet) {
        return repository.save(wallet);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
