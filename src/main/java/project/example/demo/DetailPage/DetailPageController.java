package project.example.demo.DetailPage;

import java.net.URLEncoder;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import project.example.demo.dto.RestaurantDTO;

@Controller
public class DetailPageController{
	@Autowired
	private DetailPageDAO ddao;
	
	
	
	@GetMapping("/restaurant/detail/{primecode}")
	public String rdetail(@PathVariable("primecode") String rPrimecode,Model model,HttpServletRequest req) {
		ArrayList<RestaurantDTO> rdao = ddao.getRDetail(rPrimecode);
		
        if (!rdao.isEmpty()) {
            RestaurantDTO restaurant = rdao.get(0);
            model.addAttribute("restaurant", restaurant);
        }
        return "DetailPage";
	}

	@PostMapping("/restaurant/detail/{primecode}")
	@ResponseBody
	public String getDetail(@PathVariable("primecode") String rPrimecode,HttpServletRequest req) {
		//String rPrimecode1 = req.getParameter(rPrimecode);
		String response;
		
		ArrayList<RestaurantDTO> rdao = ddao.getRDetail(rPrimecode);
		JSONArray ja = new JSONArray();
		for(int i=0;i<rdao.size();i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("rprimecode", rdao.get(i).getPrimecode());
			jo.put("rname", rdao.get(i).getR_name());
			jo.put("owner", rdao.get(i).getOwner());
			jo.put("category", rdao.get(i).getCategory());
			jo.put("address", rdao.get(i).getAddress());
			jo.put("rphone", rdao.get(i).getR_phone());
			jo.put("menu", rdao.get(i).getMenu());
			
			ja.put(jo);
		}
		
		response = ja.toString();
		return response;
	}
	
}
