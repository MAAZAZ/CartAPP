package com.example.demo;

import com.example.demo.Model.Cart;
import com.example.demo.Model.CommandLine;
import com.example.demo.Model.Product;
import com.example.demo.repository.CommandLineRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner start( ProductRepository productRepository, CommandLineRepository commandLineRepository, CartRepository cartRepository,
                            RepositoryRestConfiguration repositoryRestConfiguration) {
        return args -> {
            repositoryRestConfiguration.exposeIdsFor(Cart.class);
            repositoryRestConfiguration.exposeIdsFor(CommandLine.class);
            repositoryRestConfiguration.exposeIdsFor(Product.class);
            Product product1=productRepository.save(new Product(null, "Iphone 6", 5000, null));
            productRepository.save(new Product(null, "Samsung 7", 4000, null));
            Cart cart=cartRepository.save(new Cart(null, 5000 ,null));
            commandLineRepository.save(new CommandLine(null,5000,1, product1, cart));
        };
    }

}
