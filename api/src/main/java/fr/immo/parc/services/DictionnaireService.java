package fr.immo.parc.services;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.immo.parc.repositories.AnswerStateDictionaryRepository;
import fr.immo.parc.repositories.AnswerYesNoDictionaryRepository;
import fr.immo.parc.repositories.ProgressDictionaryRepository;
import fr.immo.parc.repositories.PropertyTypeDictionaryRepository;
import fr.immo.parc.repositories.RentableDictionaryRepository;
import fr.immo.parc.repositories.VisitStatusDictionaryRepository;
import fr.immo.parc.repositories.dictionnaires.Dictionary;

@Component
public class DictionnaireService {

	@Autowired
	AnswerYesNoDictionaryRepository answerYesNoDictionaryRepository;

	@Autowired
	AnswerStateDictionaryRepository answerStateDictionaryRepository;


	@Autowired
	ProgressDictionaryRepository progressDictionaryRepository;

	@Autowired
	PropertyTypeDictionaryRepository propertyTypeDictionaryRepository;

	@Autowired
	RentableDictionaryRepository rentableDictionaryRepository;

	@Autowired
	VisitStatusDictionaryRepository visitStatusDictionaryRepository;

	public Map<String, Map<String,String>> findAll() {

		Map<String, Map<String,String>> result = new HashMap<String, Map<String,String>>();
		Map<String,String> dic1 = answerStateDictionaryRepository.findAll().stream()
				.collect(Collectors.toMap(o -> o.getCode(), o -> o.getValue()));
		Map<String,String> dic2 = answerYesNoDictionaryRepository.findAll().stream().map(el -> (Dictionary) el)
				.collect(Collectors.toMap(o -> o.getCode(), o -> o.getValue()));
		Map<String,String> dic3 = progressDictionaryRepository.findAll().stream().map(el -> (Dictionary) el)
				.collect(Collectors.toMap(o -> o.getCode(), o -> o.getValue()));
		Map<String,String> dic4 = propertyTypeDictionaryRepository.findAll().stream().map(el -> (Dictionary) el)
				.collect(Collectors.toMap(o -> o.getCode(), o -> o.getValue()));
		Map<String,String> dic5 = rentableDictionaryRepository.findAll().stream().map(el -> (Dictionary) el)
				.collect(Collectors.toMap(o -> o.getCode(), o -> o.getValue()));
		Map<String,String> dic6 = visitStatusDictionaryRepository.findAll().stream().map(el -> (Dictionary) el)
				.collect(Collectors.toMap(o -> o.getCode(), o -> o.getValue()));
		result.put("answerState", dic1);
		result.put("answerYesNo", dic2);
		result.put("progress", dic3);
		result.put("propertyType", dic4);
		result.put("rentable", dic5);
		result.put("visitStatus", dic6);
		return result;
	}
}
