package project.example.demo.main;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import project.example.demo.dto.RestaurantDTO;

@Controller
public class MainController {
	@Autowired
	MainDAO mdao;
	
	@GetMapping("/main")
	public String main_page() {
		return "main";
	}
	
	@PostMapping("/check/duplicateLocation")
	@ResponseBody
	public String check_duplicateLocation(HttpServletRequest req) {
		double lat = Double.parseDouble(req.getParameter("lat"));
		double lng = Double.parseDouble(req.getParameter("lng"));
		
		double differ = 0.00001;
		double latRange1 = lat - differ, latRange2 = lat + differ,
		lngRange1 = lng - differ, lngRange2 = lat + differ;
		
		JSONArray ja = new JSONArray();
		ArrayList<RestaurantDTO> rdto = mdao.check_duplicateLocation(latRange1, latRange2, lngRange1, lngRange2);
		
		for (RestaurantDTO r : rdto) {
			JSONObject jo = new JSONObject();
			jo.put("lat", r.getLat());
			jo.put("lng", r.getLng());
			jo.put("primecode", r.getPrimecode());
			jo.put("r_name", r.getR_name());
			jo.put("owner", r.getOwner());
			jo.put("category", r.getCategory());
			jo.put("address", r.getAddress());
			jo.put("r_phone", r.getR_phone());
			jo.put("r_photo", r.getR_photo());
			
			ja.put(jo);
		}
		return ja.toString();
	}
}