package project.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BasicController {
	@GetMapping("/")
	@ResponseBody
	public String index_page() {
		return "INDEX";
	}
	@GetMapping("/test")
	@ResponseBody
	public String test_page() {
		return "서재현";
	}
}