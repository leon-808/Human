package project.example.demo.admin;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import project.example.demo.dto.AdminRestaurantDTO;

@Controller
public class AdminController {
	@Autowired
	private AdminRestaurantDAO ardao;

	@PostMapping("/check/admin")
	@ResponseBody
	public String check_admin(HttpServletRequest req) {
		String check = "false";
		HttpSession session = req.getSession();

		if (session.getAttribute("id") != null)
			if (session.getAttribute("id").equals("admin"))
				check = "true";

		return check;
	}

	@GetMapping("/add/restaurant/list")
	public String addRestaurantList_page() {
		return "/admin/addRestaurantList";
	}

	@PostMapping("/adminRestaurant/getList")
	@ResponseBody
	public String adminRestaurant_getList() {
		ArrayList<AdminRestaurantDTO> ardto = ardao.adminRestaurantList();
		JSONArray ja = new JSONArray();

		for (int i = 0; i < ardto.size(); i++) {
			JSONObject jo = new JSONObject();

			jo.put("adrt_lat", ardto.get(i).getAdrt_lat());
			jo.put("adrt_lng", ardto.get(i).getAdrt_lng());
			jo.put("adrt_primecode", ardto.get(i).getAdrt_primecode());
			jo.put("adrt_r_name", ardto.get(i).getAdrt_r_name());
			jo.put("adrt_document", ardto.get(i).getAdrt_document());
			jo.put("adrt_owner", ardto.get(i).getAdrt_owner());
			jo.put("adrt_category", ardto.get(i).getAdrt_category());
			jo.put("adrt_address", ardto.get(i).getAdrt_address());
			jo.put("adrt_localurl", ardto.get(i).getAdrt_localurl());
			ja.put(jo);
		}
		return ja.toString();

	}

	@PostMapping("/insertRestaurant")
	@ResponseBody
	public String insertRestaurant(@RequestParam("primecode") String primecode) {
		String check = "true";
		if (primecode != null) {
			ardao.insertRestaurant(primecode);
		} else
			check = "false";

		return check;
	}

	@PostMapping("/deleteRestaurant")
	@ResponseBody
	public String deleteRestaurant(@RequestParam("primecode") String primecode) {
		String check = "true";
		if (primecode != null) {
			ardao.deleteRestaurant(primecode);
		} else
			check = "false";

		return check;
	}

}
