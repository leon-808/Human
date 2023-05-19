<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>홈</title>

<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/css/login.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>


<body>
로그인 확인 페이지<br> 
<button id="btnLogout">로그아웃</button>

    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

</body>

<script>
$(document)
.ready(check_loginStatus)

.on("click","#btnLogout", submit_logout)



function check_loginStatus(){
	$.ajax({
		url: "/check/loginStatus",
		type: "post",
		dataType: "text",
		success: function(check){
			if(check == "fales"){
				clear_login()
				document.location = "/home"
			}
		}
	})
}

function submit_logout(){
	localStorage.clear();
	$.ajax({
		url: "/submit/logout",
		type: "post",
		dataType: "text",
		success: function(check){
			document.location = "/login"
		}
	})
}


function clear_login() {
	$("#div_loginUpper").find("input").val("");
}
</script>
</html>