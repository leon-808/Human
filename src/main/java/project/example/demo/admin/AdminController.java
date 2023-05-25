package project.example.demo.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class AdminController {
	@Autowired
	private AdminRestaurantDAO ardao;

	@GetMapping("/add/restaurant/list")
	public String addRestaurantList_page() {
		return "/admin/addRestaurantList";
	}

	@PostMapping("/adminRestaurant/getCount")
	@ResponseBody
	public String adminRestaurant_getCount() {
		int get_count = ardao.get_count();

		return String.valueOf(get_count);
	}

	@PostMapping("adminRestaurant/getList")
	@ResponseBody
	public String adminRestaurant_getList(@RequestParam("currentP") int currentP) {
		ArrayList<adminRestaurant> ardto = ardao.adminRestaurantList(currentP);
	}
}
