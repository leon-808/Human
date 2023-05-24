package project.example.demo.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class AdminController {
	@Autowired
	private AdminRestaurantDAO mdao;
	
	@GetMapping("/add/restaurant/list")
	public String addRestaurantList_page() {
		return "/admin/addRestaurantList";
	}
	
	@PostMapping("/submit/add_restaurant")
	@ResponseBody
	public String submit_add_restaurnat(HttpServletRequest req) {
		String check = "true";
		String name = "";
		
		HttpSession session = req.getSession();
		
		if (session.getAttribute("name") != null)
		name = session.getAttribute("name").toString();
	
		int lat = Integer.parseInt(req.getParameter("lat"));
		int lng = Integer.parseInt(req.getParameter("lng"));
		String primecode = req.getParameter("primecode");
		String r_name = req.getParameter("r_name");
		String document = req.getParameter("document");
		String owner = name;
		String category = req.getParameter("category");
		String address = req.getParameter("address");
		
		mdao.submit_addRestaurant(lat,lng,primecode,r_name,document,owner,category,address);
		
		return check;
	}

}
