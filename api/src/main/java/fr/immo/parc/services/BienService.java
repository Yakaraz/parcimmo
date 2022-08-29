package fr.immo.parc.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import fr.immo.parc.exceptions.PropertyNotFoundException;
import fr.immo.parc.exceptions.UserAlreadyInException;
import fr.immo.parc.exceptions.UserNotFoundException;
import fr.immo.parc.repositories.UserRepository;
import fr.immo.parc.repositories.biens.BienRepository;
import fr.immo.parc.repositories.biens.BienSpecification;
import fr.immo.parc.repositories.biens.BienSpecificationTeam;
import fr.immo.parc.repositories.model.property.Bien;
import fr.immo.parc.repositories.model.user.ApplicationUser;
import fr.immo.parc.repositories.model.user.Team;
import fr.immo.parc.repositories.search.SearchCriteria;
import fr.immo.parc.repositories.search.SearchOperation;
import fr.immo.parc.restcontrollers.dtos.AssignmentDto;
import fr.immo.parc.restcontrollers.dtos.bien.write.BienDTOW;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@NoArgsConstructor
public class BienService {

	@Autowired
	BienRepository bienRepository;

	@Autowired
	UserRepository userRepository;

	public Page<Bien> findAll(Pageable pageable) {
		log.debug("findAll started");

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = userRepository.findByUsername(auth.getName()).get();
		List<String> teamsCode = currentUser.getTeams().stream().map(Team::getCode).collect(Collectors.toList());

		BienSpecificationTeam containingTeams = new BienSpecificationTeam(teamsCode);
		Page<Bien> result = bienRepository.findAll(Specification.where(containingTeams), pageable);
		return result;
	}

	public Page<Bien> findByZipCode(String zipCode, Pageable pageable) {
		log.debug("findByZipCode started");

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = userRepository.findByUsername(auth.getName()).get();
		List<String> teamsCode = currentUser.getTeams().stream().map(Team::getCode).collect(Collectors.toList());
		BienSpecificationTeam containingTeams = new BienSpecificationTeam(teamsCode);
		BienSpecification containingZipCode = new BienSpecification();
		containingZipCode.add(new SearchCriteria("adresse", "codePostal", zipCode, SearchOperation.MATCH));
		Page<Bien> result = bienRepository.findAll(Specification.where(containingTeams).and(containingZipCode),
				pageable);

		return result;
	}

	public Page<Bien> findByIdLot(String idLot, Pageable pageable) {
		log.info("findByIdLot started");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = userRepository.findByUsername(auth.getName()).get();
		List<String> teamsCode = currentUser.getTeams().stream().map(Team::getCode).collect(Collectors.toList());
		BienSpecificationTeam containingTeams = new BienSpecificationTeam(teamsCode);

		BienSpecification containingidLot = new BienSpecification();
		containingidLot.add(new SearchCriteria("idLot", idLot, SearchOperation.MATCH));
		Page<Bien> result = bienRepository.findAll(Specification.where(containingTeams).and(containingidLot), pageable);

		return result;
	}

	public Page<Bien> findByIdLotAndZipCode(String idLot, String zipCode, Pageable pageable) {
		log.info("findByIdLotAndZipCode started");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = userRepository.findByUsername(auth.getName()).get();
		List<String> teamsCode = currentUser.getTeams().stream().map(Team::getCode).collect(Collectors.toList());
		BienSpecificationTeam containingTeams = new BienSpecificationTeam(teamsCode);

		BienSpecification containingidLot = new BienSpecification();
		containingidLot.add(new SearchCriteria("idLot", idLot, SearchOperation.MATCH));
		BienSpecification containingZipCode = new BienSpecification();
		containingZipCode.add(new SearchCriteria("adresse", "codePostal", zipCode, SearchOperation.MATCH));

		Page<Bien> result = bienRepository
				.findAll(Specification.where(containingTeams).and(containingidLot).and(containingZipCode), pageable);
		return result;
	}

	public Bien findById(Long id) throws PropertyNotFoundException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = userRepository.findByUsername(auth.getName()).get();
		List<String> teamsCode = currentUser.getTeams().stream().map(Team::getCode).collect(Collectors.toList());
		BienSpecificationTeam containingTeams = new BienSpecificationTeam(teamsCode);
		BienSpecification containingId = new BienSpecification();
		containingId.add(new SearchCriteria("id", id, SearchOperation.EQUAL));

		return bienRepository.findOne(Specification.where(containingTeams).and(containingId))
				.orElseThrow(() -> new PropertyNotFoundException(id));

	}
	
	public Bien updateProperty(Long propertyId, BienDTOW bien){
		Bien storedBien = bienRepository.findById(propertyId).orElseThrow(() -> new PropertyNotFoundException(propertyId));
		storedBien.setPlanifiedAt(bien.getPlanifiedAt());
		return bienRepository.save(storedBien);
	}


	public Bien assign(AssignmentDto assignment)
			throws PropertyNotFoundException, UserNotFoundException, UserAlreadyInException {
		BienSpecification containingId = new BienSpecification();
		containingId.add(new SearchCriteria("id", assignment.getPropertyId(), SearchOperation.EQUAL));
		Bien bien = bienRepository.findOne(Specification.where(containingId))
				.orElseThrow(() -> new PropertyNotFoundException(assignment.getPropertyId()));

		ApplicationUser user = userRepository.findById(assignment.getUserId()).orElseThrow(() -> new UserNotFoundException(assignment.getUserId()));
		if (bien.getUsers().stream().anyMatch(u -> u.getId().equals(assignment.getUserId()))) {
			throw new UserAlreadyInException(assignment.getUserId());
		} else {
			bien.getUsers().clear();
			bien.getUsers().add(user);
			bien = bienRepository.save(bien);
		}
		return bien;
	}

}
