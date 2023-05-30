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

	@GetMapping("/admin/restaurant")
	public String check_admin(HttpServletRequest req) {
		HttpSession session = req.getSession();
		if (session.getAttribute("id") != null 
		&& session.getAttribute("id").equals("admin")) return "/admin/adminRestaurant";
		else return "main";
	}

	@PostMapping("/admin/restaurant/getList")
	@ResponseBody
	public String adminRestaurant_getList() {
		ArrayList<AdminRestaurantDTO> ardto = ardao.adminRestaurantList();
		JSONArray ja = new JSONArray();

		for (int i = 0; i < ardto.size(); i++) {
			JSONObject jo = new JSONObject();

			jo.put("adrt_primecode", ardto.get(i).getAdrt_primecode());
			jo.put("adrt_r_name", ardto.get(i).getAdrt_r_name());
			jo.put("adrt_owner", ardto.get(i).getAdrt_owner());
			jo.put("adrt_category", ardto.get(i).getAdrt_category());
			jo.put("adrt_address", ardto.get(i).getAdrt_address());
			jo.put("adrt_localurl", ardto.get(i).getAdrt_localurl());
			ja.put(jo);
		}
		return ja.toString();
	}

	@PostMapping("/admin/insup/restaurant")
	@ResponseBody
	public String admin_insup_restaurant(@RequestParam("primecode") String primecode,
										 @RequestParam("address") String address,
										 @RequestParam("changeFlag") int changeFlag) {
		String check = "insert";
		int exist = ardao.admin_beforeInsUp(address);
		String query = "";
		if (exist == 0 && primecode != "") {
			query = String.format("""
				insert into restaurant (lat, lng, primecode, r_name, owner, category, address) 
				select adrt_lat, adrt_lng, adrt_primecode, adrt_r_name, adrt_owner,
				adrt_category, adrt_address
				from admin_restaurant 
				where adrt_primecode = '%1$s'
				""", primecode);
			ardao.admin_insup_restaurant(query);
			ardao.admin_delete_restaurant(address);
		}
		else if (exist == 0 && primecode == "") {
			query = String.format("""
				insert into restaurant (lat, lng, primecode, r_name, owner, category, address) 
				select adrt_lat, adrt_lng, adrt_primecode, adrt_r_name, adrt_owner,
				adrt_category, adrt_address
				from admin_restaurant 
				where adrt_address = '%1$s'
				""", address);
			ardao.admin_insup_restaurant(query);
			ardao.admin_delete_restaurant(address);
		}
		else if  (exist != 0 && changeFlag == 0) check = "exist";
		else if (changeFlag == 1) {
			query = String.format("""
				update restaurant r
				set (r.lat, r.lng, r.primecode, r.r_name, r.owner, r.category, r.address)
				= (	select a.adrt_lat, a.adrt_lng, a.adrt_primecode, a.adrt_r_name, 
					a.adrt_owner, a.adrt_category, a.adrt_address
					from admin_restaurant a
					where a.adrt_address = '%1$s' )
				where r.address = '%1$s'
				""", address);
			System.out.println(query);
			ardao.admin_insup_restaurant(query);
			ardao.admin_delete_restaurant(address);
			check = "update";
		}
		return check;
	}

	@PostMapping("/admin/delete/restaurant")
	@ResponseBody
	public String admin_delete_restaurant(@RequestParam("address") String address) {
		String check = "true";
		ardao.admin_delete_restaurant(address);
		return check;
	}
}