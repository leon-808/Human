package project.example.demo.DetailPage;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;

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
import project.example.demo.dto.ReviewDTO;

@Controller
public class DetailPageController{
	@Autowired
	private DetailPageDAO ddao;
	
	@GetMapping("/restaurant/detail/{primecode}")
	public String rdetail(@PathVariable("primecode") String rPrimecode,Model model,HttpServletRequest req) {
        
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
			jo.put("rphoto", rdao.get(i).getR_photo());
			
			ja.put(jo);
		}
		
		response = ja.toString();
		return response;
	}
	//리뷰쪽
	@PostMapping("/review/insert")
	@ResponseBody
	public String getReviewInsert(HttpServletRequest req) {
		String retval="ok";
		try {
			String rv_primcode = req.getParameter("primecode");
			String rv_id = req.getParameter("id");
			String rv_photo = req.getParameter("photo");

			String[] tagsString = req.getParameterValues("tags[]");
			String tags = Arrays.toString(tagsString);			
			tags = "'"+tags.substring(1, tags.length() - 1)+"'";
			
			String rv_detail = req.getParameter("detail");
			ddao.reviewInsert(rv_primcode,rv_id,rv_photo,tags,rv_detail);
			
			
		}catch(Exception e) {
			retval="fail";
		}
		System.out.println(retval);
		return retval;
	}
	
	@PostMapping("/review/get/{primecode}")
	@ResponseBody
	public String reviewGet(@PathVariable("primecode") String rPrimecode,HttpServletRequest req) {
		String reviewdata;
		
		ArrayList<ReviewDTO> vdao = ddao.getReview(rPrimecode);
		JSONArray ja = new JSONArray();
		for(int i=0;i<vdao.size();i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("rvprimecode", vdao.get(i).getRV_PRIMECODE());
			jo.put("rvid", vdao.get(i).getRv_id());
			jo.put("rvvisit", vdao.get(i).getRv_visit());
			jo.put("rvphoto", vdao.get(i).getRv_photo());
			jo.put("tags", vdao.get(i).getTags());
			jo.put("rvdetail", vdao.get(i).getRv_detail());
			jo.put("rvowner", vdao.get(i).getRv_owner());
			
			ja.put(jo);
		}		
		
		reviewdata = ja.toString();
		return reviewdata;
	}
}
