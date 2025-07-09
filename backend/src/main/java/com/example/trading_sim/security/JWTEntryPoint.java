package com.example.trading_sim.security;

import com.example.trading_sim.dtos.JsonError;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JWTEntryPoint implements AuthenticationEntryPoint
{
    
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException
    {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        var jsonResponse = new JsonError("Invalid or expired token");
        response.getWriter().write(new ObjectMapper().writeValueAsString(jsonResponse));
    }
}
