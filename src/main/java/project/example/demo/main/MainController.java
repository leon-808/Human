package project.example.demo.main;

import java.io.File;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ch.qos.logback.classic.Logger;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import project.example.demo.dto.MemberDTO;
import project.example.demo.dto.RestaurantDTO;

@Controller
public class MainController {
	@Autowired
	MainDAO mdao;

	@GetMapping("/main")
	public String main_page() {
		return "main";
	}
		
	@GetMapping("/main/search/{query}")
	public String detail(@PathVariable("query") String query) {
		return "main";
	}

	@GetMapping("/mainmy")
	public String mainmy_page() {
		return "mainMy";
	}
	
	@PostMapping("/check/duplicateLocation")
	@ResponseBody
	public String check_duplicateLocation(HttpServletRequest req) {
		String address = req.getParameter("address");

		JSONArray ja = new JSONArray();
		ArrayList<RestaurantDTO> rdto = mdao.check_duplicateLocation(address);

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
	
	@PostMapping("/suggest/alm/user")
	@ResponseBody
	public String suggest_alm (@RequestPart(value = "restaurant") RestaurantDTO rdto) {
		String message = "proceed";
		
		double lat = rdto.getLat();
		double lng = rdto.getLng();
		String primecode = null;
		String r_name = rdto.getR_name();
		String category = rdto.getCategory();
		String address = rdto.getAddress().replace("\"", "");
		String owner = null;
		String localURL = null;
		
		int duplicate = mdao.check_duplicateRequest(r_name, address);
		if (duplicate == 0) 
			mdao.restaurant_approval_request(lat, lng, primecode, r_name, owner, category, address, localURL);
		else message = "duplicate";
		
		return message;
	}
	
	@PostMapping("/suggest/alm/ceo")
	@ResponseBody
	public String suggest_alm(HttpServletRequest req,
			@RequestPart(value = "restaurant") RestaurantDTO rdto,
			@RequestPart(value = "bnd") MultipartFile[] bnd) {
		String message = "proceed";

		double lat = rdto.getLat();
		double lng = rdto.getLng();
		String primecode = rdto.getPrimecode();
		String r_name = rdto.getR_name();
		String category = rdto.getCategory();
		String address = rdto.getAddress().replace("\"", "");
		
		HttpSession session = req.getSession();
		String realname = mdao.get_member_name(String.valueOf(session.getAttribute("id")));
		String owner = String.valueOf(session.getAttribute("id")) + "," + realname;
		String idString = String.valueOf(session.getAttribute("id")) + " ";

		LocalDate today = LocalDate.now();
		DateTimeFormatter fd = DateTimeFormatter.ofPattern(" yyyy-MM-DD ");
		String todayString = today.format(fd);
		LocalTime now = LocalTime.now();
		DateTimeFormatter fn = DateTimeFormatter.ofPattern("HH-mm-ss ");
		String timeString = now.format(fn);
		
		String location = "C:\\Users\\leon1\\eclipse-workspace\\Project\\src\\main\\resources\\static\\img\\admin\\restaurant";
		String shortLocation = "/img/admin/restaurant/";
		
		String filename = r_name + " " + idString + todayString + timeString + bnd[0].getOriginalFilename();
		File savefile = new File(location, filename);
		try {
			bnd[0].transferTo(savefile);
		} catch (Exception e) {
		}
		String localURL = shortLocation + filename;
		
		int duplicate = mdao.check_duplicateRequest(r_name, address);
		if (duplicate == 0) 
			mdao.restaurant_approval_request(lat, lng, primecode, r_name, owner, category, address, localURL);
		else {
			mdao.restaurant_update_request(lat, lng, primecode, r_name, owner, category, address, localURL);
		}

		return message;
	}
}