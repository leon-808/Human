<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>로그인</title>

<link rel="stylesheet" href="/css/member/login.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>


<body>
<div class="main">
    <div class="container text-center">
        <div class="row">
            <div class="col"></div>
            <div class="col-6">
                <h1 class="p-4">로그인</h1>
            </div>
            <div class="col"></div>
        </div>
        
		<!-- ID -->
        <div class="row">
            <div class="col"></div>
            <div class="col-6 p-2">
                <div class=".container-sm row">
                    <div class="col-sm-5">
                        <label for="inputID" class="col-sm-2 col-form-label">ID</label>
                    </div>
                    <div class="col-sm-5" id="div_loginUpper">
                        <input type="text" class="form-control" id="input_loginID">
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        
        <!-- PW -->
        <div class="row">
            <div class="col"></div>
            <div class="col-6 p-2">
                <div class=".container-sm row">
                    <div class="col-sm-5">
                        <label for="inputPassword" class="col-sm-2 col-form-label">PW</label>
                    </div>
                    <div class="col-sm-5" id="div_loginUpper">
                        <input type="password" class="form-control" id="input_loginPW">
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        
        <!-- BUTTON -->
        <div class="row">
            <div class="col"></div>
            <div class="col-4 d-grid gap-2 p-2">
                <button type="button" class="btn btn-primary" id="btnLogin">로그인</button>
            </div>
            <div class="col"></div>
        </div>
        
      	<!-- SIGN,IDFN,PWFN -->
        <div class="row">
            <div class="col"></div>
            <div class="col-4">
                <div class=".container-sm row">
                    <div class="col-sm-4 p-2">
                        <a class="text-decoration-none" id="singup">회원가입&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    </div>
                    <div class="col-sm-4 p-2">
                        <a class="text-decoration-none" id="IdFind">아이디 찾기&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    </div>
                    <div class="col-sm-4 p-2">
                        <a class="text-decoration-none" id="PwFind">비밀번호 찾기</a>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
</div>
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

    <script src="/js/member/login.js"></script>
</body>

</html>