package project.example.demo.member;

import java.io.File;
import java.security.SecureRandom;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class MemberController {
	@Autowired
	private MemberDAO mdao;
	
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@GetMapping("/login")
	public String login_page() {
		return "/member/login";
	}
	
	@GetMapping("/signup")
	public String signup_page() {
		return "/member/signUp";
	}
	
	@GetMapping("/IdFind")
	public String idfind() {
		return "/member/IdFind";
	}
	
	@GetMapping("/PwFind")
	public String pwfind() {
		return "/member/PwFind";
	}
	
	@GetMapping("/add/restaurant")
	public String addRestaurant_page() {
		return "/member/addRestaurant";
	}
	
	@PostMapping("/submit/login")
	@ResponseBody
	public String submit_login(HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession(); 
		
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String get_id = mdao.get_id(id, pw);
		String get_name = mdao.get_name(id, pw);
		int flag = mdao.check_duplicateID(id);
		
		if (flag != 0) {
			if (get_id != null) {
				session.setAttribute("id", get_id);
				session.setAttribute("name", get_name);
				session.setMaxInactiveInterval(600);
				check = "true";
			}
			else check = "wrong";
		}
		else check = "none";
		
		return check;
	}
	@PostMapping("/submit_signup")
	@ResponseBody
	public String submit_signup(HttpServletRequest req) {
		String check = "true";
		
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String name = req.getParameter("name");
		String gender = req.getParameter("gender");
		String birth = req.getParameter("birth");
		String phone = req.getParameter("phone");

		System.out.println(id+"/"+pw+"/"+name+"/"+gender+"/"+birth+"/"+phone);

		mdao.submit_signup(id, pw, gender, birth, name, phone);
		
		return check;
	}
	
	@PostMapping("/submit/logout")
	@ResponseBody
	public String do_logout(HttpServletRequest req) {
		String check = "true";
		
		HttpSession session = req.getSession();
		session.invalidate();
		
		return check;
	}
	
	@PostMapping("/check_duplicateID")
	@ResponseBody
	public String check_duplicateID(HttpServletRequest req) {
		String check = "false";
		
		String id = req.getParameter("id");
		
		int flag = mdao.check_duplicateID(id);
		if (flag == 0) check = "true";
				
		return check;
	}
	

	@PostMapping("/check_phone")
	@ResponseBody
	public String check_phone(HttpServletRequest req) {
		String check = "false";
		
		String phone = req.getParameter("phone");
		
		int flag = mdao.check_phone(phone);
		if (flag == 0) check = "true";
				
		return check;
	}
	
	@PostMapping("/search_id")
	@ResponseBody
	public String search_id(HttpServletRequest req) {
		String result = "";
		
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
				
		result = mdao.search_id(name,phone);
		
		return result;
	}
	
	@PostMapping("/search_pw")
	@ResponseBody
	public String search_pw(HttpServletRequest req) {
		String result = "";
		
		String temporary = getTemporalPw(7);
		
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
		
		int flag = mdao.search_pw(id, name, phone);
		System.out.println(flag);
		
		if(flag !=0) {
			mdao.update_pw(id, name, phone, temporary);
			result = mdao.get_temporalPW(id, name, phone);
		}
		
		return result;
	}
	
	public String getTemporalPw(int size) {
		char[] charSet = new char[] {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
		'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
				
		StringBuffer sb = new StringBuffer();
		SecureRandom sr = new SecureRandom();
		sr.setSeed(new Date().getTime());
		int index = 0;
		
		for (int i = 0; i < size; i++) {
			index = sr.nextInt(charSet.length);
			sb.append(charSet[index]);
		}
		
		return sb.toString();
	}
	
	@PostMapping("/my/name")
	@ResponseBody
	public String get_mypageName(HttpServletRequest req) {
		String name = "";
		
		HttpSession session = req.getSession();
		
		if (session.getAttribute("name") != null)
		name = session.getAttribute("name").toString();
		
		return name; 
	}
	
	//아작스 파일 업로드
	@PostMapping("/uploadImage")
	public void uploadImage(MultipartFile[] uploadFile) {
		// 이미지 파일 저장 위치
		String uploadFolder = "C:\\storage";
		for(MultipartFile multipartFile : uploadFile) {
			log.info("---------------------------------");
			log.info("Upload File Name : "+multipartFile.getOriginalFilename());
			log.info("Upload File Size : "+multipartFile.getSize());
			
			File savefile = new File(uploadFolder, multipartFile.getOriginalFilename());
			try {
				multipartFile.transferTo(savefile);
			}catch(Exception e) {
				log.error(e.getMessage());
			}
		}
		
	}
}
