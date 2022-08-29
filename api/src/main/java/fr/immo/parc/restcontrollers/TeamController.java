package fr.immo.parc.restcontrollers;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.immo.parc.repositories.UserRepository;
import fr.immo.parc.repositories.model.user.ApplicationUser;
import fr.immo.parc.repositories.model.user.Team;
import fr.immo.parc.restcontrollers.dtos.team.TeamDto;
import fr.immo.parc.restcontrollers.dtos.user.ApplicationUserDto;
import fr.immo.parc.services.TeamService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TeamController {


	@Autowired
	UserRepository userRepository;

	@Autowired
	TeamService teamService;

	@Autowired
	private ModelMapper modelMapper;

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/teams")
	public ResponseEntity<List<TeamDto>> teams(Principal principal) {

		ApplicationUser currentUser = userRepository.findByUsername(principal.getName()).get();
		List<Team> teams = currentUser.getTeams();
		List<TeamDto> list = teams.stream().map(team -> modelMapper.map(team, TeamDto.class))
				.collect(Collectors.toList());
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/teams/users")
	public ResponseEntity<List<ApplicationUserDto>> team(Principal principal) {
		ApplicationUser currentUser = userRepository.findByUsername(principal.getName()).get();
		Team currentUserTeam = currentUser.getTeams().get(0);
		List<ApplicationUser> users =  teamService.getUsersFromTeam(currentUserTeam.getId());
		List<ApplicationUserDto> list = users.stream().map(user -> modelMapper.map(user, ApplicationUserDto.class))
				.collect(Collectors.toList());

		return new ResponseEntity<>(list, HttpStatus.OK);
	}
}
