package project.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class YController {
	@GetMapping("/yusanghyeon")
	@ResponseBody
	public String yu_page() {
		return "유상현 페이지";
	}
}
