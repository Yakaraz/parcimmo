package fr.immo.parc.restcontrollers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.immo.parc.services.DictionnaireService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DictionnaireController {

	@Autowired
	DictionnaireService dictionnaireService;

	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("/dictionaries")
	public ResponseEntity<Map<String, Map<String, String>>> dictionaries() {

		Map<String, Map<String, String>> result = dictionnaireService.findAll();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
