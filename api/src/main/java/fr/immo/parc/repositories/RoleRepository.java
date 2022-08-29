package fr.immo.parc.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.model.user.ERole;
import fr.immo.parc.repositories.model.user.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
