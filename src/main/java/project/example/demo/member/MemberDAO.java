package project.example.demo.member;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDAO {
	String get_id(String id,String pw);
	String get_name(String id,String pw);
	String search_id(String name, String phone);
	
	int check_duplicateID(String id);
	int search_pw(String id, String name, String phone);
	
	void update_pw(String id,String name, String phone, String pw);
	void submit_signup(String id, String pw, String gender, String birth,
			String name, String phone);
	int check_phone(String phone);
}