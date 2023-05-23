<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css/basic.css">
<link rel="stylesheet" href="/css/main/main.css">
<title>메인 페이지</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body>

<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style="position: fixed; top: 50%; left: 10px; transform: translateY(-50%); z-index: 20;">Enable body scrolling</button>

	<div class="offcanvas offcanvas-start" data-bs-scroll="true"
		data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
		aria-labelledby="offcanvasScrollingLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasScrollingLabel">마이페이지</h5>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas"
				aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div>
				<span>카테고리</span><br> <label class="toggleSwitch korean">
					<span>한식</span>
				</label> <label class="toggleSwitch chinese"> <span>중식</span>
				</label> <label class="toggleSwitch japanese"> <span>일식</span>
				</label> <label class="toggleSwitch western"> <span>양식</span>
				</label> <label class="toggleSwitch pizza"> <span>피자</span>
				</label> <label class="toggleSwitch chicken"> <span>치킨</span>
				</label> <label class="toggleSwitch pork"> <span>족발</span>
				</label> <label class="toggleSwitch cafe"> <span>카페</span>
				</label>
			</div>
			<div>
				<br> <span>사용자 음식 선호도</span> <label class="toggleSwitch off">
					<span>끄기</span>
				</label> <label class="toggleSwitch often"> <span>자주가는
						맛집</span>
				</label> <label class="toggleSwitch rarely"> <span>많이
						가지 않은 맛집</span>
				</label>
			</div>
			<div>
				<span>맛집 장점 태그</span><br>
				<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>1.편의성</span>&nbsp;&nbsp;&nbsp;
				<span>2.분위기</span>&nbsp;&nbsp;&nbsp; <span>3.음식과 가격</span><br>
				<br> <label class="toggleSwitch2 clean"> <span>매장 청결</span>
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
			<div>
			<button>현 지도에서 다시 검색</button>
			<button>업체 등록하기</button>
			</div>

		</div>
	</div>

	<div id="map"></div>
	<div class="cursor">
		<img src="" id="cursorImg">
	</div>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=	329e5620a47418538719e0a8fbdae4ce"></script>
<script src="https://code.jquery.com/jquery-latest.js"></script>
<script src="/js/main/main.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>