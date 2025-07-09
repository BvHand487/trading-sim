package com.example.trading_sim.controllers;

import com.example.trading_sim.models.*;
import com.example.trading_sim.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService service;
    private final WalletService walletService;
    private final HoldingService holdingService;
    private final CurrencyService currencyService;
    private final UserService userService;

    TransactionController(TransactionService service, WalletService walletService, HoldingService holdingService, CurrencyService currencyService, UserService userService) {
        this.service = service;
        this.walletService = walletService;
        this.holdingService = holdingService;
        this.currencyService = currencyService;
        this.userService = userService;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Transaction>> readAll(@AuthenticationPrincipal UserDetails details) {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        List<Transaction> transactions = service.findAllByUserId(user.get().getId());

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Transaction> readById(@PathVariable Integer id, @AuthenticationPrincipal UserDetails details) {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Optional<Transaction> transaction = service.findByIdAndUserId(id, user.get().getId());

        if (transaction.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(transaction.get(), HttpStatus.OK);
    }


    /*
    Handles a "BUY" or "SELL" action by the user.
    Doesnt verify prices for now.
    */
    @PostMapping
    @ResponseBody
    public ResponseEntity<Transaction> create(@RequestBody Transaction transaction, @AuthenticationPrincipal UserDetails details) {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Optional<Wallet> walletOpt = walletService.findByIdAndUserId(transaction.getWalletId(), user.get().getId());
        if (walletOpt.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        if (!currencyService.existsById(transaction.getCurrencyId()))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        // transaction is wrong
        if (transaction.getQuantity() <= 0 ||
                transaction.getPrice() <= 0 ||
                transaction.getWalletId() <= 0 ||
                transaction.getCurrencyId() <= 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Wallet wallet = walletOpt.get();

        Optional<Holding> holdingOpt = holdingService.findByWalletIdAndCurrencyId(wallet.getId(), transaction.getCurrencyId());
        Holding holding;
        if (holdingOpt.isEmpty())
            holding = new Holding(null, 0f, transaction.getCurrencyId(), wallet.getId());
        else
            holding = holdingOpt.get();

        float total = transaction.getQuantity() * transaction.getPrice();

        switch (transaction.getType()) {
            case BUY: {
                // user doesnt have the balance to buy
                if (total > wallet.getBalance())
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

                holding.setAmount(holding.getAmount() + transaction.getQuantity());
                wallet.setBalance(wallet.getBalance() - total);
            }
            break;

            case SELL: {
                // user doesnt have the holdings to sell
                if (transaction.getQuantity() > holding.getAmount())
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

                holding.setAmount(holding.getAmount() - transaction.getQuantity());
                wallet.setBalance(wallet.getBalance() + total);
            }
            break;
        }

        walletService.save(wallet);

        if (Math.abs(holding.getAmount()) < 1e-8f)
            holdingService.deleteByWalletIdAndCurrencyId(wallet.getId(), transaction.getCurrencyId());
        else
            holdingService.save(holding);

        transaction.setId(null);
        transaction.setCreatedAt(Date.from(Instant.now()));
        Transaction savedTransaction = service.save(transaction);

        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Transaction> deleteById(@PathVariable Integer id, @AuthenticationPrincipal UserDetails details) {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        if (!service.existsByIdAndUserId(id, user.get().getId()))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        service.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
