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
	
//	@PostMapping("/suggest/alm")
	@PostMapping("/suggest/alm/user")
	@ResponseBody
	public String suggest_alm (@RequestPart(value = "restaurant") RestaurantDTO rdto) {
		String message = "proceed";
		
		double lat = rdto.getLat();
		double lng = rdto.getLng();
		String primecode = null;
		String r_name = rdto.getR_name();
		String category = rdto.getCategory();
		String address = rdto.getAddress();
		String owner = null;
		String localURL = null;
		
		mdao.restaurant_approval_request(lat, lng, primecode, r_name, owner, category, address, localURL);
		
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
		String address = rdto.getAddress();

		HttpSession session = req.getSession();
		String owner = String.valueOf(session.getAttribute("id"));
		String idString = String.valueOf(session.getAttribute("id")) + " ";

		LocalDate today = LocalDate.now();
		DateTimeFormatter fd = DateTimeFormatter.ofPattern(" yyyy-MM-DD ");
		String todayString = today.format(fd);
		LocalTime now = LocalTime.now();
		DateTimeFormatter fn = DateTimeFormatter.ofPattern("HH-mm-ss ");
		String timeString = now.format(fn);

		String location = "C:\\Users\\admin\\Documents\\SeoJaeHyeon\\MapProject\\Project\\src\\main\\webapp\\WEB-INF\\files";
		
//		String location = "C:\\Users\\leon1\\eclipse-workspace\\Project\\src\\main\\webapp\\WEB-INF\\files";
		
		String filename = r_name + " " + idString + todayString + timeString + bnd[0].getOriginalFilename();
		File savefile = new File(location, filename);
		try {
			bnd[0].transferTo(savefile);
		} catch (Exception e) {
		}
		String localURL = location + "\\" + filename;

		mdao.restaurant_approval_request(lat, lng, primecode, r_name, owner, category, address, localURL);

		return message;
	}
}