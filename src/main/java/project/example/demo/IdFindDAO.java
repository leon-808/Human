package project.example.demo;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IdFindDAO {
	String search_id(String name, String phone);
	
	int search_pw(String id, String name, String phone);
	void update_pw(String id,String name, String phone, String pw);
	String get_temporalPW(String id,String name, String phone);
}
