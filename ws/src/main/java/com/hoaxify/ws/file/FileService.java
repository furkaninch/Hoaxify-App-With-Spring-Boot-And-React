package com.hoaxify.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hoaxify.ws.configuration.AppConfiguration;

@Service
public class FileService {
	
	
	AppConfiguration appConfiguration;
	
	Tika tika;
	
	FileAttachmentRepository fileAttachmentRepository;
	
	public FileService(AppConfiguration appConfiguration , FileAttachmentRepository fileAttachmentRepository) {
		this.appConfiguration = appConfiguration;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.tika = new Tika();
	}

	public String writeBase64EncodedStringToFile(String image) throws IOException {
		
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getProfileStoragePath()+"/"+fileName);
		OutputStream output = new FileOutputStream(target);
		
		byte[] base64encoded = Base64.getDecoder().decode(image);
		
		output.write(base64encoded);
		
		output.close();
		
		return fileName;
	}
	
	public String generateRandomName () {
		return UUID.randomUUID().toString().replaceAll("-", "").concat(".jpg");
	}

	public void deleteProfileImageFile(String oldImage)  {
		if(oldImage == null) {
			return;
		}
		deleteFile(Paths.get(appConfiguration.getProfileStoragePath(), oldImage));
	}
	
	public void deleteHoaxAttachmentFile(String oldImage)  {
		if(oldImage == null) {
			return;
		}
		deleteFile(Paths.get(appConfiguration.getAttachmentStoragePath(), oldImage));
	}
	
	private void deleteFile (Path path ) {
		try {
			Files.deleteIfExists(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public String detectType(byte[] arr) {
		
		return tika.detect(arr);
		
	}
	
	public String detectType(String base64) {
    
	byte[] base64encoded =Base64.getDecoder().decode(base64);
		 
	String fileType = tika.detect(base64encoded);
			
	return fileType;
	}
	
	public FileAttachment saveHoaxAttachment(MultipartFile multipartFile) {
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getAttachmentStoragePath()+"/"+fileName);
		String fileType = null;
		try {
			OutputStream output = new FileOutputStream(target);
			output.write(multipartFile.getBytes());
			output.close();
		    fileType = detectType(multipartFile.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		FileAttachment attachment = new FileAttachment();
		attachment.setName(fileName);
		attachment.setDate(new Date());
		attachment.setFileType(fileType);
		
		return fileAttachmentRepository.save(attachment);
	}

}
