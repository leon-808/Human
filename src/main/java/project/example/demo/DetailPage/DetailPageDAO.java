package project.example.demo.DetailPage;


import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;
import project.example.demo.dto.ReviewDTO;

@Mapper
public interface DetailPageDAO {
	ArrayList<RestaurantDTO> getRDetail(String primecode);
	ArrayList<ReviewDTO> getReview(String x1);

	void reviewInsert(String x1,String x2,String x3,String string,String x5);
}
