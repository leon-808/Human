package project.example.demo.DetailPage;


import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;
import project.example.demo.dto.ReviewDTO;

@Mapper
public interface DetailPageDAO {
	ArrayList<RestaurantDTO> getRDetail(String primecode);
	ArrayList<ReviewDTO> getReview(String x1);
	ArrayList<ReviewDTO> getMyReview(String x1, String x2);
	ArrayList<ReviewDTO> getMyRUpSel(String x1, String x2);
	ArrayList<ReviewDTO> tagTop(String primecode);

	void reviewInsert(String x1,String x2,String x3,String x4, String string,String x5,String x6,String x7);
	void reviewUpdate(String x1, String x2, String x3, String x4, String x5,String x6);
	void reviewDelete(String x1,String x2,String x3);
	Integer reviewAllCount(String x1);
	int checkReview(String primecode, String id);		
}
