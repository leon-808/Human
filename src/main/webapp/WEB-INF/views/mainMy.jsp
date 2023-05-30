<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/metaLink.jsp" />
<link rel="stylesheet" href="/css/main/main.css">
<link rel="stylesheet" href="/css/main/mainmy.css">
<link rel="stylesheet" href="/css/main/dd.css">
<title>메인 페이지</title>
</head>
<body>
	<div id="wrapper_sidebar" class="offcanvas show offcanvas-start"
		data-bs-scroll="true" data-bs-backdrop="false">
		<div class="top_sidebar">
			<div class="profil" role="banner">
				<span class="profil img"><img src="/img/main/profil.jpg"
					width="85" height="85"></span>
				<div class="profil info">
					<span id="profil_user_name"></span>님 안녕하세요.
					<button id="btn-GO-signUpdate"></button>
					<br>
					<br>
					<button type="button" class="btn-userGrade"></button>
					<span class="profil userInfo">리뷰 <a id=userReviewCount></a></span>
				</div>

			</div>
			<div class="profil_subarea">
				<button type="button" id="btn-backMain">뒤로</button>
				<button type="button" class="btn-userSetting pas"
					id="btn-pasSetting">선호도 관리</button>
				<button type="button" class="btn-userSetting review"
					id="btn-reviewSetting">리뷰 관리</button>
				<button type="button" class="btn-userSetting store"
					id="btn-storeSetting">업체 관리</button>
			</div>
		</div>
		<div class="middle_sidebar">
			<div class="sf_filter">
				<div style="display: flex;">
					<h3 class="sf_title">사용자 선호도 정렬</h3>
					<label id="off_orderby" class="toggleSwitch off"><span>해제</span></label>
					<button type="button" id="btn-saveMyTag">저장</button>
				</div>
				<div style="line-height: 40%">
					<br>
					<br>
				</div>
				<input type="radio" id="often" class="btn-check" name="orderby"
					value="often"> <label for="often"
					class="toggleSwitch often"><span>자주 가는 맛집순</span></label> <input
					type="radio" id="rare" class="btn-check" name="orderby"
					value="rare"> <label for="rare" class="toggleSwitch rare"><span>많이
						가지 않은 맛집순</span></label>
			</div>
			<div class="sf_filter">
				<div style="display: flex;">
					<h3 class="sf_title">맛집 태그</h3>
					<label id="off_tags" class="toggleSwitch off"><span>해제</span></label>
				</div>
				<div class="tag_row">
					<div class="tag_column">
						<span class="tag_category">편의성</span> <input type="checkbox"
							name="tags" id="clean" class="btn-check" value="clean"> <label
							for="clean" class="toggleSwitch2 clean"><span>청결</span></label> <input
							type="checkbox" name="tags" id="kind" class="btn-check"
							value="kind"> <label for="kind"
							class="toggleSwitch2 kind"><span>친절</span></label> <input
							type="checkbox" name="tags" id="parking" class="btn-check"
							value="parking"> <label for="parking"
							class="toggleSwitch2 parking"><span>주차</span></label> <input
							type="checkbox" name="tags" id="fast" class="btn-check"
							value="fast"> <label for="fast"
							class="toggleSwitch2 fast"><span>조리</span></label> <input
							type="checkbox" name="tags" id="pack" class="btn-check"
							value="pack"> <label for="pack"
							class="toggleSwitch2 pack"><span>포장</span></label>
					</div>
					<div class="tag_column">
						<span class="tag_category">분위기</span> <input type="checkbox"
							name="tags" id="alone" class="btn-check" value="alone"> <label
							for="alone" class="toggleSwitch2 alone"><span>혼밥</span></label> <input
							type="checkbox" name="tags" id="together" class="btn-check"
							value="together"> <label for="together"
							class="toggleSwitch2 together"><span>단체</span></label> <input
							type="checkbox" name="tags" id="focus" class="btn-check"
							value="focus"> <label for="focus"
							class="toggleSwitch2 focus"><span>집중</span></label> <input
							type="checkbox" name="tags" id="talk" class="btn-check"
							value="talk"> <label for="talk"
							class="toggleSwitch2 talk"><span>대화</span></label> <input
							type="checkbox" name="tags" id="photoplace" class="btn-check"
							value="photoplace"> <label for="photoplace"
							class="toggleSwitch2 photoplace"><span>사진</span></label>
					</div>
					<div class="tag_column">
						<span class="tag_category" style="margin-left: 10px;">맛과 가격</span>
						<input type="checkbox" name="tags" id="delicious"
							class="btn-check" value="delicious"> <label
							for="delicious" class="toggleSwitch2 delicious"><span>맛</span></label>
						<input type="checkbox" name="tags" id="lot" class="btn-check"
							value="lot"> <label for="lot" class="toggleSwitch2 lot"><span>양</span></label>
						<input type="checkbox" name="tags" id="cost" class="btn-check"
							value="cost"> <label for="cost"
							class="toggleSwitch2 cost"><span>가성비</span></label> <input
							type="checkbox" name="tags" id="portion" class="btn-check"
							value="portion"> <label for="portion"
							class="toggleSwitch2 portion"><span>알참</span></label> <input
							type="checkbox" name="tags" id="satisfy" class="btn-check"
							value="satisfy"> <label for="satisfy"
							class="toggleSwitch2 satisfy"><span>만족</span></label>
					</div>
				</div>
			</div>
			<div class=div_reviewList style="display: none;">
				<h3 class="sf_title">리뷰 관리</h3>
				<p class="userMessage">
		    		리뷰 정보가 없습니다. <br><br>
		    		지금 전국 맛집을 리뷰하면서 다양 리뷰를 작성해보세요. <br>
		    	</p>
			</div>
			<div class=div_storeList style="display: none;">
				<h3 class="sf_title">업체 관리</h3>
				<p class="userMessage">
		    		등록된 업체가 없습니다. <br><br>
		    		사장님이라면 내 업체를 등록해서 직접 관리해보세요. <br>
		    	</p>
			</div>
		</div>
		<div class="toggle_sidebar tsb_close" data-bs-toggle="offcanvas"
			data-bs-target="#wrapper_sidebar"></div>
	</div>
	<div class="toggle_sidebar tsb_open" data-bs-toggle="offcanvas"
		data-bs-target="#wrapper_sidebar"></div>
	<div class="mapView">
		<div id="map"></div>
	</div>
	<div class="cursor">
		<img src="" id="cursorImg">
	</div>
	<jsp:include page="/WEB-INF/views/script.jsp" />
	<script type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=	329e5620a47418538719e0a8fbdae4ce&libraries=services"></script>
	<script src="/js/main/main.js"></script>
	<script src="/js/main/dd.min.js"></script>
</body>
</html>