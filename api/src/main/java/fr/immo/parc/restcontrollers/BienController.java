package fr.immo.parc.restcontrollers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.immo.parc.exceptions.PropertyNotFoundException;
import fr.immo.parc.repositories.model.property.Bien;
import fr.immo.parc.restcontrollers.dtos.AssignmentDto;
import fr.immo.parc.restcontrollers.dtos.bien.read.BienDto;
import fr.immo.parc.restcontrollers.dtos.bien.write.BienDTOW;
import fr.immo.parc.services.BienService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BienController {

	@Autowired
	BienService bienservice;

	@Autowired
	private ModelMapper modelMapper;

	private BienDto convertToDto(Bien bien) {
		return modelMapper.map(bien, BienDto.class);
	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/properties")
	public ResponseEntity<Page<BienDto>> properties(@RequestParam(required = false) String idlot,
			@RequestParam(required = false) String zipcode, Pageable pageable) {

		Page<Bien> result = null;
		if (null != idlot && null != zipcode) {
			result = bienservice.findByIdLotAndZipCode(idlot, zipcode, pageable);
		} else if (null != zipcode) {
			result = bienservice.findByZipCode(zipcode, pageable);
		} else if (null != idlot) {
			result = bienservice.findByIdLot(idlot, pageable);
		} else {
			result = bienservice.findAll(pageable);
		}

		Page<BienDto> dtoPage = result.map(source -> modelMapper.map(source, BienDto.class));

		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/properties/{id}")
	public BienDto getProperty(@PathVariable Long id) throws PropertyNotFoundException {

		log.info("" + id);
		System.out.println(convertToDto(bienservice.findById(id)));
		return convertToDto(bienservice.findById(id));

	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@PutMapping(path = "/properties/{propertyId}/users/{userId}", consumes = "application/json", produces = "application/json")
	public BienDto assignUserToProperty(@PathVariable Long propertyId, @PathVariable Long userId,
			@RequestBody AssignmentDto assignment) {

		return convertToDto(bienservice.assign(assignment));
	}

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@PatchMapping(path = "/properties/{propertyId}", consumes = "application/json", produces = "application/json")
	public ResponseEntity<BienDTOW> updateProperties(@PathVariable Long propertyId, @RequestBody BienDTOW bien) {
		Bien savedBien = bienservice.updateProperty(propertyId, bien);
		BienDTOW result = modelMapper.map(savedBien, BienDTOW.class);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

}