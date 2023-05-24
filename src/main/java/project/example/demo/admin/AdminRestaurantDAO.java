package project.example.demo.admin;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminRestaurantDAO {
	void submit_addRestaurant(int lat,int lng,String primecode,String r_name,
				String document,String owner,String category,String address);
}
