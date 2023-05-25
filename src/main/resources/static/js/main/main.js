const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$(document)
.ready(isLogin)
.ready(geoPosition)
.mousemove(function(e) {
	let mouseX = e.pageX;
	let mouseY = e.pageY;
	
	$(".cursor").css({
		left: mouseX + "px",
		top: mouseY + "px"
	})
})
.on("click", "#addLocationButton", clickAddLocationButton)
.on("click", ".toggleSwitch", function(){
	$(this).toggleClass("active");
})
.on("click", ".toggleSwitch2", function(){
	$(this).toggleClass("active");
});



$(".each_fcr").hover(function() {
	$(this).css("background-image", "url('/img/main/FC_HoverRectangle.png')");
	$(this).css("background-position", "center");
}, function() {
	$(this).css("background-image", "none");
})

$("input[name='fc']").change(function() {
	$("input[name='fc']").each(function() {
		let id = $(this).attr("id");
		let quote = "'" + id + "'";
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).children("img").attr("src", id + "Act.png");
		}
		else {
			$(`label[for='${id}']`).children("img").attr("src", id + ".png");
		}
	})
})



function isLogin() {
	$.ajax({
		url: "/isLogin",
		type: "post",
		dataType: "text",
		success: function(isLogin) {
			if (isLogin == "true") {} // 로그인 기능과 연동하면 함수를 여기로 옮겨야 함 createAddLocationButton();
			createAddLocationButton();	
		}
	})
}

function createAddLocationButton() {
	addLocationButton = `<div class="controlDiv">
						 	<div class="controlBox">
						 		<button id="addLocationButton" class="controlButton cursorButton"></button>
						 	</div>
						 </div>`
	$("#map").append(addLocationButton);
}


let mapOption, map, lat, lng, selfOverlay = 0;
let zoomControl = new kakao.maps.ZoomControl();

function geoPosition() {
	let imageSrc = "/img/main/HumanMarker.png",
	imageSize = new kakao.maps.Size(30, 30),
	imageOption = {offset: new kakao.maps.Point(20, 20)},
	markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
	selfMarker, selfContent = 0;
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				lat = position.coords.latitude, 
				lng = position.coords.longitude,
				makeMap(lat, lng);
				
				map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
							
				selfMarker = new kakao.maps.Marker({
					position: new kakao.maps.LatLng(lat, lng),
					image: markerImage,
					clickable: true
				})
				selfMarker.setMap(map);
				
				// 마이페이지가 만들어지면 A HERF 의 링크를 수정해야함
				selfContent = `<div class="simpleOverlay">
							  <a herf="mypage" target="_self">	
							  <span class="simpleOverlayTitle" onclick="closeOverlay()">내 위치</span>
							  </a></div>`;
				selfOverlay = new kakao.maps.CustomOverlay({
					map: map,
					position: selfMarker.getPosition(),
					content: selfContent,
					yAnchor: -0.5
				});
				
				kakao.maps.event.addListener(selfMarker, "click", function() {
					selfOverlay.setMap(map);
				});
				selfOverlay.setMap(null);
			});
	}
	else {
		lat = 36.81044107630051,
		lng = 127.14647463417765;
		makeMap(lat, lng);
	}
}

function makeMap(lat, lng) {
	mapOption = {
		center: new kakao.maps.LatLng(lat , lng),
		level: 2
	},
	map = new kakao.maps.Map($("#map").get(0), mapOption);
}

function closeOverlay() {
	selfOverlay.setMap(null);
	addLocationOverlay.setMap(null);
}



let addLocationMarker = new kakao.maps.Marker({
	clickable: true
}),
addLocationOverlay = new kakao.maps.CustomOverlay({
	clickable: true
}),
addLocationFlag = 0;

function addLocationEvent(mouseEvent) {
	let imageSrc = "/img/main/EditMapMarker.png",
	imageSize = new kakao.maps.Size(25, 25),
	imageOption = {offset: new kakao.maps.Point(20, 20)},
	markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
	addLocationMarker.setImage(markerImage);
	
	let latLng = mouseEvent.latLng;
	addLocationMarker.setPosition(latLng);
	addLocationMarker.setMap(map);
	
	$("#addLocationButton").css("background-position-y", "-450px");
	$("#cursorImg").attr("src", "");
	
	check_duplicateLocation();
	
	kakao.maps.event.removeListener(map, "click", addLocationEvent);
}

function popUpAddLocationOverlay() {
	addLocationOverlay.setMap(map);
}

function clickAddLocationButton() {	
	if ($(this).css("background-position-y") == "-450px" &&
		$("#cursorImg").attr("src") == "") {
			
		$(this).css("background-position-y", "-350px");
		$("#cursorImg").attr("src", "/img/main/AddLocationCursor.gif");
		$(".cursor").css("display", "inline-block");
		
		kakao.maps.event.addListener(map, "click", addLocationEvent);
		kakao.maps.event.addListener(addLocationMarker, "click", popUpAddLocationOverlay);
		map.setLevel(1);
		addLocationFlag = 1;
		addLocationMarker.setMap(null);
	 	addLocationOverlay.setMap(null);
	}
	else {
		$(this).css("background-position-y", "-450px");
		$("#cursorImg").attr("src", "");
		$(".cursor").css("display", "none");
		
		kakao.maps.event.removeListener(map, "click", addLocationEvent);
		kakao.maps.event.removeListener(addLocationMarker, "click", popUpAddLocationOverlay);
		map.setLevel(2);
		addLocationFlag = 0;
		addLocationMarker.setMap(null);
		addLocationOverlay.setMap(null);
	}
}

function check_duplicateLocation() {
	let alm = addLocationMarker.getPosition();
	if (addLocationFlag == 1) {
		$.ajax({
			url: "/check/duplicateLocation",
			type: "post",
			data: {
				lat: alm.getLat(),
				lng: alm.getLng()
			},
			dataType: "json",
			success: function(data) {
				if (data.length != 0) {
//					let emptyContent = 
//						`<div class="alm_wrap">
//						 	<div class="alm_info">
//						 		<div class="alm_title">
//						 			신규 음식점 제안
//						 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
//						 		</div>
//							 	<div class="alm_body">
//							 		<div class="alm_desc">
//							 			<div class="alm_doro"></div>
//							 			<div class="alm_jibun"></div>
//							 			<div><a href="detail" target="_blank" class="alm_link">상세 보기</a></div>
//							 			<div><a href="review" target="_blank" class="alm_link">리뷰 보기</a></div>
//							 		</div>
//							 	</div>
//							 </div>
//						 </div>`;
				}
				else {
					// 상세페이지가 만들어지면 링크 수정해야함
					let emptyContent = 
					`<div class="alm_info">
				 		<div class="alm_title">
				 			신규 음식점 제안
				 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
				 		</div>
					 	<div class="alm_body">
				 			<div><input id="r_name" class="alm_input" placeholder="상호명"></div>
				 			<div style="text-align: center">
				 				<select id="category" class="alm_select" is="ms-dropdown">
				 					<option value="">카테고리를 선택하세요</option>
				 					<option value="한식" data-image="/img/main/KoreanFood.png">한식</option>
				 					<option value="중식" data-image="/img/main/ChinaFood.png">중식</option>
				 					<option value="일식" data-image="/img/main/JapanFood.png">일식</option>
				 					<option value="양식" data-image="/img/main/WesternFood.png">양식</option>
				 					<option value="피자" data-image="/img/main/Pizza.png">피자</option>
				 					<option value="치킨" data-image="/img/main/Chicken.png">치킨</option>
				 					<option value="족발" data-image="/img/main/Jokbal.png">족발</option>
				 					<option value="카페" data-image="/img/main/Cafe.png">카페</option>
				 				</select>
				 			</div>
				 			<div><button class="alm_suggest btn btn-primary">제안하기</button></div>
					 	</div>
					 </div>`;
					 
					 addLocationOverlay.setContent(emptyContent);
					 addLocationOverlay.setPosition(addLocationMarker.getPosition());
					 addLocationOverlay.setMap(map);
				}
			}
		})
	}
}