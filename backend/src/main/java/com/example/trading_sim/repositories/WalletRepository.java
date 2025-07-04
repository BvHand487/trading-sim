package com.example.trading_sim.repositories;

import com.example.trading_sim.models.Wallet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends CrudRepository<Wallet, Integer>
{
}
