package project.example.demo.dto;

import lombok.Data;

@Data
public class AdminRestaurantDTO {
	int adrt_lat, adrt_lng;
	String adrt_primecode, adrt_r_name, adrt_document, adrt_owner, adrt_category, 
	adrt_address, adrt_localurl;
}
