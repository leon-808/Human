package project.example.demo.DetailPage;


import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;
import project.example.demo.dto.ReviewDTO;

@Mapper
public interface DetailPageDAO {
	ArrayList<RestaurantDTO> getRDetail(String rname,String address);
	ArrayList<ReviewDTO> getReview(String x1,String x2);
	ArrayList<ReviewDTO> getMyReview(String x1, String x2, String x3);
	ArrayList<ReviewDTO> tagTop(String primecode,String address);

	void reviewInsert(String x1,String x2,String x3,String x4, String string,String x5,String x6,String x7);
	void reviewUpdate(String x1, String x2, String x3, String x4, String x5,String x6);
	void reviewDelete(String x1,String x2,String x3);
	Integer reviewAllCount(String x1,String x2);
	int checkReview(String rname,String address ,String id);
	String imagedelete(String rv_r_name, String rv_address, String id);
	int checkOwner(String primecode, String owner);
	void ownerInset(String primecode, String id, String content);	
}
