package project.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HController {
	@GetMapping("/hwangdayeon")
	@ResponseBody
	public String hwang_page() {
		return "황다연 페이지";
	}

	@GetMapping("/conflict_hwangdayeon")
	@ResponseBody
	public String conflict_page() {
		return "다중 충돌 황다연";
	}

}
