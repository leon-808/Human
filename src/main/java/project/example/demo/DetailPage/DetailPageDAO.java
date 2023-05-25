package project.example.demo.DetailPage;


import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;

@Mapper
public interface DetailPageDAO {
	ArrayList<RestaurantDTO> getRDetail(String primecode);

	void reviewInsert(String x1,String x2,String x3,String str,String x5);
}
