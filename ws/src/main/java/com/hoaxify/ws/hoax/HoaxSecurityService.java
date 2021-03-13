package com.hoaxify.ws.hoax;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hoaxify.ws.user.User;

@Service
public class HoaxSecurityService {
	
	@Autowired
	HoaxRepository hoaxRepository;
	
	public boolean isAllowedToDelete(long id , User loggedInUser) {
		Optional <Hoax> inDB = hoaxRepository.findById(id);
		if(!inDB.isPresent()) {
			return false;
		}
		Hoax hoax = inDB.get();
		if(hoax.getUser().getId() != loggedInUser.getId()) {
			return false;
		}
		return true;
	}
}
