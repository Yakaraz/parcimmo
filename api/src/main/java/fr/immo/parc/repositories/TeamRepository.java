package fr.immo.parc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.model.user.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
