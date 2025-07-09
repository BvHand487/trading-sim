package com.example.trading_sim.repositories;

import com.example.trading_sim.models.Transaction;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Integer>
{
    @Query("SELECT * FROM transactions LEFT JOIN wallets ON transactions.wallet_id = wallets.id WHERE wallets.user_id = :userId")
    public List<Transaction> findAllByUserId(@Param("userId") Integer userId);

    @Query("SELECT * FROM transactions LEFT JOIN wallets ON transactions.wallet_id = wallets.id WHERE transactions.id = :id AND wallets.user_id = :userId")
    public Optional<Transaction> findByIdAndUserId(@Param("id") Integer id, @Param("userId") Integer userId);

    @Query("SELECT COUNT(*) FROM transactions LEFT JOIN wallets ON transactions.wallet_id = wallets.id WHERE transactions.id = :id AND wallets.user_id = :userId")
    public boolean existsByIdAndUserId(@Param("id") Integer id, @Param("userId") Integer userId);
}
