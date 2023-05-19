package project.example.demo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDAO {
	String get_id(String id,String pw);
	
	void submit_signup(String id, String pw, String gender, String birth,
			String name, String phone);

	int check_duplicateID(String id);
	int check_phone(String phone);
}
