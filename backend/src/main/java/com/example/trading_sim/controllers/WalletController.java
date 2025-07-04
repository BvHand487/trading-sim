package com.example.trading_sim.controllers;

import com.example.trading_sim.models.Wallet;
import com.example.trading_sim.services.WalletService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/wallets")
public class WalletController implements ApiController
{
    private final WalletService service;

    WalletController(WalletService service)
    {
        this.service = service;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Wallet>> readAll()
    {
        List<Wallet> Wallets = (List<Wallet>) service.findAll();

        return new ResponseEntity<>(Wallets, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Wallet> readById(@PathVariable Integer id)
    {
        Optional<Wallet> Wallet = service.findById(id);

        if (Wallet.isPresent())
            return new ResponseEntity<>(Wallet.get(), HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Wallet> create(@RequestBody Wallet Wallet)
    {
        Wallet savedWallet = service.save(Wallet);

        return new ResponseEntity<>(savedWallet, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Wallet> put(@PathVariable Integer id, @RequestBody Wallet Wallet)
    {
        boolean existedBefore = service.existsById(id);
        Wallet.setId(id);
        Wallet savedWallet = service.save(Wallet);

        if (!existedBefore)
            return new ResponseEntity<>(savedWallet, HttpStatus.CREATED);
        else
            return new ResponseEntity<>(savedWallet, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Wallet> deleteById(@PathVariable Integer id)
    {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
