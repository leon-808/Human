package project.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SController {
	@GetMapping("seojaehyeon")
	@ResponseBody
	public String seo_page() {
		return "서재현 페이지";
	}
	
	@GetMapping("/conflict_yusanghyeon2")
	@ResponseBody
	public String conflict_page() {
		return "다중 충돌 유상현";
	}
}
