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
<<<<<<< HEAD

=======
>>>>>>> 54ef53e057121d6d1960b510064db1f97824e7a0
	
	@GetMapping("/conflict_yusanghyeon")
	@ResponseBody
	public String conflict_page() {
<<<<<<< HEAD
		return "다중 충돌 테스트";
=======
		return "다중 충돌 유상현";
>>>>>>> 54ef53e057121d6d1960b510064db1f97824e7a0
	}
}
