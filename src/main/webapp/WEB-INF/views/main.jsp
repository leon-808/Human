<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<<<<<<< HEAD
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css/basic.css">
=======
<jsp:include page="/WEB-INF/views/metaLink.jsp"/>
>>>>>>> 7c02edcb35cd5d5a17604adfbb7473b2737051c0
<link rel="stylesheet" href="/css/main/main.css">
<link rel="stylesheet" href="/css/main/dd.css">
<title>메인 페이지</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body>
<<<<<<< HEAD

<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style="position: fixed; top: 50%; left: 10px; transform: translateY(-50%); z-index: 20;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  	<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
	</svg></button>

<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">마이페이지</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <p>정보란</p>
  </div>
</div>
	<div id="map"></div>
=======
	<div class="top_sidebar">
		<div class="header" role="banner">
	        <h1 class="header_title">
	            <a class="a_title">kakaomap</a>
	            <button id="button_log" class="btn btn-danger">로그인</button>
	        </h1>
	        <button class="choice_currentmap btn btn-success">현 지도 내 장소검색</button>
			<div class="box_searchbar">
			    <input id="search_input" class="tf_keyword" maxlength="100" 
			    autocomplete="off" placeholder="장소, 주소 검색">
			    <button id="search_button">검색</button>
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
    		<div style="display: flex;">
	    		<h3 class="sf_title">카테고리</h3>
	    		<label id="off_category" class="toggleSwitch off"><span>끄기</span></label>
	    	</div>
    		<div class="sf_fcr">
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/KoreanFood" class="btn-check" name="fc" value="koreanfood">
	    			<label for="/img/main/KoreanFood">
	    				<img src="/img/main/KoreanFood.png" class="fc_img"></img><br>
	    				<span>한식</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/ChinaFood" class="btn-check" name="fc" value="chinafood">
	    			<label for="/img/main/ChinaFood">
	    				<img src="/img/main/ChinaFood.png" class="fc_img"></img><br>
	    				<span>중식</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/JapanFood" class="btn-check" name="fc" value="japanfood">
	    			<label for="/img/main/JapanFood">
	    				<img src="/img/main/JapanFood.png" class="fc_img"></img><br>
	    				<span>일식</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/WesternFood" class="btn-check" name="fc" value=westernfood">
	    			<label for="/img/main/WesternFood">
	    				<img src="/img/main/WesternFood.png" class="fc_img"></img><br>
	    				<span>양식</span>
	    			</label>
    			</div>
    			<div style="line-height: 62.5%"><br><br></div>
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/Pizza" class="btn-check" name="fc" value="pizza">
	    			<label for="/img/main/Pizza">
	    				<img src="/img/main/Pizza.png" class="fc_img"></img><br>
	    				<span>피자</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/Chicken" class="btn-check" name="fc" value="chicken">
	    			<label for="/img/main/Chicken">
	    				<img src="/img/main/Chicken.png" class="fc_img"></img><br>
	    				<span>치킨</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/Jokbal" class="btn-check" name="fc" value="jokbal">
	    			<label for="/img/main/Jokbal">
	    				<img src="/img/main/Jokbal.png" class="fc_img"></img><br>
	    				<span>족발</span>
	    			</label>
    			</div>
    			<div class="each_fcr">
	    			<input type="radio" id="/img/main/Cafe" class="btn-check" name="fc" value="cafe">
	    			<label for="/img/main/Cafe">
	    				<img src="/img/main/Cafe.png" class="fc_img"></img><br>
	    				<span>카페</span>
	    			</label>
    			</div>
    		</div>
    	</div>
    	<div class="sf_filter">
    		<div style="display: flex;">
	    		<h3 class="sf_title">사용자 선호도 정렬</h3>
	    		<label id="off_orderby" class="toggleSwitch off"><span>끄기</span></label>
	    	</div>
	    	<div style="line-height: 40%"><br><br></div>
	    	<input type="radio" id="often" class="btn-check" name="orderby" value="often">
    		<label for="often" class="toggleSwitch often"><span>자주 가는 맛집순</span></label>
    		<input type="radio" id="rare" class="btn-check" name="orderby" value="rare">
    		<label for="rare" class="toggleSwitch rare"><span>많이 가지 않은 맛집순</span></label>
    	</div>
    	<div class="sf_filter">
    		<h3 class="sf_title">맛집 태그</h3>
    		<div class="tag_row">
	    		<div class="tag_column">
		    		<span class="tag_category">편의성</span>
		    		<input type="checkbox" name="tags"  id="clean" class="btn-check" value="clean">
					<label for="clean" class="toggleSwitch2 clean"><span>청결</span></label>
					<input type="checkbox" name="tags"  id="kind" class="btn-check" value="kind">
					<label for="kind" class="toggleSwitch2 kind"><span>친절</span></label> 
					<input type="checkbox" name="tags"  id="parking" class="btn-check" value="parking">
					<label for="parking" class="toggleSwitch2 parking"><span>주차</span></label>
					<input type="checkbox" name="tags"  id="fast" class="btn-check" value="fast">
					<label for="fast" class="toggleSwitch2 fast"><span>조리</span></label>
					<input type="checkbox" name="tags"  id="pack" class="btn-check" value="pack">
					<label for="pack" class="toggleSwitch2 pack"><span>포장</span></label>
				</div>
				<div class="tag_column">
					<span class="tag_category">분위기</span>
					<input type="checkbox" name="tags"  id="alone" class="btn-check" value="alone">
					<label for="alone" class="toggleSwitch2 alone"><span>혼밥</span></label>
					<input type="checkbox" name="tags"  id="together" class="btn-check" value="together">
					<label for="together" class="toggleSwitch2 together"><span>단체</span></label>
					<input type="checkbox" name="tags"  id="focus" class="btn-check" value="focus">
					<label for="focus" class="toggleSwitch2 focus"><span>집중</span></label>
					<input type="checkbox" name="tags"  id="talk" class="btn-check" value="talk">
					<label for="talk" class="toggleSwitch2 talk"><span>대화</span></label>
					<input type="checkbox" name="tags"  id="photoplace" class="btn-check" value="photoplace">
					<label for="photoplace" class="toggleSwitch2 photoplace"><span>사진</span></label>
				</div>
				<div class="tag_column">
					<span class="tag_category" style="margin-left: 10px;">맛과 가격</span>
					<input type="checkbox" name="tags"  id="delicious" class="btn-check" value="delicious">
					<label for="delicious" class="toggleSwitch2 delicious"><span>맛</span></label> 
					<input type="checkbox" name="tags"  id="lot" class="btn-check" value="lot">
					<label for="lot" class="toggleSwitch2 lot"><span>양</span></label> 
					<input type="checkbox" name="tags"  id="cost" class="btn-check" value="cost">
					<label for="cost" class="toggleSwitch2 cost"><span>가성비</span></label> 
					<input type="checkbox" name="tags"  id="portion" class="btn-check" value="portion">
					<label for="portion" class="toggleSwitch2 portion"><span>알참</span></label>
					<input type="checkbox" name="tags"  id="satisfy" class="btn-check" value="satisfy">
					<label for="satisfy" class="toggleSwitch2 satisfy"><span>만족</span></label>
				</div>
			</div>
    	</div>
    </div>
    <div class="mapView">
		<div id="map"></div>
	</div>
>>>>>>> 7c02edcb35cd5d5a17604adfbb7473b2737051c0
	<div class="cursor">
		<img src="" id="cursorImg">
	</div>
<jsp:include page="/WEB-INF/views/script.jsp"/>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=	329e5620a47418538719e0a8fbdae4ce&libraries=services"></script>
<script src="/js/main/main.js"></script>
<<<<<<< HEAD
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
=======
<script src="/js/main/dd.min.js"></script>
>>>>>>> 7c02edcb35cd5d5a17604adfbb7473b2737051c0
</body>
</html>