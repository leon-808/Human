package project.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class MemberController {
	@Autowired
	private MemberDAO mdao;
	
	@GetMapping("/home")
	public String home_page() {
		return "home";
	}
	
	@GetMapping("/login")
	public String login_page() {
		return "login";
	}
	
	@GetMapping("/signup")
	public String signup_page() {
		return "signUp";
	}
	
	@GetMapping("/IdFind")
	public String IdFind_page() {
		return "IdFind";
	}
	
	@GetMapping("/PwFind")
	public String PwFind_page() {
		return "PwFind";
	}
	
	@PostMapping("/check/loginStatus")
	@ResponseBody
	public String check_loginStatus(HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession();
		
		if(session.getAttribute("id") != null)
			check = "true";
		
		return check;
	}
	
	@PostMapping("/submit/login")
	@ResponseBody
	public String submit_login(HttpServletRequest req) {
		String check = "false";
		
		HttpSession session = req.getSession(); 
		
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String get_id = mdao.get_id(id, pw);
		int flag = mdao.check_duplicateID(id);
		
		if (flag != 0) {
			if (get_id != null) {
				session.setAttribute("id", get_id);
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
}
