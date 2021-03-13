package com.hoaxify.ws.hoax;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.file.FileAttachment;
import com.hoaxify.ws.file.FileAttachmentRepository;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.hoax.vm.HoaxSubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;
import com.hoaxify.ws.user.UserService;

@Service
public class HoaxService {
	
	HoaxRepository hoaxRepository;
	UserService userService;
	UserRepository userRepository;
	FileAttachmentRepository fileAttachmentRepository;
	FileService fileService;
	
	
	
	public HoaxService(HoaxRepository hoaxRepository,
			FileAttachmentRepository fileAttachmentRepository,FileService fileService,
			UserRepository userRepository, UserService userService) {
		this.hoaxRepository = hoaxRepository;
		this.userRepository = userRepository;
		this.fileAttachmentRepository =  fileAttachmentRepository;
		this.fileService = fileService;
		this.userService = userService;
	}


	public void save(HoaxSubmitVM hoaxSubmitVM, User user) {
		Hoax hoax = new Hoax();
		hoax.setTimestamp(new Date());
		hoax.setUser(user);
		hoax.setContent(hoaxSubmitVM.getContent());
		
		hoaxRepository.save(hoax);
		
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(hoaxSubmitVM.getAttachmentId());
		
		if(optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setHoax(hoax);
			fileAttachmentRepository.save(fileAttachment);
		}
	}

	public Page<Hoax> getHoax(Pageable page) {
		return hoaxRepository.findAll(page);
	}

	public Page <Hoax> getByUsername(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return hoaxRepository.findByUser(inDB, page);
	}

	public Page <Hoax> getOldHoaxes(long id, String username, Pageable page) {
		Specification<Hoax> specification = idLessThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(isUser(inDB));
		}
		return hoaxRepository.findAll(specification,page);
	}

	public long getNewHoaxesCount(long id , String username) {
		Specification <Hoax> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(isUser(inDB));
		}
		return hoaxRepository.count(specification);
	}

	public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
		Specification <Hoax> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(isUser(inDB));
		}
		return hoaxRepository.findAll(specification, sort);
	}
	
	
	Specification <Hoax> idLessThan(long id){
		return  (root, query, criteriaBuilder) -> {
				return criteriaBuilder.lessThan(root.get("id"), id);	
			};		
		};
	Specification <Hoax> idGreaterThan(long id){
		return  (root, query, criteriaBuilder) -> {
				return criteriaBuilder.greaterThan(root.get("id"), id);	
			};		
		};
	Specification <Hoax> isUser(User user){
		return  (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};	
	}

	public void delete(long id) {
		Hoax inDB = hoaxRepository.getOne(id);
		if(inDB.getFileAttachment() != null) {
			String fileName =  inDB.getFileAttachment().getName();
			fileService.deleteHoaxAttachmentFile(fileName);
		}
		hoaxRepository.deleteById(id);	
	};
	
	public void deleteHoaxesOfUser(String username) {
		User inDB = userRepository.findByUsername(username);
		Specification<Hoax> userOwned = isUser(inDB);
		List <Hoax> hoaxesToRemove = hoaxRepository.findAll(userOwned);
		for(Hoax hoax : hoaxesToRemove) {
			if(hoax.getFileAttachment() != null) {
				String fileName =  hoax.getFileAttachment().getName();
				fileService.deleteHoaxAttachmentFile(fileName);
			}
		}
		hoaxRepository.deleteAll(hoaxesToRemove);
	}
	
	}

