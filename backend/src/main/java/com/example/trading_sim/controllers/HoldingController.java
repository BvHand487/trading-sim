package com.example.trading_sim.controllers;

import com.example.trading_sim.models.Holding;
import com.example.trading_sim.models.Transaction;
import com.example.trading_sim.models.User;
import com.example.trading_sim.models.Wallet;
import com.example.trading_sim.services.HoldingService;
import com.example.trading_sim.services.UserService;
import com.example.trading_sim.services.WalletService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wallets")
public class HoldingController
{
    private final HoldingService service;
    private final WalletService walletService;
    private final UserService userService;

    public HoldingController(HoldingService service, WalletService walletService, UserService userService) {
        this.service = service;
        this.walletService = walletService;
        this.userService = userService;
    }

    @GetMapping("{walletId}/holdings")
    @ResponseBody
    public ResponseEntity<List<Holding>> readAll(@PathVariable Integer walletId, @AuthenticationPrincipal UserDetails details)
    {
        Optional<User> user = userService.findByUsername(details.getUsername());
        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        if (!walletService.existsByIdAndUserId(walletId, user.get().getId()))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        List<Holding> holdings = service.findAllByWalletId(walletId);

        return new ResponseEntity<>(holdings, HttpStatus.OK);
    }
}
