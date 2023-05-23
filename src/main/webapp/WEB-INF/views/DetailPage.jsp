<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세페이지</title>
</head>
<link href="/css/detailpage/DetailPage.css" rel="stylesheet">
<body>
<section>
	<div id="restaurantImg">
		<img id="rImg">
	</div>
	<div id="restaurantName">
		<pre>이름<input type="text" id="rName" class="inputRDetail" readonly><input type='text' id='rCategory' class='inputDetail' readonly></pre>
		<pre>리뷰<input type="text" id="rReviewN" class="inputRDetail" readonly></pre>
	</div>
	<div id="restaurantDetail">
		<pre>상세정보</pre>
		<pre><input type="text" id="rAddress" readonly></pre>
		<pre><input type="text" id="rPhone" readonly></pre>
	</div>
	<div id="restaurantMenu">
		<pre>메뉴</pre>
		<pre><input type="textarea" id="rMenu" readonly></pre>
	</div>
	<div id="restaurantTage">
		<pre>이런점이 좋았어요</pre>
		<pre><input type="text" id="rTage" readonly></pre>
	</div>
	<div id='reviewPhoto'>
		<pre>사진</pre>
	</div>
	<div id='review'>
		<pre>리뷰</pre>
	</div>
</section>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/js/detailpage/Detailpage.js"></script>
</html>
