package com.example.trading_sim.controllers;

import com.example.trading_sim.models.User;
import com.example.trading_sim.models.Wallet;
import com.example.trading_sim.services.UserService;
import com.example.trading_sim.services.WalletService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/wallets")
public class WalletController {
    private final WalletService service;
    private final UserService userService;

    WalletController(WalletService service, UserService userService)
    {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Wallet>> readAll(@AuthenticationPrincipal UserDetails details)
    {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        List<Wallet> wallets = service.findAllByUserId(user.get().getId());

        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Wallet> readById(@PathVariable Integer id, @AuthenticationPrincipal UserDetails details)
    {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Optional<Wallet> wallet = service.findByIdAndUserId(id, user.get().getId());

        if (wallet.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(wallet.get(), HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Wallet> create(@RequestBody Wallet wallet, @AuthenticationPrincipal UserDetails details)
    {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        wallet.setId(null);
        wallet.setUserId(user.get().getId());
        Wallet savedWallet = service.save(wallet);

        return new ResponseEntity<>(savedWallet, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Wallet> put(@PathVariable Integer id, @RequestBody Wallet wallet, @AuthenticationPrincipal UserDetails details)
    {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        boolean exists = service.existsByIdAndUserId(id, user.get().getId());
        if (!exists)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        wallet.setId(id);
        wallet.setUserId(user.get().getId());
        Wallet savedWallet = service.save(wallet);

        return new ResponseEntity<>(savedWallet, HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Wallet> patch(@PathVariable Integer id, @RequestBody Map<String, Object> updates, @AuthenticationPrincipal UserDetails details)
    {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Optional<Wallet> walletOpt = service.findByIdAndUserId(id, user.get().getId());
        if (walletOpt.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Wallet wallet = walletOpt.get();

        updates.forEach((key, value) -> {
            switch (key) {
                case "name":
                    wallet.setName((String) value); break;
                case "balance":
                    wallet.setBalance(((Number) value).floatValue()); break;
            }
        });

        Wallet saved = service.save(wallet);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Wallet> deleteById(@PathVariable Integer id, @AuthenticationPrincipal UserDetails details)
    {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        if (!service.existsByIdAndUserId(id, user.get().getId()))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        service.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
