package com.example.demo.repository;

import com.example.demo.Model.CommandLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestController
@CrossOrigin("*")
public interface CommandLineRepository extends JpaRepository<CommandLine, Long> {
}
