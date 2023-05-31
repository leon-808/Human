const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
userGrade=null;
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
.on("click", ".alm_ceo", addCeoInput)
.on("propertychange change paste input", "#primecode", onlyNumber)
.on("click", "#button_log", manageLoginButton)
.on("click", "#search_button", search)
.on("click", "#off_category", offCategory)
.on("click", "#off_orderby", offOrderby)
.on("click", "#off_tags", offTags)
.on("click", ".alm_suggest", suggestALM)
.on("click", "#btn-myPage", showMyData)
.on("click", "#btn-GO-signUpdate", signUpdate)
.on("click", ".toggle_sidebar", toggleBarandMap)
.on("click", ".dt_suggest", suggestDT)
.on("click", ".choice_currentmap", rectSearch)
.on("click", "#btn-pasSetting", showTagSetting)
.on("click", "#btn-reviewSetting", showReviewSetting)
.on("click", "#btn-storeSetting", showStoreSetting)
.on("click", "#btn-backMain", gotoMain)
.on("click", "#btn-saveMyTag", saveTag)
.on("click", "#userReviewCount",showReviewSetting)
.on("click", "#clearMarkerButton", clearMarkers)



.on("click", "#currentLocationButton", function() {
	map.panTo(new kakao.maps.LatLng(selfLat, selfLng));
})

.on("keyup", "#search_input", function(e) {
	if (e.keyCode == 13) {
		search();
	}
	return false;
})

$(".each_fcr").hover(function() {
	$(this).css("background-image", "url('/img/main/FC_HoverRectangle.png')");
	$(this).css("background-position", "center");
}, function() {
	$(this).css("background-image", "none");
})

$("input:radio[name='fc']").change(function() {
	$("input[name='fc']").each(function() {
		let id = $(this).attr("id");
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).children("img").attr("src", id + "Act.png");
		}
		else {
			$(`label[for='${id}']`).children("img").attr("src", id + ".png");
		}
	})
})

$("input:radio[name='orderby']").change(function() {
	$("input[name='orderby']").each(function() {
		let id = $(this).attr("id");
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).addClass("active");
		}
		else $(`label[for='${id}']`).removeClass("active");
	})
})

$("input:checkbox[name='tags']").change(function() {
	$("input:checkbox[name='tags']").each(function() {
		let id = $(this).attr("id");
		if ($(this).prop("checked")) {
			$(`label[for='${id}']`).addClass("active");
		}
		else $(`label[for='${id}']`).removeClass("active");
	})
})

$("#currentLocationButton").hover(function() {
	$(this).css("background-position-y", "-350px");
}, function() {
	$(this).css("background-position-y", "-450px");
})

$(".eraserIcon").hover(function() {
	$(this).css("background-position-x", "-140px");
}, function() {
	$(this).css("background-position-x", "-80px");
})

$("#gotoAdminRestaurant").click(function() {
	document.location = "/admin/restaurant";
})


let loginFlag = 0;

function isLogin() {
	$.ajax({
		url: "/isLogin",
		type: "post",
		dataType: "text",
		success: function(isLogin) {
			if (isLogin == "true" || isLogin == "admin") { 
				createUI(isLogin);
				loginFlag = 1;
				checkTag();
			}	
		}
	})
}

function createUI(isLogin) {
	let addLocationButton = `
		<button id="addLocationButton" class="controlButton cursorButton"></button>`
	$(".controlBox").append(addLocationButton);
	$("#button_log").html("로그아웃");
	$(".middle_sideMessage").css("display", "none");
	$(".sf_filter").css("display", "block");
	if (isLogin == "admin") {
		$(".header_title").append(`
		<button id="button_manage" class="btn btn-dark" data-bs-toggle="modal"
		data-bs-target="#manageModal">관리</button>`)
	}
}



let mapOption, map, lat, lng, selfOverlay = 0;
let zoomControl = new kakao.maps.ZoomControl();
let selfLat, selfLng = 0;

function geoPosition() {
	let imageSrc = "/img/main/HumanMarker.png",
	imageSize = new kakao.maps.Size(30, 30),
	imageOption = {offset: new kakao.maps.Point(20, 20)},
	markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
	selfMarker, selfContent = 0;
	
	lat = 36.81044107630051,
	lng = 127.14647463417765;
	selfLat = lat; selfLng = lng;
	makeMap(lat, lng);
	
	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
				
	selfMarker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(lat, lng),
		image: markerImage,
		clickable: true
	})
	selfMarker.setMap(map);
	
	selfContent = `
		<div class="simpleOverlay">
	  		<span class="simpleOverlayTitle" onclick="closeOverlay()">내 위치</span>
	  	</div>`;
	selfOverlay = new kakao.maps.CustomOverlay({
		map: map,
		position: selfMarker.getPosition(),
		content: selfContent,
		xAnchor: 0.6,
		yAnchor: -0.2
	});
	
	kakao.maps.event.addListener(selfMarker, "click", function() {
		selfOverlay.setMap(map);
	});
	selfOverlay.setMap(null);
	
	kakao.maps.event.addListener(map, "rightclick", function(e) {
		if ($("#cursorImg").attr("src") == "/img/main/AddLocationCursor.gif") {
			$("#addLocationButton").trigger("click");
		}
		return false;
	})
	
	isAdminSearch();
	
	/*if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				lat = position.coords.latitude; 
				lng = position.coords.longitude;
				selfLat = lat; selfLng = lng;
				makeMap(lat, lng);
				
				map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
							
				selfMarker = new kakao.maps.Marker({
					position: new kakao.maps.LatLng(lat, lng),
					image: markerImage,
					clickable: true
				})
				selfMarker.setMap(map);
				
				selfContent = `
					<div class="simpleOverlay">
				  		<span class="simpleOverlayTitle" onclick="closeOverlay()">내 위치</span>
				  	</div>`;
				selfOverlay = new kakao.maps.CustomOverlay({
					map: map,
					position: selfMarker.getPosition(),
					content: selfContent,
					xAnchor: 0.6,
					yAnchor: -0.2
				});
				
				kakao.maps.event.addListener(selfMarker, "click", function() {
					selfOverlay.setMap(map);
				});
				selfOverlay.setMap(null);
				
				kakao.maps.event.addListener(map, "rightclick", function(e) {
					if ($("#cursorImg").attr("src") == "/img/main/AddLocationCursor.gif") {
						$("#addLocationButton").trigger("click");
					}
					return false;
				})
			});
		isAdminSearch();
	}
	else {
		lat = 36.81044107630051,
		lng = 127.14647463417765;
		makeMap(lat, lng);
		isAdminSearch();
	}*/
}

function makeMap(lat, lng) {
	mapOption = {
		center: new kakao.maps.LatLng(lat , lng),
		level: 2
	},
	map = new kakao.maps.Map($("#map").get(0), mapOption);
}

let adminSearchFlag = 0;

function isAdminSearch() {
	if (window.location.href.includes("/main/search/")) {
		adminSearchFlag = 1;
		let tempURL = window.location.href.split("search/"),
		query = tempURL[1],
		searchURL = 
			`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10
			&query=${query}"`;
		addressSearch(searchURL, query);
	}
}



function closeOverlay() {
	if (selfOverlay != null) selfOverlay.setMap(null);
	if (addLocationOverlay != null) addLocationOverlay.setMap(null);
	if (openedKeywordOverlay != null) openedKeywordOverlay.setMap(null);
	if (openedAddressOverlay != null) openedAddressOverlay.setMap(null);
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
	map.setCenter(latLng);
	
	$("#addLocationButton").css("background-position-y", "-450px");
	$("#cursorImg").attr("src", "");
	
	check_duplicateLocation(latLng);
	
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

function check_duplicateLocation(latLng) {
	let geocoder = new kakao.maps.services.Geocoder();
	let lng = latLng.getLng(), lat = latLng.getLat(),
	address = "";
	
	let callback = function(result, status) {
		if (status === kakao.maps.services.Status.OK) {
			if (result[0].road_address != null) address = JSON.stringify(result[0].road_address.address_name);
			else address = JSON.stringify(result[0].address.address_name);
		}
			
		if (addLocationFlag == 1) {
			$.ajax({
				url: "/check/duplicateLocation",
				type: "post",
				data: {
					address: address
				},
				dataType: "json",
				success: function(data) {
					if (data.length != 0) {
						alert("해당 위치에 이미 등록된 장소가 있습니다");
					}
					else {
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
					 					<option value="koreanfood" data-image="/img/main/KoreanFood.png">한식</option>
					 					<option value="chinafood" data-image="/img/main/ChinaFood.png">중식</option>
					 					<option value="japanfood" data-image="/img/main/JapanFood.png">일식</option>
					 					<option value="westernfood" data-image="/img/main/WesternFood.png">양식</option>
					 					<option value="pizza" data-image="/img/main/Pizza.png">피자</option>
					 					<option value="chicken" data-image="/img/main/Chicken.png">치킨</option>
					 					<option value="jokbal" data-image="/img/main/Jokbal.png">족발</option>
					 					<option value="cafe" data-image="/img/main/Cafe.png">카페</option>
					 				</select>
					 			</div>
					 			<div class="alm_append">
					 			</div>
					 			<a class="alm_ceo" isCEO = 0>사장님이신가요?</a>
					 			<div><button class="alm_suggest btn btn-primary" aors="">제안하기</button></div>
						 	</div>
						 </div>`;
						 
						 addLocationOverlay.setContent(emptyContent);
						 addLocationOverlay.setPosition(latLng);
						 addLocationOverlay.setMap(map);
					}
					$("#r_name").val(dt_placename);
					
					if (addLocationMarker.getMap() != null && selectedKeywordMarker == null) {
						$(".alm_suggest").attr("aors", "a");
					}
					else if (addLocationMarker.getMap() == null && selectedKeywordMarker != null) {
						$(".alm_suggest").attr("aors", "s");
					}
				}
			})
		}
	}
	geocoder.coord2Address(lng, lat, callback);
}

let isCEO = 0;

function addCeoInput() {
	if ($(this).attr("isCEO") == 0) {
		let html = [];
		html.push(`
			<div>
				<input type="tel" id="primecode" class="alm_input" 
				placeholder="사업자번호" maxlength="10"><br>
				<label for="primecode"></label>
			</div>
			<div>
				<label for="input_bnd">사업자 증빙 서류</label>
 				<input class="form-control" type="file" name="upload_bnd" id="input_bnd" 
 				accept=".jpg, .jpeg, .png, .webp .jfif">
			</div>`)
		$(".alm_append").append(html);
		$(this).html("사장님 아니에요");
		$(this).attr("isCEO", 1);
		isCEO = 1;
	}
	else {
		$(".alm_append").empty();
		$(this).html("사장님이신가요?");
		$(this).attr("isCEO", 0);
		isCEO = 0;
	}
}

function onlyNumber() {
	let phone = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(phone);
	if (phone.length == 10) {
		let splited = phone.split(""),
		labelPhone = "사업자 번호: ";
		for (i = 0; i < splited.length; i++) {
			labelPhone += splited[i];
			if (i == 2 || i == 4) labelPhone += "-";
		}
		$("label[for='primecode']").html(labelPhone);
	}
	else $("label[for='primecode']").html("");
}

function suggestALM() {
	let marker = null;
	
	if ($(".alm_suggest").attr("aors") == "a") {
		marker = addLocationMarker;
	}
	else marker = selectedKeywordMarker;
	
	let formData = new FormData(),
	files = null;
	
	let lat = marker.getPosition().getLat(),
	lng = marker.getPosition().getLng(),
	primecode = $("input[id='primecode']").val(),
	r_name = $("#r_name").val(),
	category = $("#category option:selected").val(),
	address = "";
		
	if (isCEO == 1) {
		files = $("input[name='upload_bnd']")[0].files;
		fileSize = $("input[name='upload_bnd']")[0].files[0].size;
		for (i = 0; i < files.length; i++) formData.append("bnd", files[i]);
	}
	
	let geocoder = new kakao.maps.services.Geocoder();
	let callback = function(result, status) {
		if (status === kakao.maps.services.Status.OK) {
			if (result[0].road_address != null) address = JSON.stringify(result[0].road_address.address_name);
			else address = JSON.stringify(result[0].address.address_name);
			
			let restaurant = {
				lat: lat,
				lng: lng,
				primecode: primecode,
				r_name: r_name,
				category: category,
				address: address
			}
			formData.append("restaurant", new Blob([JSON.stringify(restaurant)], {type: "application/json"}));
			
			if (isCEO == 1) {
				$.ajax({
					url: "/suggest/alm/ceo",
					type: "post",
					contentType: false,
					processData: false,
					data: formData,
					dataType: "text",
					beforeSend: function() {					
						if (r_name == "" || category == "") {
							alert("상호명과 카테고리 분류는 필수입니다");
							return false;
						}
						else if (isCEO == 1 && (primecode.length != 10 || formData.get("bnd") == null)) {
							alert("사업자 번호와 증빙 서류는 필수입니다");
							return false;
						}
						else if (fileSize > 5 * 1024 * 1024) {
							alert("첨부 파일 사이즈는 5MB 이내로 등록 가능합니다")
							return false;
						}
					},
					success: function(message) {
						if (message == "proceed") {
							alert("해당 내용으로 맛집 등록이 요청되었습니다");
							location.reload();
						}
						else {
							alert("이미 등록 요청이 된 맛집입니다");
						}
					},
					error: function() {
						alert("카카오 서버와 통신에 실패했습니다");
					}
				})
			}
			else {
				$.ajax({
					url: "/suggest/alm/user",
					type: "post",
					contentType: false,
					processData: false,
					data: formData,
					dataType: "text",
					beforeSend: function() {					
						if (r_name == "" || category == "") {
							alert("상호명과 카테고리 분류는 필수입니다");
							return false;
						}
					},
					success: function(message) {
						if (message == "proceed") {
							alert("해당 내용으로 맛집 등록이 요청되었습니다");
							location.reload();
						}
						else {
							alert("이미 등록 요청이 된 맛집입니다");
						}
					},
					error: function() {
						alert("카카오 서버와 통신에 실패했습니다");
					}
				})
			}
		}
	}
	geocoder.coord2Address(lng, lat, callback);
}

let dt_placename = "";

function suggestDT() {
	if (loginFlag == 1) {
		let position = selectedKeywordMarker.getPosition();
		dt_placename = $(".dt_placename").text();
		closeOverlay();
		addLocationFlag = 1;
		check_duplicateLocation(position);
	}
	else {
		alert("로그인하셔야 맛집 제안이 가능합니다");
	}
}



function manageLoginButton() {
	if ($(this).text() == "로그인") {
		document.location = "/login";
	}
	else {
		$.ajax({
			url: "/logout",
			type: "post",
			dataType: "text",
			success: function() {
				alert("로그아웃 되었습니다");
				document.location = "/login";
			}
		})
	}
}



function search() {
	let sf_count = 0;
	$("input:radio[name='fc']").each(function() {
		if ($(this).prop("checked") == true) {
			sf_category = $(this).val();
			sf_count++; return false;
		}
	});
	$("input:radio[name='orderby']").each(function() {
		if ($(this).prop("checked") == true) {
			sf_count++; return false;
		}
	});
	$("input:checkbox[name='tags']").each(function() {
		if ($(this).prop("checked") == true) {
			sf_count++; return false;
		}
	});
	
	let position = map.getCenter();
	let lat = position.getLat(),
	lng = position.getLng();
	
	if (sf_category == "" && sf_count == 0) {
		markersNuller(keywordMarkers);
		markersNuller(addressMarkers);  
		let query = encodeURI($("#search_input").val());
		let searchURL =
		`https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=${query}&x=${lng}&y=${lat}`;
		$.ajax({
			url: searchURL,
			type: "get",
			headers: {
				"Authorization": "KakaoAK 996c306ef122d0be2b100a12e7f2e6ac"
			},
			dataType: "json",
			beforeSend: function() {
				if (query == "") {
					alert("검색어를 입력해주세요");
					return false;
				}
			},
			success: function(data) {
				if (data.documents.length != 0) {
					let bounds = new kakao.maps.LatLngBounds();
					for (i = 0; i < data.documents.length; i++) {
						displayKeywordMarker(data.documents[i]);
						bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
					}
					map.setBounds(bounds);
					map.setCenter(new kakao.maps.LatLng(data.documents[0].y, data.documents[0].x));
				}
				else addressSearch(searchURL, query);
			},
			error: function() {
				alert("카카오 서버와 통신하지 못했습니다");
			}
		})
	}
	else if (sf_count != 0) { 
		
	}	 
}

function rectSearch() {
		let sf_count = 0;
	$("input:radio[name='fc']").each(function() {
		if ($(this).prop("checked") == true) {
			sf_category = $(this).val();
			sf_count++; return false;
		}
	});
	$("input:radio[name='orderby']").each(function() {
		if ($(this).prop("checked") == true) {
			sf_count++; return false;
		}
	});
	$("input:checkbox[name='tags']").each(function() {
		if ($(this).prop("checked") == true) {
			sf_count++; return false;
		}
	});
	
	let position = map.getCenter();
	let lat = position.getLat(),
	lng = position.getLng();
	
	let bounds = map.getBounds(),
	swLat = bounds.getSouthWest().getLat().toString() + ",",
	swLng = bounds.getSouthWest().getLng().toString() + ",",
	neLat = bounds.getNorthEast().getLat().toString(),
	neLng = bounds.getNorthEast().getLng().toString() + ",";
	
	let tempBoundary = swLng + swLat + neLng + neLat;
	boundary = encodeURI(tempBoundary);	
			
	if (sf_category == "" && sf_count == 0) {
		markersNuller(keywordMarkers); 
		let query = encodeURI($("#search_input").val());
		let searchURL =
		`https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy
		&query=${query}&x=${lng}&y=${lat}&rect=${boundary}`;
		$.ajax({
			url: searchURL,
			type: "get",
			headers: {
				"Authorization": "KakaoAK 996c306ef122d0be2b100a12e7f2e6ac"
			},
			dataType: "json",
			beforeSend: function() {
				if (query == "") {
					alert("검색어를 입력해주세요");
					return false;
				}
			},
			success: function(data) {
				if (data.documents.length != 0) {
					let bounds = new kakao.maps.LatLngBounds();
					for (i = 0; i < data.documents.length; i++) {
						displayKeywordMarker(data.documents[i]);
						bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
					}
					map.setBounds(bounds);
					map.setCenter(new kakao.maps.LatLng(data.documents[0].y, data.documents[0].x));
				}
				else addressSearch(searchURL, query);
			},
			error: function() {
				alert("카카오 서버와 통신하지 못했습니다");
			}
		})
	}
	else if (sf_count != 0) { 
		
	}	 
}



function addressSearch(searchURL, query) {
	searchURL = 
		`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10
		&query=${query}"`
	$.ajax({
		url: searchURL,
		type: "get",
		headers: {
			"Authorization": "KakaoAK 996c306ef122d0be2b100a12e7f2e6ac"
		},
		dataType: "json",
		success: function(data) {
			if (data.documents.length != 0) {
				let bounds = new kakao.maps.LatLngBounds();
				for (i = 0; i < data.documents.length; i++) {
					displayAddressMarker(data.documents[i]);
					bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
				}
				map.setBounds(bounds);
				map.setCenter(new kakao.maps.LatLng(data.documents[0].y, data.documents[0].x));
			}
			else {
				alert("키워드 에러가 의심됩니다\n주소명을 정확히 입력해주세요");
			}
		},
		error: function() {
			alert("카카오 서버와 통신하지 못했습니다");
		}
	})
}

let keywordMarkers = [];
let selectedKeywordMarker = null,
openedKeywordOverlay = null;

function displayKeywordMarker(data) {
	let keywordMarker = new kakao.maps.Marker({
		clickable: true,
		map: map,
		position: new kakao.maps.LatLng(data.y, data.x)
	}),
	detailOverlay = new kakao.maps.CustomOverlay({
		clickable: true
	}),
	infowindow = new kakao.maps.InfoWindow({
		content: `<div class="iw_placename">${data.place_name}</div>`
	});
	
	kakao.maps.event.addListener(keywordMarker, "click", function() {
		if (selectedKeywordMarker != null && keywordMarker != selectedKeywordMarker) {
			openedKeywordOverlay.setMap(null);
		}
		selectedKeywordMarker = keywordMarker;
		let detailContent = `
		 	<div class="dt_info">
		 		<div class="dt_title">
		 			<span class="dt_placename">${data.place_name}</span>
		 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
		 		</div>
			 	<div class="alm_body">
		 			<p>도로명 주소: ${data.road_address_name}</p>
		 			<p>지번 주소: ${data.address_name}</p>
		 			<button class="dt_suggest btn btn-primary">맛집으로 제안하기</button>
			 	</div>
			 </div>`;
		 map.setCenter(keywordMarker.getPosition());
		 detailOverlay.setContent(detailContent);
		 detailOverlay.setPosition(keywordMarker.getPosition());
		 detailOverlay.setMap(map);
		 openedKeywordOverlay = detailOverlay;
	});
	
	kakao.maps.event.addListener(keywordMarker, "mouseover", function() {
		infowindow.open(map, keywordMarker);
	})
	kakao.maps.event.addListener(keywordMarker, "mouseout", function() {
		infowindow.close();
	})
		
	keywordMarkers.push(keywordMarker);
}



let addressMarkers = [];
let selectedAddressMarker = null,
openedAddressOverlay = null;

function displayAddressMarker(data) {
	let addressMarker = new kakao.maps.Marker({
		clickable: true,
		map: map,
		position: new kakao.maps.LatLng(data.y, data.x)
	}),
	detailOverlay = new kakao.maps.CustomOverlay({
		clickable: true
	});
	
	let address = data.address_name;
	if (data.address_name == null) address = data.address.address_name;
	
	let infowindow = new kakao.maps.InfoWindow({
		content: `<div class="iw_placename">${address}</div>`
	});
	
	kakao.maps.event.addListener(addressMarker, "click", function() {
		if (selectedAddressMarker != null && addressMarker != selectedAddressMarker) {
			openedAddressOverlay.setMap(null);
		}
		selectedAddressMarker = addressMarker;
		let detailContent = `
		 	<div class="dt_info">
		 		<div class="dt_title">
		 			<span class="dt_placename">${address}</span>
		 			<div class="alm_close" onclick="closeOverlay()" title="닫기"></div>
		 		</div>
			 	<div class="alm_body">
		 			<p>도로명 주소: ${data.address_name}</p>
		 			<p>지번 주소: ${data.address.address_name}</p>`;
		 if (adminSearchFlag == 0) {
			 detailContent = detailContent + 
 			 `<button class="dt_suggest btn btn-primary">맛집으로 제안하기</button></div></div>`
		 }
		 else {
			 detailContent = detailContent + `</div></div>`;
		 } 
		 map.setCenter(addressMarker.getPosition());
		 detailOverlay.setContent(detailContent);
		 detailOverlay.setPosition(addressMarker.getPosition());
		 detailOverlay.setMap(map);
		 openedAddressOverlay = detailOverlay;
	});
	
	kakao.maps.event.addListener(addressMarker, "mouseover", function() {
		infowindow.open(map, addressMarker);
	})
	kakao.maps.event.addListener(addressMarker, "mouseout", function() {
		infowindow.close();
	})
		
	addressMarkers.push(addressMarker);
}

function markersNuller(markers) {
	for (i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
}



let sf_category = "";

function offCategory() {
	sf_category = "";
	$("input:radio[name='fc']").each(function() {
		$(this).prop("checked", false);
		let id = $(this).attr("id");
		$(`label[for='${id}']`).children("img").attr("src", id + ".png");
	})
}

function offOrderby() {
	$("input:radio[name='orderby']").each(function() {
		$(this).prop("checked", false);
		let id = $(this).attr("id");
		$(`label[for='${id}']`).removeClass("active");
	})
}
function offTags() {
	$("input:checkbox[name='tags']").each(function() {
		$(this).prop("checked", false);
		let id = $(this).attr("id");
		$(`label[for='${id}']`).removeClass("active");
	})
}



function toggleBarandMap() {
	if ($(this).hasClass("tsb_close")) {
		$(".tsb_open").css("display", "block");
	}
	else {
		$(".tsb_open").css("display", "none");
	}
}



function clearMarkers() {
	markersNuller(keywordMarkers);
	addLocationMarker.setMap(null);
}



function clickCurrentLocaitonButton() {
	
}



/*.on("click", "#btn-myPage", showMyData)
.on("click", "#btn-GO-signUpdate", signUpdate)
.on("click", ".toggle_sidebar", toggleBarandMap)
.on("click", ".dt_suggest", suggestDT)
.on("click", ".choice_currentmap", rectSearch)
.on("click", "#btn-pasSetting", showTagSetting)
.on("click", "#btn-reviewSetting", showReviewSetting)
.on("click", "#btn-storeSetting", showStoreSetting)
.on("click", "#btn-backMain", gotoMain)
.on("click", "#btn-saveMyTag", saveTag)
.on("click", "#userReviewCount",showReviewSetting)
.on("click", "#clearMarkerButton", clearMarkers)*/

let isMyPage = 0;

function showMyData() {
	if (loginFlag == 1) {
		if (isMyPage == 0) {
			$(".top_sidebar").empty();
			$(".top_sidebar").append(
			`<div class="profil" role="banner">
				<span class="profil img"><img src="/img/main/profil.jpg"
					width="85" height="85"></span>
				<div class="profil info">
					<span id="profil_user_name"></span>님 안녕하세요
					<button id="btn-GO-signUpdate"></button>
					<div style="line-height: 50%"><br><br></div>
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
			</div>`);
			isMyPage = 1;
			$("#food_categories").css("display", "none");
			$("#btn-saveMyTag").css("display", "block");
			checkTag();
			get_userName();
			get_userReviewCount();
		}
	}
	else alert("로그인이 필요한 페이지입니다.");
}
function checkTag() {
	var orderby = localStorage.getItem("orderby");

	if (orderby !== "" || null) {
		$("input[type='radio'][value='" + orderby + "']").prop("checked", true);
		var checkedRadio = $("input[type='radio']:checked");

		if (checkedRadio.length > 0) {
			var checkedRadioId = checkedRadio.attr("id");
			$(`label[for='${checkedRadioId}']`).addClass("active");
		}
		var storedValues = localStorage.getItem("tags");

		if (storedValues) {
			checkedValues = JSON.parse(storedValues);
			$("input:checkbox[name='tags']").each(function() {
				var value = $(this).val();
				if (checkedValues.includes(value)) {
					$(this).prop("checked", true);
					$(`label[for='${this.id}']`).addClass("active");
				}
			});
		}
	}
}

function gotoMain() {
	isMyPage = 0;
	$("#food_categories").css("display", "block");
	$("#btn-saveMyTag").css("display", "none");
	$(".top_sidebar").empty();
	$(".top_sidebar").append(`
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
			 	<button type="button" class="btn btn-success" id="btn-myPage">마이페이지</button>	
			  	<button type="button" id="challenge" class="btn btn-danger" data-bs-toggle="tooltip" 
			  	data-bs-placement="right" data-bs-title="내 취향의 가보지 않은 맛집 찾기">도전</button>
			</div>
		</div>`);
}

function get_userName() {
	$.ajax({
		url: "/get/userName",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.length != 0) {
				$("#profil_user_name").text(data[0]["name"]);
			}

		}
	})
}

function get_userReviewCount() {
	$.ajax({
		url: "/get/userReviewCount",
		type: "post",
		dataType: "json",
		success: function(count) {
			$("#userReviewCount").text(count);
			get_userGrade(count);
		}
	})
}

function get_userGrade(count) {
	if (count <= 5) {
		// 은색 배경
		$(".btn-userGrade").text("맛보기");
		$(".btn-userGrade").css("color", "#ffffff");
		$(".btn-userGrade").addClass("silver-background");
	}
	else if (count >= 10 && count < 15) {
		// 금색 배경
		$(".btn-userGrade").text("맛돌이");
		$(".btn-userGrade").css("color", "#ffffff");
		$(".btn-userGrade").addClass("gold-background");
	}
	else if (count >= 15 && count < 20) {
		// 플래티넘 배경
		$(".btn-userGrade").text("맛고수");
		$(".btn-userGrade").css("color", "#ffffff");
		$(".btn-userGrade").addClass("platinum-background");
	}
	else if (count >= 20) {
		// 다이아몬드 배경
		$(".btn-userGrade").text("미식가");
		$(".btn-userGrade").css("color", "#808080");
		$(".btn-userGrade").addClass("diamond-background");
	}
}



function signUpdate() {
	document.location = "/signupdate";
}



function showTagSetting() {
	$(".sf_filter").css("display", "block");
	$("#food_categories").css("display", "none");
	$("#btn-saveMyTag").css("display", "block");
	$(".div_reviewList").css("display", "none");
	$(".div_storeList").css("display", "none");
	$("#btn-pasSetting").css("color", "white");
	$("#btn-pasSetting").css("background-color", "#15571e");
	$("#btn-reviewSetting").css("color", "white");
	$("#btn-reviewSetting").css("background-color", "#06a64f");
	$("#btn-storeSetting").css("color", "white");
	$("#btn-storeSetting").css("background-color", "#06a64f");
}
function showReviewSetting(){
	$(".sf_filter").css("display", "none");
	$("#btn-saveMyTag").css("display", "none");
	$(".div_reviewList").css("display", "block");
	$(".div_storeList").css("display", "none");
	$("#btn-pasSetting").css("color", "white");
	$("#btn-pasSetting").css("background-color", "#06a64f");
	$("#btn-reviewSetting").css("color", "white");
	$("#btn-reviewSetting").css("background-color", "#15571e");
	$("#btn-storeSetting").css("color", "white");
	$("#btn-storeSetting").css("background-color", "#06a64f");
}
function showStoreSetting(){
	$(".sf_filter").css("display", "none");
	$("#btn-saveMyTag").css("display", "none");
	$(".div_reviewList").css("display", "none");
	$(".div_storeList").css("display", "block");
	$("#btn-pasSetting").css("color", "white");
	$("#btn-pasSetting").css("background-color", "#06a64f");
	$("#btn-reviewSetting").css("color", "white");
	$("#btn-reviewSetting").css("background-color", "#06a64f");
	$("#btn-storeSetting").css("color", "white");
	$("#btn-storeSetting").css("background-color", "#15571e");
}


function saveTag() {
	checkedValues = [];
	orderby = $("input:radio[name='orderby']:checked").val();
	localStorage.setItem("orderby", orderby);
	$("input:checkbox[name='tags']").each(function() {
		if ($(this).prop("checked") == true) {
			checkedValues.push($(this).val());
		}
	})
	localStorage.setItem("tags", JSON.stringify(checkedValues));
  	alert("설정 태그가 저장되었습니다.");
}