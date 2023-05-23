package project.example.demo.member;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import project.example.demo.dto.MemberDTO;

@Controller
public class MemberController {
	@Autowired
	private MemberDAO mdao;
	
	@GetMapping("/login")
	public String login_page() {
		return "/member/login";
	}
	
	@GetMapping("/signup")
	public String signup_page() {
		return "/member/signUp";
	}
	
	@GetMapping("/signupdate")
	public String signupdate_page() {
		return "/member/signUpdate";
	}
	
	@GetMapping("/IdFind")
	public String idfind() {
		return "/member/IdFind";
	}
	
	@GetMapping("/PwFind")
	public String pwfind() {
		return "/member/PwFind";
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
	@PostMapping("/get_signupInfo")
	@ResponseBody
	public String get_signupInfo(HttpServletRequest req) {
		HttpSession session = req.getSession();
		JSONArray ja = new JSONArray();
				
		if (session.getAttribute("id") != null) {
			String id = session.getAttribute("id").toString();
		
			ArrayList<MemberDTO> mdto = mdao.get_signupInfo(id);
			
			for (int i = 0; i < mdto.size(); i++) {
				JSONObject jo = new JSONObject();
				jo.put("id", mdto.get(i).getId());
				jo.put("pw", mdto.get(i).getPw());
				jo.put("name", mdto.get(i).getName());
				jo.put("gender", mdto.get(i).getGender());
				jo.put("birth", mdto.get(i).getBirth());
				jo.put("phone", mdto.get(i).getPhone());
				ja.put(jo);
			}
		}
		
		return ja.toString();
	}
	@PostMapping("/update_signup")
	@ResponseBody
	public String update_signup(HttpServletRequest req) {
		String check = "true";
		
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String name = req.getParameter("name");
		String gender = req.getParameter("gender");
		String birth = req.getParameter("birth");
	
		String phone = req.getParameter("phone");
		
		
		mdao.update_signup(id, pw, name, gender, birth, phone);
		
		return check;
	}
}
