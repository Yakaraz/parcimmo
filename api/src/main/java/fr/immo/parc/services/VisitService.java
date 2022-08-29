package fr.immo.parc.services;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.immo.parc.exceptions.InterventionPointNotFoundException;
import fr.immo.parc.exceptions.PropertyNotFoundException;
import fr.immo.parc.repositories.UserRepository;
import fr.immo.parc.repositories.biens.BienRepository;
import fr.immo.parc.repositories.model.property.Bien;
import fr.immo.parc.repositories.model.user.ApplicationUser;
import fr.immo.parc.repositories.model.visit.Comment;
import fr.immo.parc.repositories.model.visit.Control;
import fr.immo.parc.repositories.model.visit.InterventionPoint;
import fr.immo.parc.repositories.model.visit.Visit;
import fr.immo.parc.repositories.visits.InterventionPointRepository;
import fr.immo.parc.repositories.visits.VisitRepository;
import fr.immo.parc.restcontrollers.dtos.visit.InterventionPointDto;
import fr.immo.parc.restcontrollers.dtos.visit.VisitDto;
import fr.immo.parc.restcontrollers.dtos.visit.newvisit.NewCommentDto;
import fr.immo.parc.restcontrollers.dtos.visit.newvisit.NewVisitDto;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@NoArgsConstructor

public class VisitService {

	@Autowired
	private ModelMapper modelMapper;

	private Comment convertCommentFromDto(NewCommentDto comment) {
		return modelMapper.map(comment, Comment.class);
	}

	private VisitDto convertVisitToDto(Visit visit) {
		return modelMapper.map(visit, VisitDto.class);
	}

	private InterventionPointDto convertInterventionPointToDto(InterventionPoint interventionPoint) {
		return modelMapper.map(interventionPoint, InterventionPointDto.class);
	}

	@Autowired
	VisitRepository visitRepository;

	@Autowired
	BienRepository bienRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	InterventionPointRepository interventionPointRepository;

	public VisitDto findById(Long id) {
		Visit visit = visitRepository.findById(id).orElseThrow(() -> new PropertyNotFoundException(id));
		return convertVisitToDto(visit);
	}

	public Collection<VisitDto> findAllById(Long id) {
		Collection<Visit> visits = visitRepository.findAllVisitByLotId(id);
		return CollectionUtils.emptyIfNull(visits).stream().map(this::convertVisitToDto).collect(Collectors.toList());

	}

	public Collection<InterventionPointDto> getAllInterventionPoints() {
		return interventionPointRepository.findAll().stream().map(this::convertInterventionPointToDto).collect(Collectors.toList());
		
	}

	@Transactional
	public VisitDto save(Long propertyId, NewVisitDto visit) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = userRepository.findByUsername(auth.getName()).get();
		Visit builtVisit = new Visit();
		builtVisit.setAuthor(currentUser);

		builtVisit.setRentable(visit.getRentable());
		builtVisit.setWorkToBePlanned(visit.getWorkToBePlanned());

		Bien bien = bienRepository.findById(propertyId).orElseThrow(() -> new PropertyNotFoundException(propertyId));

		// pour chaque control

		List<Control> controls = CollectionUtils.emptyIfNull(visit.getControls()).stream().map(control -> {
			Control result = new Control();
			result.setActionStatus(control.getActionStatus());
			result.setAnswer(control.getAnswer());
			InterventionPoint ip = interventionPointRepository.findById(control.getInterventionPoint().getId())
					.orElseThrow(() -> new InterventionPointNotFoundException(control.getInterventionPoint().getId()));
			result.setInterventionPoint(ip);

			List<Comment> comments = CollectionUtils.emptyIfNull(control.getComments()).stream().map(commentDto -> {
				Comment newComment = new Comment();
				newComment.setText(commentDto.getText());
				newComment.setAuthor(currentUser);
				newComment.setControl(result);
				return newComment;
			}).collect(Collectors.toList());

			result.setComments(comments);
			result.setVisit(builtVisit);

			return result;

		}).collect(Collectors.toList());

		builtVisit.setControls(controls);
		builtVisit.setProperty(bien);
		return convertVisitToDto(this.visitRepository.save(builtVisit));

	}

}
