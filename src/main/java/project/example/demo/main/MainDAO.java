package project.example.demo.main;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;

@Mapper
public interface MainDAO {
	ArrayList<RestaurantDTO> 
	check_duplicateLocation(double latRange1, double latRange2, double lngRange1, double lngRange2);
}