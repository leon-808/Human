package project.example.demo.DetailPage;


import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;

@Mapper
public interface DetailPageDAO {
	ArrayList<RestaurantDTO> getRDetail(String primecode);
}
