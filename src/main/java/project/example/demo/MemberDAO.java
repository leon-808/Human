package project.example.demo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDAO {
	String get_id(String id,String pw);
	
	int check_duplicateID(String id);
}
