package com.example.demo.repository;

import com.example.demo.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
public interface CartRepository extends JpaRepository<Cart, Long> {
}
