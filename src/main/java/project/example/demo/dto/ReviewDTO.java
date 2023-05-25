package project.example.demo.dto;

import lombok.Data;

@Data
public class ReviewDTO {
	String RV_PRIMECODE;
	String rv_id;
	int rv_visit;
	String rv_photo;
	String tags;
	String rv_detail;
	String rv_owner;
}
