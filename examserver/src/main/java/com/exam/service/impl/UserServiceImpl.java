package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	
	
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		//checking whether user is already present or not
		User localUser = this.userRepository.findByUsername(user.getUsername());
		if(localUser!=null) {
			System.out.println("User already present.");
			throw new Exception("User Exists.");
			}
		
		else {
			//create user
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}
			
			user.getUserRoles().addAll(userRoles);
			localUser = this.userRepository.save(user);
		}
		
		return localUser;
	}


	//getting user by username
	@Override
	public User getUser(String username) {
		return this.userRepository.findByUsername(username);
	}


	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
	}

//	
//	@Override
//	public User updateUser(User updateUser) {
//		User updatedUser = this.userRepository.findByUsername(updateUser.getUsername());
//		this.userRepository.save(updatedUser);
//		return updatedUser;
//		
//		
//	}

	
}
