package com.example.trading_sim.repositories;

import com.example.trading_sim.models.Holding;
import com.example.trading_sim.models.Transaction;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoldingRepository extends CrudRepository<Holding, Integer>
{
    @Query("SELECT * FROM holdings WHERE wallet_id = :walletId")
    public List<Holding> findAllByWalletId(@Param("walletId") Integer walletId);

    @Modifying
    @Query("DELETE FROM holdings WHERE wallet_id = :walletId")
    public void deleteAllByWalletId(@Param("walletId") Integer walletId);

    @Query("SELECT * FROM holdings WHERE currency_id = :currencyId")
    public Optional<Holding> findByWalletIdAndCurrencyId(@Param("walletId") Integer walletId, @Param("currencyId") Integer currencyId);
}
