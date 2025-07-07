package com.example.trading_sim.security;

import com.example.trading_sim.services.CustomUserDetailsService;
import com.example.trading_sim.services.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNullApi;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter
{
    @Autowired
    private JWTService jwtService;
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException
    {
        String authHeader = request.getHeader("Authorization");

        // if missing jwt header
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        String username;

        try {
            username = jwtService.extractUsername(token);
        }
        catch (Exception e) {
            chain.doFilter(request, response);
            return;
        }

        if (username == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            chain.doFilter(request, response);
            return;
        }

        var userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtService.isTokenValid(token, userDetails)) {
            chain.doFilter(request, response);
            return;
        }

        var authToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );

        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        chain.doFilter(request, response);
    }
}