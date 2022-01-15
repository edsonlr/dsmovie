package com.devsuperior.dsmovie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsmovie.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	// para fazer a busca usando pelo próprio nome do campo-pelo email-usar 
	// findByEmail com os argumentos é padrão do JPA
	User findByEmail(String email);
	
}
