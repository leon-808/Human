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
.on("click", ".cursorButton", clickCursorButton)
.on("click", "#addLocationButton", clickAddLocationButton)



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


let mapOption, map, lat, lng = 0;
let imageSrc = "/img/main/HumanMarker.png",
	imageSize = new kakao.maps.Size(40, 40),
	imageOption = {offset: new kakao.maps.Point(20, 20)},
	markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
	markerPosition, clickMarker, selfMarker, selfContent, selfOverlay = 0;
let zoomControl = new kakao.maps.ZoomControl();

function geoPosition() {
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
}



function clickCursorButton() {
	if ($(".cursor").css("display") == "none") {
		$(".cursor").css("display", "inline-block")
	}
	else $(".cursor").css("display", "none")
}

let addLocationMarker = new kakao.maps.Marker(),
addLocationFlag = 0;

function clickAddLocationButton() {
	if ($(this).css("background-position-y") == "-450px") {
		$(this).css("background-position-y", "-350px");
				
		kakao.maps.event.addListener(map, "click", function(mouseEvent) {
			let latLng = mouseEvent.latLng;
			addLocationMarker.setPosition(latLng);
			check_duplicateLocation();
		})
		map.setLevel(1);
		addLocationFlag = 1;
		addLocationMarker.setMap(map);
	}
	else {
		$(this).css("background-position-y", "-450px");
		map.setLevel(2);
		addLocationFlag = 0;
		addLocationMarker.setMap(null);
	}
	
	if ($("#cursorImg").attr("src") == "") {
		$("#cursorImg").attr("src", "/img/main/AddLocationCursor.gif");
	}
	else $("#cursorImg").attr("src", "");
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
					`<div class="alm_wrap">
					 	<div class="alm_info">
					 		<div class="alm_title">
					 			신규 음식점 제안
					 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
					 		</div>
						 	<div class="alm_body">
						 		<div class="alm_desc">
						 			<div>상호명: <input id="r_name"></div>
						 			<div>카테고리: <input id="category"></div>
						 		</div>
						 	</div>
						 </div>
					 </div>`;
					let emptyOverlay = new kakao.maps.CustomOverlay({
						content: emptyContent,
						map: map,
						position: addLocationMarker.getPosition()
					})
					
					kakao.maps.event.addListener(addLocationMarker, "click", function() {
						emptyOverlay.setMap(map);
					})
				}
			}
		})
	}
}