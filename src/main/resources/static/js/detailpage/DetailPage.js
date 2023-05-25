$(document)
.ready(function() {
    loadFoodDetails();
    uploadimage();
    reviewGet();
})
.on('click','#btnSubmit',reviewInsert)
.on('')


function loadFoodDetails() {
	var primecode =window.location.pathname.split('/').pop();
    $.ajax({
        url: '/restaurant/detail/' + primecode,
        type: 'post',
        dataType: 'json',
        success: function(response) {
            var restaurant = response[0];

            $('#rImg').attr('src', restaurant.rphoto);
            $('#rName').val(restaurant.rname);
            $('#rCategory').val(restaurant.category);
            $('#rReviewN').val(restaurant.reviewCount);
            $('#rAddress').val(restaurant.address);
            $('#rPhone').val(restaurant.rphone);
            ar=restaurant.menu.split('/');        
            menuConcatenated="";
            for(var i=0;i<ar.length;i++){
				var menuPart = ar[i].trim();
				menuConcatenated += menuPart + "\n";				
			}
			
            $('#rMenu').val(menuConcatenated);      
            $('#rTage').val(restaurant.goodPoints);

           
        },
        error: function() {
            console.log('음식상세정보를 불러오지 못했습니다.');
        }
    });
}

function uploadimage(){
	const fileInput = document.getElementById("fileUpload");

	const handleFiles = (e) => {
  	const selectedFile = [...fileInput.files];
	const fileReader = new FileReader();
	
	fileReader.readAsDataURL(selectedFile[0]);	
	
		fileReader.onload = function () {
	  		document.getElementById("previewImg").src = fileReader.result;
		};
	
	};
	
	fileInput.addEventListener("change", handleFiles);
	$('input[tpye=radio]').prop('checked', false);
}

function reviewCheckId(){
	$.ajax({
		url:"/review/checkid",
		type:"post",
		dataType:"text",
		success:function(logininfo){
			if(logininfo !=""){
				$("#name").val(logininfo);
			}
		}
	})
}

function reviewInsert(){
	var primecode =window.location.pathname.split('/').pop();
	var checkboxValues=[];
	$('input[name="tags"]:checked').each(function(){
		checkboxValues.push($(this).val());
	})

	$.ajax({
		url:"/review/insert",
		type:"post",
		dataType:"text",
		data:{
			primecode:primecode,
			id:$('#name').val(),
			photo:$('#fileUpload').val(),
			tags:checkboxValues,
			detail:$('#myreview').val(),
		},
		beforeSend:function(){
			var content = $('#myreview').val();
			
			if(content ==''){
				alert('내용을 입력하세요');
				return false;
			}else if(checkboxValues==''){
				alert('태그를 하나라도 입력하세요');
				return false;
			}
		},
		success:function(data){
			if(data=="ok"){
				
			}else{
				alert("리뷰 등록 실패");
			}
		},
	})
}

function reviewGet(){
	var primecode =window.location.pathname.split('/').pop();
	$.ajax({
		url:'/review/get/'+primecode,
		type:'post',
		data:{
			primecode:primecode
		},
		dataType:'json',
		success:function(reviewdata){
            for(let i=0;i<reviewdata.length;i++){
				let str='<tr>';
				str +='<td>'+reviewdata[i]['rvid']+'</td>';
				str +='<td>'+reviewdata[i]['rvdetail']+'</td>';
				str += '<td><button onclick="openModal(' + reviewdata[i]['rvid'] + ')">수정</button></td>';
			    str += '<td><button onclick="deleteReview(' + reviewdata[i]['rvid'] + ')">삭제</button></td>';
			    str += '</tr>';
				$('#review_table').append(str);
			}
		}
	})
}

// 모달 열기
function openModal(reviewId) {
  var modal = document.getElementById("reviewModal");
  modal.style.display = "block";

  // 리뷰 내용 로드
  var reviewDetail = getReviewDetail(reviewId);
  document.getElementById("reviewContent").value = reviewDetail;
}

// 리뷰 상세 내용 가져오기
function getReviewDetail(reviewId) {
  // 리뷰 상세 내용을 가져오는 로직을 구현하세요.
  // 예시로 임시로 리뷰 상세 내용을 반환하는 코드를 작성했습니다.
  return "리뷰 " + reviewId + "의 상세 내용";
}

// 모달 닫기
function closeModal() {
  var modal = document.getElementById("reviewModal");
  modal.style.display = "none";
}

// 리뷰 저장
function saveReview() {
  var reviewContent = document.getElementById("reviewContent").value;
  
  // 리뷰 저장 로직을 구현하세요.
  // 예시로 임시로 리뷰 저장 성공을 알리는 코드를 작성했습니다.
  console.log("리뷰 저장: " + reviewContent);
  
  closeModal(); // 모달 닫기
}