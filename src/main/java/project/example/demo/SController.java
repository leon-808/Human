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
<<<<<<< HEAD
	
	@GetMapping("/conflict_yusanghyeon")

	@ResponseBody
	public String conflict_page() {
		return "다중 충돌 유상현";
=======
	@GetMapping("/conflict_seojaehyeon")
	@ResponseBody
	public String conflict_page() {
		return "다중 충돌 서재현";
>>>>>>> 54ef53e057121d6d1960b510064db1f97824e7a0
	}
}
