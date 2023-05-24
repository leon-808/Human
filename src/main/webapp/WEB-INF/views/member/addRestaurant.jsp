<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin</title>

<link rel="stylesheet" href="/css/member/addRestaurant.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body>
	<div class="title2">
		<h1>업체 등록</h1>
		<hr><br>
		<div class="mb-3 row">
		    <label for="intputR_name" class="col-sm-2 col-form-label">매장 이름</label>
		    <div class="col-sm-7">
		      <input type="text" class="form-control" id="inputR_name">
		    </div>
	  	</div>
		  <div class="mb-3 row">
		    <label for="inputPrimecode" class="col-sm-2 col-form-label">사업자 번호</label>
		    <div class="col-sm-7">
		      <input type="text" class="form-control" id="inputPrimecode" placeholder=' "-" 을 제외하고 입력해주세요.'>
		    </div>
		  </div>
		  <div class="mb-3 row">
		    <label for="inputDocument" class="col-sm-2 col-form-label">증빙 서류</label>
		    <div class="col-sm-7">
		    	<input class="form-control" type="file" name="uploadFile" id="inputDocument">
		    	<button id="btnUpload">Upload</button>
		    </div>
		  </div>
		  <div class="d-grid gap-2 col-8 mx-auto"><br>
			  <button class="btn btn-secondary" type="button" id="btnAdd">등록하기</button>
		  </div>
		  <br><hr>
		  <div>
		  	lat<input type="text" id="inputLat">
		  	lng<input type="text" id="inputLng"><br>
		  	address<input type="text" id="inputAddress">
		  	category<input type="text" id="inputCategory">
		  	owner<input type="text" id="inputOwner">
		  </div>
	</div>
	

    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

    <script src="/js/member/addRestaurant.js"></script>
</body>

</html>
