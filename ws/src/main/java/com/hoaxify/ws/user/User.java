package com.hoaxify.ws.user;

import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.hoaxify.ws.hoax.Hoax;

import lombok.Data;

@Data
@Entity
public class User implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; 
	
	@NotNull(message = "{hoaxify.constraints.username.NotNull.message}")
	@Size(min = 4 , max = 255 , message ="{hoaxify.constraints.username.Size.message}")
	@UniqueUsername
	private String username;
	
	@NotNull(message = "{hoaxify.constraints.displayName.NotNull.message}")
	@Size(min = 4 , max = 255 , message ="{hoaxify.constraints.displayName.Size.message}")
	private String displayName;
	
	@NotNull(message = "{hoaxify.constraints.password.NotNull.message}")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message ="{hoaxify.constraints.password.Pattern.message}")
	@Size(min = 8 , max = 255 , message ="{hoaxify.constraints.password.Size.message}")
	private String password;
	
	private String image;
	
	@OneToMany(mappedBy="user",cascade = CascadeType.REMOVE)
	private List<Hoax> hoaxes;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	
}
