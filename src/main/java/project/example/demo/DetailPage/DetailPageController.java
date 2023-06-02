package project.example.demo.DetailPage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import okio.BufferedSink;
import okio.BufferedSource;
import okio.Okio;
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
	public String getReviewInsert(HttpServletRequest req, @RequestParam(value="photo", required = false) MultipartFile photo) {
		HttpSession session = req.getSession();
		String id = (String) session.getAttribute("id");
	   
		if(id==null) {
			return "login";
		}
		
		String retval="ok";
		
		String rv_photo = "";
		
		try {
			String rv_primcode = req.getParameter("primecode");
			String rv_id = req.getParameter("id");
			String rv_visit = req.getParameter("visit");
			String tagsString = req.getParameter("tags");
			String[] tagsArray = tagsString.split(",");			
			String tags = String.join(",", tagsArray);			
			String rv_detail = req.getParameter("detail");
			String rv_r_name = req.getParameter("rname");
			String rv_address = req.getParameter("raddress");

			if(photo !=null &&!photo.isEmpty()) {
				try {
					String uplocation="src\\main\\resources\\static\\img\\DetailPage";
					String uploadPath = "/img/DetailPage/";
					// 파일 이름 설정 (고유한 파일 이름 생성 또는 원본 파일 이름 사용)
		            String fileName =  rv_r_name + "_" + rv_address + "_" +id + "_" + photo.getOriginalFilename();
						
		            // 파일 저장
		            java.nio.file.Path filePath = Paths.get(uplocation, fileName);
		            BufferedSink sink = Okio.buffer(Okio.sink(filePath.toFile()));
		            BufferedSource source = Okio.buffer(Okio.source(photo.getInputStream()));
		            sink.writeAll(source);
		            sink.close();
		            source.close();
		            
		            // 저장된 파일 경로나 이름을 rv_photo 변수에 저장
		            rv_photo = uploadPath+fileName;
	        
				}catch(Exception e) {
				}
			}else {
				rv_photo="";
			}
			ddao.reviewInsert(rv_primcode,rv_r_name,rv_address,rv_id,rv_photo,rv_visit,tags,rv_detail);
			
			
		}catch(Exception e) {
			retval="fail";
			e.printStackTrace();
		}
		return retval;
	}
	
	@PostMapping("/review/get")
	@ResponseBody
	public String reviewGet(@RequestParam("primecode") String rPrimecode,HttpServletRequest req) {
		String reviewdata;
		Integer reviewCount = ddao.reviewAllCount(rPrimecode);
		
		ArrayList<ReviewDTO> vdao = ddao.getReview(rPrimecode);
		JSONArray ja = new JSONArray();
		for(int i=0;i<vdao.size();i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("rvprimecode", vdao.get(i).getRv_primecode());
			jo.put("rvid", vdao.get(i).getRv_id());
			jo.put("rvvisit", vdao.get(i).getRv_visit());
			jo.put("rvphoto", vdao.get(i).getRv_photo());
			jo.put("tags", vdao.get(i).getTags());
			jo.put("rvdetail", vdao.get(i).getRv_detail());
			jo.put("rvowner", vdao.get(i).getRv_owner());
			jo.put("rvtime", vdao.get(i).getRv_time());
			jo.put("rvrname", vdao.get(i).getRv_r_name());
			jo.put("raddress", vdao.get(i).getRv_address());
			jo.put("reviewcount", reviewCount);
			
			ja.put(jo);
		}		
		reviewdata = ja.toString();
		return reviewdata;
	}
	
	@PostMapping("/review/update")
	@ResponseBody
	public String reviewUpdate(HttpServletRequest req,
							   @RequestParam(value="photo", required = false) MultipartFile photo) {		
		String retval="ok";
		String rv_photo ="";

		try {
			String rv_primcode = req.getParameter("primecode");
			String rv_id = req.getParameter("id");
			String tagsString = req.getParameter("tags");
			String[] tagsArray = tagsString.split(",");			
			String tags = String.join(",", tagsArray);			
			String rv_detail = req.getParameter("detail");
			String rv_r_name = req.getParameter("rname");
			String rv_address = req.getParameter("raddress");
			
			if(photo!=null && !photo.isEmpty()) {
				 String uplocation = "src/main/resources/static/img/DetailPage";
			     String uploadPath = "/img/DetailPage/";
			     String fileName = rv_r_name + "_" + rv_address + "_" +rv_id + "_" + photo.getOriginalFilename();
			     java.nio.file.Path filePath = Paths.get(uplocation, fileName);
			     BufferedSink sink = Okio.buffer(Okio.sink(filePath.toFile()));
			     BufferedSource source = Okio.buffer(Okio.source(photo.getInputStream()));
			     sink.writeAll(source);
			     sink.close();
			     source.close();
            
	            rv_photo = uploadPath+fileName;
			}
			else {
				String oldPhoto = req.getParameter("photo");
				if(oldPhoto != null&& !oldPhoto.isEmpty()) {
					rv_photo= oldPhoto;
				}				
			}			
			ddao.reviewUpdate(rv_r_name,rv_address,rv_id,rv_photo,tags,rv_detail);			
		}catch(Exception e) {
			retval="fail";
			e.printStackTrace();
		}
		System.out.println(retval);
		return retval;
	}
	
	@PostMapping("/review/getMy")
	@ResponseBody
	public String reviewGetMy(@RequestParam("primecode") String rPrimecode,HttpServletRequest req) {
		String id = req.getParameter("id");
		
		String reviewdata;
		
		ArrayList<ReviewDTO> vdao = ddao.getMyReview(rPrimecode,id);
		JSONArray ja = new JSONArray();
		for(int i=0; i<vdao.size();i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("rvprimecode", vdao.get(i).getRv_primecode());
			jo.put("rvid", vdao.get(i).getRv_id());
			jo.put("rvvisit", vdao.get(i).getRv_visit());
			jo.put("rvphoto", vdao.get(i).getRv_photo());
			jo.put("tags", vdao.get(i).getTags());
			jo.put("rvdetail", vdao.get(i).getRv_detail());
			jo.put("rvowner", vdao.get(i).getRv_owner());
			jo.put("rvtime", vdao.get(i).getRv_time());
			
			ja.put(jo);
		}

		reviewdata = ja.toString();
		return reviewdata;
	}
	
	@PostMapping("/review/getReview")
	@ResponseBody
	public String rgR(@RequestParam("primecode") String rPrimecode,
			@RequestParam("id") String id, HttpServletRequest req) {
		String review;
		
		ArrayList<ReviewDTO> vdao = ddao.getMyRUpSel(rPrimecode,id);
		JSONArray ja = new JSONArray();
		for(int i=0; i<vdao.size();i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("rvprimecode", vdao.get(i).getRv_primecode());
			jo.put("rvid", vdao.get(i).getRv_id());
			jo.put("rvvisit", vdao.get(i).getRv_visit());
			jo.put("rvphoto", vdao.get(i).getRv_photo());
			jo.put("tags", vdao.get(i).getTags());
			jo.put("rvdetail", vdao.get(i).getRv_detail());
			jo.put("rvowner", vdao.get(i).getRv_owner());
			jo.put("rvtime", vdao.get(i).getRv_time());
			
			ja.put(jo);
		}
	
		review = ja.toString();
		return review;
	}
	
	@PostMapping("/review/getMyReview")
	@ResponseBody
	public String reviewprime(@RequestParam("primecode") String rPrimecode,HttpServletRequest req) {
		HttpSession session = req.getSession();
		String id = (String) session.getAttribute("id");
			
		String review;
		
		ArrayList<ReviewDTO> vdao = ddao.getMyRUpSel(rPrimecode,id);
		JSONArray ja = new JSONArray();
		for(int i=0; i<vdao.size();i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("rvprimecode", vdao.get(i).getRv_primecode());
			jo.put("rvid", vdao.get(i).getRv_id());
			jo.put("rvvisit", vdao.get(i).getRv_visit());
			jo.put("rvphoto", vdao.get(i).getRv_photo());
			jo.put("tags", vdao.get(i).getTags());
			jo.put("rvdetail", vdao.get(i).getRv_detail());
			jo.put("rvowner", vdao.get(i).getRv_owner());
			jo.put("rvtime", vdao.get(i).getRv_time());
			
			
			ja.put(jo);
		}
	
		review = ja.toString();
		return review;
	}
	
	@PostMapping("/review/delete")
	@ResponseBody
	public String reveiwDelete(@RequestParam("primecode") String rPrimecode,HttpServletRequest req) {
		HttpSession session = req.getSession();
		String id = (String) session.getAttribute("id");		
		String rv_r_name = req.getParameter("rname");
		String rv_address = req.getParameter("raddress");
		
		String retval="ok";
		try {
			ddao.reviewDelete(rv_r_name,rv_address,id);
		}catch(Exception e) {
			retval="fail";
		}		
		return retval;
	}
	
	@PostMapping("/review/deleteImageFiles")
	@ResponseBody
	public String deleteImageFiles(HttpServletRequest req,
								   @RequestParam("primecode") String primecode,
								   @RequestParam(value="photo", required = false) MultipartFile photo) {
		
		String id = req.getParameter("id");
		String rv_r_name = req.getParameter("rname");
		String rv_address = req.getParameter("raddress");
		System.out.println(photo);
		try {
			if(photo==null || photo.isEmpty()) {
				return "fail";
			}
	        // 이미지 파일 삭제 로직 구현
	        String uplocation = "C:\\Users\\admin\\Desktop\\Project\\src\\main\\resources\\static\\img\\DetailPage";
	        String fileName = rv_r_name + "_" + rv_address + "_" +id + "_" + photo.getOriginalFilename(); // 삭제할 파일명 패턴
	        java.nio.file.Path filePath = Paths.get(uplocation, fileName);
	        try {
	            Files.delete(filePath);
	            return "ok";
	        } catch (IOException e) {
	            e.printStackTrace();
	            // 파일 삭제 실패 처리
	            return "fail";
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "fail";
	    }
	}
	
	@PostMapping("/check/review")
	@ResponseBody
	public String checkReview(HttpServletRequest req) {
		String id = req.getParameter("id");
		
		String primecode = req.getParameter("primecode");
		
		int flag=-1;
		
		 if (id.equals("null")) {
		     flag = -1;		     
		 }else if(!id.equals("")){
			flag = ddao.checkReview(primecode,id);
		 }
		
		String check;
		if(flag == -1) {
			check ="비회원";
		}else if(flag ==0) {
			check="리뷰 없음";
		}else {
			check="리뷰 있음";
		}
		return check;
	}
	
	@PostMapping("/tag/top")
	@ResponseBody
	public String tagTop(HttpServletRequest req) {
		String top;
		String primecode = req.getParameter("primecode");
		
		ArrayList<ReviewDTO> vdao = ddao.tagTop(primecode);
		JSONArray ja = new JSONArray();
		for(int i=0;i<vdao.size();i++) {
			JSONObject jo = new JSONObject();
			
			jo.put("tags", vdao.get(i).getTags());
			ja.put(jo);
		}
		
		top = ja.toString();
		return top;
		
	}
	
}
