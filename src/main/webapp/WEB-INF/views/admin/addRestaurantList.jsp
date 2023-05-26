<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Admin</title>

		<link rel="stylesheet" href="/css/admin/addRestaurantList.css">
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
			integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
	</head>

	<body>
		<div class="title1">
			<h1>업체 등록 확인</h1>
			<hr><br>
			<table class="table table-hover" id="tbl_adrtRestaurant">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">매장 이름</th>
						<th scope="col">사업자 번호</th>
						<th scope="col">증빙 서류</th>
						<th scope="col" hidden>LOCALURL</th>
						<th scope="col" hidden>LAT</th>
						<th scope="col" hidden>LNG</th>
						<th scope="col" hidden>OWNER</th>
						<th scope="col" hidden>CATEGORY</th>
						<th scope="col" hidden>ADDRESS</th>
						<th scope="col">승인/거부</th>
					</tr>
				</thead>
			</table>


		</div>


		<script src="https://code.jquery.com/jquery-latest.js"></script>
		<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
			crossorigin="anonymous"></script>

		<script src="/js/admin/addRestaurantList.js"></script>
	</body>

	</html>