package project.example.demo.DTO;

import lombok.Data;

@Data
public class RestaurantDTO {
	double lat;
	double lng;
	String primecode;
	String r_name;
	String owner;
	String category;
	String address;
	String r_phone;
	String r_detail;
	String menu;
	String r_photo;
}