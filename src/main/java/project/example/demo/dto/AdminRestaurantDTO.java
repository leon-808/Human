package project.example.demo.dto;

import lombok.Data;

@Data
public class AdminRestaurantDTO {
	int lat,lng;
	String primecode,r_name,document,owner,category,address;
}
