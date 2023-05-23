<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css/basic.css">
<link href="/css/bootstrap/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="/css/main/main.css">
<link rel="stylesheet" href="/css/main/dd.css">
<title>메인 페이지</title>
</head>
<body>

	<div class="top_sidebar">
		<div class="header" role="banner">
	        <h1 class="header_title">
	            <a class="a_title">kakaomap</a>
	        </h1>
	        <button class="choice_currentmap btn btn-Info">현 지도 내 장소검색</button>
			<div class="box_searchbar">
				<!-- MaxLength 설정해줘야 함 -->
			    <input id="search.keyword.query" class="tf_keyword" maxlength="100" 
			    autocomplete="off" placeholder="장소, 주소 검색">
			    <button class="search_button">검색</button>
			</div>
	        <div class="header_subarea">
			 	<button type="button" class="btn btn-success">마이페이지</button>	
			  	<button type="button" id="challenge" class="btn btn-danger" data-bs-toggle="tooltip" 
			  	data-bs-placement="right" data-bs-title="내 취향의 가보지 않은 맛집 찾기">도전</button>
			</div>
	    </div>
    </div>
    <div class="middle_sidebar">
    	<div class="sf_filter">
    		<h3 class="sf_title">카테고리</h3>
    		<div class="sf_fcr">
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/KoreanFood">
	    			<label for="/img/main/KoreanFood">
	    				<img src="/img/main/KoreanFood.png" class="fc_img"></img><br>
	    				<span>한식</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/ChinaFood">
	    			<label for="/img/main/ChinaFood">
	    				<img src="/img/main/ChinaFood.png" class="fc_img"></img><br>
	    				<span>중식</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/JapanFood">
	    			<label for="/img/main/JapanFood">
	    				<img src="/img/main/JapanFood.png" class="fc_img"></img><br>
	    				<span>일식</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/WesternFood">
	    			<label for="/img/main/WesternFood">
	    				<img src="/img/main/WesternFood.png" class="fc_img"></img><br>
	    				<span>양식</span>
	    			</label>
    			</div>
    			<div style="line-height: 62.5%"><br><br></div>
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/Pizza">
	    			<label for="/img/main/Pizza">
	    				<img src="/img/main/Pizza.png" class="fc_img"></img><br>
	    				<span>피자</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/Chicken">
	    			<label for="/img/main/Chicken">
	    				<img src="/img/main/Chicken.png" class="fc_img"></img><br>
	    				<span>치킨</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/Jokbal">
	    			<label for="/img/main/Jokbal">
	    				<img src="/img/main/Jokbal.png" class="fc_img"></img><br>
	    				<span>족발</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" class="btn-check" name="fc" id="/img/main/Cafe">
	    			<label for="/img/main/Cafe">
	    				<img src="/img/main/Cafe.png" class="fc_img"></img><br>
	    				<span>카페</span>
	    			</label>
    			</div>
    		</div>
    	</div>
    	<div>
			<h3 class="sf_title">사용자 음식 선호도</h3>
			<label class="toggleSwitch off"> <span>끄기</span>
			</label> <label class="toggleSwitch often"> <span>자주가는
					맛집</span>
			</label> <label class="toggleSwitch rarely"> <span>많이
					가지 않은 맛집</span>
			</label>
		</div>
		<div>
			<br>
			<h3 class="sf_title">맛집 태그</h3>
			<br> <br>
			<div class="tagContainer">
				<span class="tagSpan convenience">1.편의성</span> <span
					class="tagSpan ambience">2.분위기</span> <span
					class="tagSpan foodCost">3.음식/가격</span>
			</div>
			<br>
			<label class="toggleSwitch2 clean"> <span>매장 청결</span>
			</label> <label class="toggleSwitch2 alone"> <span>혼밥</span>
			</label> <label class="toggleSwitch2 delicious"> <span>맛있음</span>
			</label> <label class="toggleSwitch2 kind"> <span>친절</span>
			</label> <label class="toggleSwitch2 together"> <span>단체</span>
			</label> <label class="toggleSwitch2 lot"> <span>양많음</span>
			</label> <label class="toggleSwitch2 parking"> <span>주차</span>
			</label> <label class="toggleSwitch2 focus"> <span>집중</span>
			</label> <label class="toggleSwitch2 cost"> <span>가성비</span>
			</label> <label class="toggleSwitch2 fast"> <span>빠른 조리</span>
			</label> <label class="toggleSwitch2 talk"> <span>대화</span>
			</label> <label class="toggleSwitch2 portion"> <span>알찬 구성</span>
			</label> <label class="toggleSwitch2 pack"> <span>포장 가능</span>
			</label> <label class="toggleSwitch2 photoplace"> <span>사진</span>
			</label> <label class="toggleSwitch2 satisfy"> <span>돈값함</span>
			</label>
		</div>
	</div>
    <div class="mapView">
		<div id="map"></div>
	</div>
	<div class="cursor">
		<img src="" id="cursorImg">
	</div>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=	329e5620a47418538719e0a8fbdae4ce"></script>
<script src="https://code.jquery.com/jquery-latest.js"></script>
<script src="/js/bootstrap/bootstrap.bundle.min.js"></script>
  </body>
<script src="/js/main/main.js"></script>
<script src="/js/main/dd.min.js"></script>
</body>
</html>