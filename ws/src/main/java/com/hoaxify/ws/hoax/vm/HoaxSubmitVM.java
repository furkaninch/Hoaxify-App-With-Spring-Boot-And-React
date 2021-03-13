package com.hoaxify.ws.hoax.vm;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class HoaxSubmitVM {
	
	
	@Size(min=1 , max= 255)
	private String content;
	
	private long attachmentId;
	
	
	
}
