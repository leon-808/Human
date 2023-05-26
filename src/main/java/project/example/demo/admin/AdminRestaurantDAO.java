package project.example.demo.admin;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.AdminRestaurantDTO;

@Mapper
public interface AdminRestaurantDAO {
	ArrayList<AdminRestaurantDTO> adminRestaurantList();

	void insertRestaurant(String primecode);

	void deleteRestaurant(String primecode);
}
