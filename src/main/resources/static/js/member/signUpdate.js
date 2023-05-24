$(document)
.ready(clear_signup)
.ready(get_signupInfo)
.on('click','#button_submitSignUpdate',update_signup)
.on('click','#button_submitCancel',Cancel_update)
.on('change','#input_phone',check_phone)
.on('change','#input_phone',check_myPhone)

function update_signup() {
	id = $("#input_id").val();
	pw =$("#input_password").val();
	userName = $("#input_name").val();
	phone = $("#input_phone").val();
	gender = $("input[name=gender]:checked").val();
	birth = $("#input_birth").val();
	
	$.ajax({
		url: "/update_signup",
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
			if (phone!=userPhone && $("#error_inputPhone").css("color") != "rgb(0, 128, 0)"){
				alert("이미 등록된 번호입니다.");
				return false;
			}
		},
		success: function(check) {
			alert("회원 정보가 수정되었습니다\n다시 로그인해주세요");
			clear_signup();
			do_logout();
		}
	})
}
function Cancel_update() {
	document.location = "/main";
}
function get_signupInfo() {
	$.ajax({
		url: "/get_signupInfo",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				for (i = 0; i < data.length; i++) {
					$("#input_id").val(data[i]["id"]);
					$("#input_password").val(data[i]["pw"]);
					$("#input_passwordCheck").val(data[i]["pw"]);
					$("#input_name").val(data[i]["name"]);
					$("#input_phone").val(data[i]["phone"]);
					userPhone = data[i]["phone"];
					if (data[i]["gender"] == "남") 
					$("input[value=남]").prop("checked", true);
					else $("input[value=여]").prop("checked", true);
					
					$("#input_birth").val(data[i]["birth"]);
				}
				$("#error_inputPhone").css("color", "green");
				$("#error_inputPhone").text("사용 가능한 번호입니다.");
				$("#error_inputPhone").show();
				
			}
			else {
				alert("로그인이 필요한 페이지입니다");
				document.location = "/main";
			}
		}
	})
}
function check_phone() {
	phone = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(phone);
	
	$.ajax({
		url: "/check/phone",
		type: "post",
		data: {
			phone: phone
		},
		dataType: "text",
		beforeSend: function() {
			if (phone == "") {
				$("#error_inputPhone").text("전화번호는 필수값입니다");
				$("#error_inputPhone").show();
				return false;
			}
		},
		success: function(check) {
			if (check == "true") {
				$("#error_inputPhone").css("color", "green");
				$("#error_inputPhone").text("사용 가능한 번호입니다.");
				$("#error_inputPhone").show();
			}
			else {
				$("#error_inputPhone").css("color", "red");
				$("#error_inputPhone").text("이미 등록된 번호입니다.");
				$("#error_inputPhone").show();
			}

		}
	})
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
function do_logout() {
	$.ajax({
		url: "/submit/logout",
		type: "post",
		dataType: "text",
		success: function(check) {
			document.location = "/login";
		}
	})
}