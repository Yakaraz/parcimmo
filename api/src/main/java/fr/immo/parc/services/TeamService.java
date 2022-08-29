package fr.immo.parc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.immo.parc.exceptions.PropertyNotFoundException;
import fr.immo.parc.repositories.TeamRepository;
import fr.immo.parc.repositories.model.user.ApplicationUser;
import fr.immo.parc.repositories.model.user.Team;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@NoArgsConstructor

public class TeamService {

	@Autowired
	TeamRepository teamRepository;

	public List<ApplicationUser> getUsersFromTeam(Long id) {
		Team team = teamRepository.findById(id).orElseThrow(() -> new PropertyNotFoundException(id));
		return team.getUsers();
	}

}
