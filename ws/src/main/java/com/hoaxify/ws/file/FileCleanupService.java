package com.hoaxify.ws.file;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;



@Service
@EnableScheduling
public class FileCleanupService {
  
	
	@Autowired
	FileAttachmentRepository  fileAttachmentRepository;
	
	@Autowired
	FileService fileService;
	
	@Scheduled(fixedRate = 24 * 60 * 60 * 1000 )
	public void cleanupStorage() {
		Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
		List <FileAttachment> filesToDelete = 
				fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(twentyFourHoursAgo);
	for(FileAttachment file : filesToDelete) {
		fileService.deleteHoaxAttachmentFile(file.getName()); 
		fileAttachmentRepository.deleteById(file.getId());  
	}
	}
}
