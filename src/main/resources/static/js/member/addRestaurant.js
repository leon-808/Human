$(document)
.ready(isLogin)
.ready(getName)
.on("click","#btnAdd",submit_addRestaurant)
.on("click","#btnUpload",uploadImage)

function submit_addRestaurant(){
	lat = $("#inputLat").val();
	lng = $("#inputLng").val();
	primecode = $("#inputPrimecode").val();
	r_name = $("#inputR_name").val();
	needDocument = $("#inputDocument").val();
	owner =$("#inputOwner").val();
	category = $("#inputCategory").val();
	address = $("#inputAddress").val();
	
	$.ajax({
		url: "/submit/add_restaurant",
		type: "post",
		data: {
			lat: lat,
			lng: lng,
			primecode: primecode,
			r_name: r_name,
			document: needDocument,
			owner: owner,
			category: category,
			address: address
		},
		dataType: "text",
		success: function(check){
			alert("업체를 등록하셨습니다. 관리자 승인 후 확인이 가능합니다.")
			clear_addRestaurant();
			document.location = "/main";
		}
	})
}

function uploadImage(){
	var formData = new FormData();
		
		var inputFile = $("input[name='uploadFile']");
		
		var files = inputFile[0].files;
		
		console.log(files);
		
		// add fileData to formData
		for(var i = 0; i<files.length; i++){
			formData.append("uploadFile",files[i]);
		}
		
		$.ajax({
			url: "/uploadImage",
			processData: false,
			contentType: false,
			data: formData,
			type: "post",
			success: function(result){
				alert("uploaded");
			}
			
		})		
}

function getName(){
	$.ajax({
		url: "/my/name",
		type: "post",
		dataType: "text",
		success: function(name){
			if(name != ""){
				$("#inputOwner").val(name);	
			}
			else{
				alert("로그인 필요")
				document.location = "/login"
			}
		}
		
	})
}

function isLogin() {
	$.ajax({
		url: "/isLogin",
		type: "post",
		dataType: "text",
		success: function(isLogin) {
			if (isLogin != "true") {
				alert("로그인 후 사용이 가능합니다.");
				document.location = "/login"
			}
		}
	})
}

function clear_addRestaurant(){
	lat = $("#inputLat").val("");
	lng = $("#inputLng").val("");
	primecode = $("#inputPrimecode").val("");
	r_name = $("#inputR_name").val("");
	needDocument = $("#inputDocument").val("");
	owner =$("#inputOwner").val("");
	category = $("#inputCategory").val("");
	address = $("#inputAddress").val("");
}


