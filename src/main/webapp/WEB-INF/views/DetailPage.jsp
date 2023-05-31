<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세페이지</title>
</head>
<link href="/css/detailpage/DetailPage.css" rel="stylesheet">
<link rel="stylesheet" href="http://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<body>
<section>
	<div id="restaurantImg" class="restaurantImg">
		<img id="rImg">
	</div>
	<div id="restaurantName" class="restaurantName">
		<pre><input type="text" id="rName" class="inputRDetail" readonly></pre>
		<pre><input type='text' id='rCategory' class='inputDetail' readonly></pre>
		<pre>후기 :<input type="text" id="rReviewN" class="inputRDetail" size="2" readonly></pre>
	</div>
	<div id="restaurantDetail">
		<pre>상세정보</pre>
		<pre><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
			  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
			  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
			  </svg><input type="text" id="rAddress" readonly></pre>
		<pre><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
			 <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
			 </svg><input type="text" id="rPhone"  readonly></span></pre>
	</div>
	<div id="restaurantMenu">
		<pre>메뉴</pre>
		<pre><textarea id="rMenu" readonly></textarea></pre>
	</div>
	<!-- 정보 수정 제안하는 페이지로 넘어가게 하기 -->
	<div id="infoUp">
		<pre><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
		<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
		<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
		</svg> <a href="#">정보 수정 제안하기</a></pre>
	</div>
	<div id="restaurantTage">
		<pre>이런점이 좋았어요</pre>
		<input type="text" id="tagTop1" readonly><br>
		<input type="text" id="tagTop2" readonly><br>
		<input type="text" id="tagTop3" readonly><br>
		<input type="text" id="tagTop4" readonly><br>
		<input type="text" id="tagTop5" readonly><br>		
	</div>
	<div id='reviewPhoto'>
		<pre>사진</pre>
		<img id="reviewP1">
		<img id="reviewP2">
		<img id="reviewP3">
	</div>
	<div id="logincheckReviw">
		<pre>후기를 남기시려면</pre>
		<pre>로그인이 필요합니다.</pre>
	</div>
	<div id='review'>
		<pre>후기를 남겨주세요</pre>
		<div>
			<label class="test_obj" >
				<input type="checkbox" value="청결" id="tags" name="tags">
				<span># 청결</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="친절" id="tags" name="tags">
				<span># 친절</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="주차" id="tags" name="tags">
				<span># 주차</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="조리" id="tags" name="tags">
				<span># 조리</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="포장" id="tags" name="tags">
				<span># 포장</span><br>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="혼밥" id="tags" name="tags">
				<span># 혼밥</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="단체" id="tags" name="tags">
				<span># 단체</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="집중" id="tags" name="tags">
				<span># 집중</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="대화" id="tags" name="tags">
				<span># 대화</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="사진" id="tags" name="tags">
				<span># 사진</span><br>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="맛" id="tags" name="tags">
				<span># 맛</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="양" id="tags" name="tags">
				<span># 양</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="가성비" id="tags" name="tags">
				<span># 가성비</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="알참" id="tags" name="tags">
				<span># 알참</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="만족" id="tags" name="tags">
				<span># 만족</span>
			</label>			
		</div>
		<input type="hidden" id="name" value="<%= session.getAttribute("id") %>" readonly><br>
		<textarea id="myreview" maxlength="2000" placeholder="음식점에 대한 솔직한 리뷰를 작성해주세요.&#13;&#10;서로 배려하는 마음을 담아 작성해주세요."></textarea>
		<br>
		<!-- <form id="imageUploadForm" enctype="multipart/form-data"> -->
			<label for="fileUpload" class="custom-file-upload">
				<i class="fa fa-cloud-upload"></i> 
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
				  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
				  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
				</svg><br>이미지
			</label>
			<input type="file" id="fileUpload" multiple accept="image/*">
		<!-- </form> -->
		<img id="previewImg" width="100"><br><br>
		<input type="button" id=btnSubmit value="리뷰등록">
	</div>	
	
	<div class="myreview-info">
		<table id="review_myTable">
			<tr>
				<th>내 리뷰</th>
			</tr>	
			<tr><td style="height: 25px;"></td></tr>
		</table>
	</div>
	
	<div class="review-info">
		<pre>리뷰 목록</pre>
		<table id="review_table">
			<tr><td style="height: 25px;"></td></tr>
		</table>
	</div>
	
</section>
<!-- 모달 -->
	<div id="reviewModal" style="display: none;">
		<div>
			<label class="test_obj" >
				<input type="checkbox" value="청결" id="tags" name="tagsU">
				<span># 청결</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="친절" id="tags" name="tagsU">
				<span># 친절</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="주차" id="tags" name="tagsU">
				<span># 주차</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="조리" id="tags" name="tagsU">
				<span># 조리</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="포장" id="tags" name="tagsU">
				<span># 포장</span><br>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="혼밥" id="tags" name="tagsU">
				<span># 혼밥</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="단체" id="tags" name="tagsU">
				<span># 단체</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="집중" id="tags" name="tagsU">
				<span># 집중</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="대화" id="tags" name="tagsU">
				<span># 대화</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="사진" id="tags" name="tagsU">
				<span># 사진</span><br>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="맛" id="tags" name="tagsU">
				<span># 맛</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="양" id="tags" name="tagsU">
				<span># 양</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="가성비" id="tags" name="tagsU">
				<span># 가성비</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="알참" id="tags" name="tagsU">
				<span># 알참</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="만족" id="tags" name="tagsU">
				<span># 만족</span>
			</label>			
		</div>
		<input type="hidden" id="nameU" value="<%= session.getAttribute("id") %>"readonly><br>
		<textarea id="myreviewU"></textarea>
		<br><label for="fileUpload1" class="custom-file-upload">
			<i class="fa fa-cloud-upload"></i> 
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
			  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
			  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
			</svg><br>
			</label>
			<input type="file" id="fileUpload1" >
		<img id="previewImg1" width="100"><br><br>
		<input type="button" id=btnreviewup value="리뷰수정">
	</div>
<!-- 모달 -->
	<div id="reviewAllModal" style="display: none;" >
		<div>
			<label class="test_obj" >
				<input type="checkbox" value="청결" id="tags" name="tagsD" readonly>
				<span># 청결</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="친절" id="tags" name="tagsD" readonly>
				<span># 친절</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="주차" id="tags" name="tagsD" readonly>
				<span># 주차</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="조리" id="tags" name="tagsD" readonly>
				<span># 조리</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="포장" id="tags" name="tagsD" readonly>
				<span># 포장</span><br>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="혼밥" id="tags" name="tagsD" readonly>
				<span># 혼밥</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="단체" id="tags" name="tagsD" readonly>
				<span># 단체</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="집중" id="tags" name="tagsD" readonly>
				<span># 집중</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="대화" id="tags" name="tagsD" readonly>
				<span># 대화</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="사진" id="tags" name="tagsD" readonly>
				<span># 사진</span><br>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="맛" id="tags" name="tagsD" readonly>
				<span># 맛</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="양" id="tags" name="tagsD" readonly>
				<span># 양</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="가성비" id="tags" name="tagsD" readonly>
				<span># 가성비</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="알참" id="tags" name="tagsD" readonly>
				<span># 알참</span>
			</label>
			<label class="test_obj">
				<input type="checkbox" value="만족" id="tags" name="tagsD" readonly>
				<span># 만족</span>
			</label>			
		</div><br>
		<textarea id="myreviewD" readonly></textarea>
		<br>
		<img id="previewImgD" width="100"><br><br>
	</div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="/js/detailpage/Detailpage.js"></script>
</html>
