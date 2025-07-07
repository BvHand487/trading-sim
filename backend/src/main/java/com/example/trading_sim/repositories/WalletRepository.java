package com.example.trading_sim.repositories;

import com.example.trading_sim.models.User;
import com.example.trading_sim.models.Wallet;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WalletRepository extends CrudRepository<Wallet, Integer>
{
    @Query("SELECT * FROM wallets WHERE user_id = :userId")
    public List<Wallet> findAllByUserId(@Param("userId") Integer userId);

    @Query("SELECT * FROM wallets WHERE id = :id AND user_id = :userId")
    public Optional<Wallet> findByIdAndUserId(@Param("id") Integer id, @Param("userId") Integer userId);

    @Query("SELECT COUNT(id) FROM wallets WHERE id = :id AND user_id = :userId")
    public boolean existsByIdAndUserId(@Param("id") Integer id, @Param("userId") Integer userId);
}
