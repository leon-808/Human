package project.example.demo.admin;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminRestaurantDAO {
	int get_count();
}
