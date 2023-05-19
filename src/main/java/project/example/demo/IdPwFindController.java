package project.example.demo;

import java.security.SecureRandom;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class IdPwFindController {
	@Autowired
	private IdFindDAO idao;
	
	@GetMapping("/IdFind")
	public String idfind() {
		return "IdFind";
	}
	
	@GetMapping("/PwFind")
	public String pwfind() {
		return "PwFind";
	}
	
	@PostMapping("/search_id")
	@ResponseBody
	public String search_id(HttpServletRequest req) {
		String result = "";
		
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
				
		result = idao.search_id(name,phone);
		
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
		
		int flag = idao.search_pw(id, name, phone);
		System.out.println(flag);
		
		if(flag !=0) {
			idao.update_pw(id, name, phone, temporary);
			result = idao.get_temporalPW(id, name, phone);
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
}
