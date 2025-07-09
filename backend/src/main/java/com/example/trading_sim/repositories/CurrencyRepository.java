package com.example.trading_sim.repositories;

import com.example.trading_sim.models.Currency;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyRepository extends CrudRepository<Currency, Integer>
{
}
