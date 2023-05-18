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

}
