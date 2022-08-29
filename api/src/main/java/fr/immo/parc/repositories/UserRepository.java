package fr.immo.parc.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.model.user.ApplicationUser;

public interface UserRepository extends JpaRepository<ApplicationUser, Long> {

	Optional<ApplicationUser> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
