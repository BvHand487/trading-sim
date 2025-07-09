package com.example.trading_sim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@EnableJdbcRepositories(basePackages = "com.example.trading_sim.repositories")
@SpringBootApplication(scanBasePackages = "com.example.trading_sim")
public class TradingSimApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(TradingSimApplication.class, args);
	}

}
