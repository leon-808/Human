package project.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LController {
	@GetMapping("/leehoseong")
	@ResponseBody
	public String lee_page() {
		return "이호성 페이지";
	}
}
