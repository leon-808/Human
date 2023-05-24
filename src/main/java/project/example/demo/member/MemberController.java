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
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Controller
public class MemberController {
	final DefaultMessageService messageService;
	
	public MemberController() {
		this.messageService = NurigoApp.INSTANCE.initialize
				("NCSY0E54KZK025CT", "PGICSLP8GA8KX8L9VNJXQV9HJZ29E7ET", "https://api.coolsms.co.kr");
	}
	
	@Autowired
	private MemberDAO mdao;
	
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@GetMapping("/login")
	
	public String login_page(HttpServletRequest req) {
		return redirectMain(req);
	}
	
	@GetMapping("/signup")

	public String signup_page(HttpServletRequest req) {
		return redirectMain(req);
	}
	

	@GetMapping("/find/id")
	public String idfind(HttpServletRequest req) {
		return redirectMain(req);
	}
	
	@GetMapping("/find/pw")
	public String pwfind(HttpServletRequest req) {
		return redirectMain(req);
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
		
		
		String get_name = mdao.get_name(id, pw);
		int flag = mdao.check_duplicateID(id);
		
		if (flag != 0) {
			String get_id = mdao.get_id(id, pw);
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
	
	
	@PostMapping("/check/duplicateID")
	@ResponseBody
	public String check_duplicateID(HttpServletRequest req) {
		String check = "false";
		
		String id = req.getParameter("id");
		
		int flag = mdao.check_duplicateID(id);
		if (flag == 0) check = "true";
				
		return check;
	}
	

	
	@PostMapping("/check/phone")
	@ResponseBody
	public String check_phone(HttpServletRequest req) {
		String check = "false";
		
		String phone = req.getParameter("phone");
		
		int flag = mdao.check_phone(phone);
		if (flag == 0) check = "true";
				
		return check;
	}
	
	
	@PostMapping("/search/id")
	@ResponseBody
	public String search_id(HttpServletRequest req) {
		String result = "";
		
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
				
		result = mdao.search_id(name,phone);
		
		return result;
	}
	
	
	@PostMapping("/search/pw")
	@ResponseBody
	public String search_pw(HttpServletRequest req) {
		
		String result = "false";
		
		
		String temporary = getTemporalPw(8);
		
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
		
		int flag = mdao.search_pw(id, name, phone);
		
		
		
		if (flag != 0) {
			mdao.update_pw(id, name, phone, temporary);
			
			sendTemporalPw(phone, temporary);
			result = "true";
		}
	
		return result;
	}
	
	public String redirectMain(HttpServletRequest req) {
		HttpSession session = req.getSession();
		if (session.getAttribute("id") != null) return "redirect:/main"; 
		// 환영 페이지 만들어지면 리다이렉트 링크 수정해야함
		else return "/member/login";
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
}
