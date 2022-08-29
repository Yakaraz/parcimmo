package fr.immo.parc.restcontrollers;

import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.immo.parc.exceptions.VisitNotFoundException;
import fr.immo.parc.restcontrollers.dtos.visit.InterventionPointDto;
import fr.immo.parc.restcontrollers.dtos.visit.VisitDto;
import fr.immo.parc.restcontrollers.dtos.visit.newvisit.NewVisitDto;
import fr.immo.parc.services.VisitService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Validated
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class VisitController {

	@Autowired
	VisitService visitService;

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/visits/property/{id}")
	public Collection<VisitDto> visits(@PathVariable Long id) throws VisitNotFoundException {

		return visitService.findAllById(id);
	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/visits/{id}")
	public VisitDto getVisit(@PathVariable Long id) throws VisitNotFoundException {

		log.info("" + id);
		return visitService.findById(id);
	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@PostMapping("/visits/property/{id}")
	public VisitDto saveVisit(@PathVariable Long id, @Valid @RequestBody NewVisitDto visite)
			throws VisitNotFoundException {

		return visitService.save(id, visite);
	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/visits/interventionspoints")
	public Collection<InterventionPointDto> getAllInterventionsPoints() {

		return visitService.getAllInterventionPoints();
	}

}