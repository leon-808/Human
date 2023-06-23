package project.example.demo.dto;

import lombok.Data;

@Data
public class U_StatisticDTO {
	String u_id;
	int u_clean, u_kind, u_parking, u_fast, u_pack, u_alone, u_together,
	u_focus, u_talk, u_photoplace, u_delicious, u_portion, u_cost, u_lot, u_satisfy;
	
	String tags;
}