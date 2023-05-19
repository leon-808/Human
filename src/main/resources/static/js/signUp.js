$(document)
.ready(clear_signup)
.on("change", "#input_id", check_duplicateID)
.on("focusout", "#input_passwordCheck", check_samePWC)
.on("click", "#button_submitSignup", submit_signup)


function check_duplicateID() {
	id = $("#input_id").val();
	$.ajax({
		url: "/check_duplicateID",
		type: "post",
		data: {
			id: id
		},
		dataType: "text",
		beforeSend: function() {
			validation = /^[A-Za-z0-9]{5,20}$/; 
			if(id == "" || id == null) {
				$("#error_inputID").css("color", "red");
				$("#error_inputID").text("아이디를 입력해주세요");
				return false;
			}
			
			if (validation.test(id) == false) {
				$("#error_inputID").css("color", "red");
				$("#error_inputID").text("ID는 5자 이상, 20자 이하 영문과 숫자만 가능합니다.");
				$("#error_inputID").show();
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				$("#error_inputID").css("color", "green");
				$("#error_inputID").text("사용 가능한 ID입니다.");
				$("#error_inputID").show();
			}
			else {
				$("#error_inputID").css("color", "red");
				$("#error_inputID").text("이미 사용중인 ID입니다.");
				$("#error_inputID").show();
			}
		}
	})
}

function submit_signup() {
	id = $("#input_id").val();
	pw =$("#input_password").val();
	userName = $("#input_name").val();
	phone = $("#input_phone").val();
	gender = $("input[name=gender]:checked").val();
	birth = $("#input_birth").val();
	
	$.ajax({
		url: "/submit_signup",
		type: "post",
		data: {
			id: id,
			pw: pw,
			name: userName,
			gender: gender,
			birth: birth,
			phone: phone
		},
		dataType: "text",
		beforeSend: function() {	
					
			if (userName == "" || userName == null) {
				alert("이름을 입력해주세요.");
				return false;
			}
			if (phone == "" || phone == null) {
				alert("전화번호를 입력해주세요.");
				return false;
			}
			if (birth == "" || birth == null) {
				alert("생년월일을 입력해주세요.");
				return false;
			}
			
			if (pw != $("#input_passwordCheck").val()){
				alert("비밀번호가 일치하지 않습니다.");
				return false;
			}
			
		},
		success: function(check) {
			alert("회원가입이 완료되었습니다");
			clear_signup();
			/* document.location = "/login";  로그인 페이지 주소*/
		}
	})
}

function check_samePWC() {
	pw = $("#input_password").val();
	pwc = $("#input_passwordCheck").val();
	
	if (pw == pwc) {
		$("#error_passwordCheck").css("color", "green");
		$("#error_passwordCheck").text("비밀번호가 일치함");
		$("#error_passwordCheck").show();
	}
	else {
		$("#error_passwordCheck").css("color", "red");
		$("#error_passwordCheck").text("비밀번호가 일치하지 않음");
		$("#error_passwordCheck").show();
	}
}
function clear_signup() {
	$("#id").val("");
	$("#pswd1").val("");
	$("#pswd2").val("");
	$("#name").val("");
	$("#mobile").val("");
	$("input[name=gender]").prop("checked", false);
	$("#birth").val("");
}