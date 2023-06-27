package project.example.demo.main;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import project.example.demo.dto.RestaurantDTO;
import project.example.demo.dto.ReviewDTO;
import project.example.demo.dto.StatisticDTO;
import project.example.demo.dto.U_StatisticDTO;

@Mapper
public interface MainDAO {
	ArrayList<RestaurantDTO> check_duplicateLocation(String address);
	
	int check_duplicateRequest(String r_name, String address);
	
	String get_member_name(String id);
		
	void restaurant_approval_request
	(double lat, double lng, String primecode, String r_name, 
	String owner, String category, String address, String localURL);
	
	void restaurant_update_request
	(double lat, double lng, String primecode, String r_name, 
	String owner, String category, String address, String localURL);
	
	String admin_search(String primecode);
	
	ArrayList<RestaurantDTO> get_searchFilterLIst(String query);
	
	int countMyReviewList(String rv_id);
	ArrayList<ReviewDTO> getMyReviewList(String rv_id, int start, int end);
	
	int countMyStoreList(String owner);
	ArrayList<RestaurantDTO> getMyStoreList(String owner, int start, int end);
	
	ArrayList<U_StatisticDTO> get_top3_tags(String u_id);
	
	ArrayList<StatisticDTO> prepare_train_keyQuest(String u_id);
	
	ArrayList<StatisticDTO> prepare_train_value(String u_id, String tag);
	
	ArrayList<StatisticDTO> prepare_challenge(String u_id);
	
	ArrayList<RestaurantDTO> ai_display(String u_id, String activatedTag, String query);
	
	ArrayList<StatisticDTO> prepare_train_keyQuest2(String u_id, String query, String activatedTag);
	
	ArrayList<StatisticDTO> prepare_challenge2(String u_id, String activatedTag);
}