$(document)
.ready(function() {
    loadFoodDetails();
    uploadimage();
    reviewGet();
    myreviewGet();
    checkReview();
    tagTop();
})
.on('click','#btnSubmit',reviewInsert)
.on('click','#btnreviewup',reviewUpdate)
.on('click','.btnEditReview',myModalOpen)
.on('click','.btnReviewDelete',reviewDelete)
.on('click','#review_table tr',function(){
	var id=$(this).find('td:eq(0)').text();
	openModal(id);
})
.on('click','input[name="tagsD"]',function(e){
	e.preventDefault();
	return false;
})

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

function uploadimage1(){
	const fileInput = document.getElementById("fileUploadD");

	const handleFiles = (e) => {
  	const selectedFile = [...fileInput.files];
	const fileReader = new FileReader();
	
	fileReader.readAsDataURL(selectedFile[0]);	
	
		fileReader.onload = function () {
	  		document.getElementById("previewImgD").src = fileReader.result;
		};
	
	};
	
	fileInput.addEventListener("change", handleFiles);
	$('input[tpye=radio]').prop('checked', false);
}

function reviewClear(){              
	$('#fileUpload').val('');  // 파일 업로드 필드 초기화
    $('input[name="tags"]').prop('checked', false);  // 태그 체크박스 초기화
    $('#myreview').val('');
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
			visit:1,
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
				reviewClear();
				location.reload();
			}else{
				alert("리뷰 등록 실패");
			}
		},
	})
}

function reviewGet(){
	var primecode =window.location.pathname.split('/').pop();
	
	$.ajax({
		url:'/review/get',
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
				
				var time=reviewdata[i]['rvtime'];
				
				str +='<td>' + time + '</td>';
			    str += '</tr>';
			   
				$('#review_table').append(str);
				

			}
			if (reviewdata.length > 0) {
			  var reviewcount = reviewdata[0]['reviewcount'];
			  $('#rReviewN').val(reviewcount);
		    } else {			
			 	  $('#rReviewN').val('아직 후기가 없습니다.');
			}
			 
		}
		
	})
}

function myreviewGet(){
	var primecode =window.location.pathname.split('/').pop();
	var id=$('#name').val();
	
	if (!id) {
        // id 값이 없을 경우 처리
        console.log('id 값이 없습니다.');
        return false;
    }
	
	$.ajax({
		url:'/review/getMy',
		type:'post',
		data:{
			primecode:primecode,
			id:id
		},
		dataType:'json',
		success:function(reviewdata){
            for(let i=0;i<reviewdata.length;i++){
				let str='<tr>';
				str +='<td>'+reviewdata[i]['rvid']+'</td>';
				str +='<td>'+reviewdata[i]['rvdetail']+'</td>';
				str += '<td><button class="btnEditReview" data-review-id="' + reviewdata[i]['rvid'] + '">수정</button></td>';
			    str += '<td><button class="btnReviewDelete" data-review-id="'+ reviewdata[i]['rvid'] + ')">삭제</button></td>';
			    str += '</tr>';
			    $('#review_myTable').append(str);
			}
		}
	})
	
}

function openModal(id){
	var primecode =window.location.pathname.split('/').pop();
	
	$.ajax({
	    url: '/review/getReview',
	    type: 'post',
	    data:{
			primecode:primecode,
			id:id
		},
	    dataType: 'json',
	    success: function (review) {
            $('#reviewAllModal').dialog({
                title: '리뷰',
                modal: true,
                width: 700,
                
            });
            $('#myreviewD').val(review[0]['rvdetail']);
            $('#fileUploadD').val(review[0]['rvphoto']);
                        
            var tags = review[0]['tags'].split(",").map(function(tag) {
			  return tag.trim();
			});         
			           
            $('input[name="tagsD"]').each(function(){
				var checkboxValue=$(this).val().trim();				
				if(tags.includes(checkboxValue.trim())){
					$(this).prop('checked', true);
				}else{
					$(this).prop('checked',false);
				}
			});
        }
    });
}

function myModalOpen(){
	var primecode =window.location.pathname.split('/').pop();
	
	$.ajax({
	    url: '/review/getMyReview',
	    type: 'post',
	    data:{
			primecode:primecode
		},
	    dataType: 'json',
	    success: function (review) {
            // Open the modal
            $('#reviewModal').dialog({
                title: '리뷰 수정',
                modal: true,
                width: 700,
                
            });
            $('#myreviewU').val(review[0]['rvdetail']);
            $('#previewImg1').val(review[0]['rvphoto']);
            
            var tags = review[0]['tags'].split(",").map(function(tag) {
			  return tag.trim();
			});         
			           
            $('input[name="tagsU"]').each(function(){
				var checkboxValue=$(this).val().trim();
				if(tags.includes(checkboxValue.trim())){
					$(this).prop('checked', true);
				}else{
					$(this).prop('checked',false);
				}
			});
        }
    });
}

function reviewUpdate(){
	var primecode =window.location.pathname.split('/').pop();
	var checkboxValues=[];
	
	$('input[name="tagsU"]:checked').each(function(){
		checkboxValues.push($(this).val());
	})
	
	$.ajax({
		url:'/review/update',
		type:'post',
		dataType:'text',
		data:{
			primecode:primecode,
			id:$('#nameU').val(),
			photo:$('#fileUpload1').val(),
			tags:checkboxValues,
			detail:$('#myreviewU').val(),
		},
		beforeSend:function(){
			var content = $('#myreviewU').val();
			
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
				$('#reviewModal').dialog("close");
				location.reload();
			}else{
				alert("리뷰 업데이트 실패");
			}
		}
	})
	
}

function reviewDelete(){
	var primecode =window.location.pathname.split('/').pop();
	
	$.ajax({
		url:'/review/delete',
		type:'post',
		dataType:'text',
		data:{
			primecode:primecode,
			id:$('#name').val()
		},
		beforSend:function(){
			
		},
		success:function(data){
			if(data=="ok"){
				
				alert("삭제되셨습니다.")
				location.reload();
			}else{
				alert("delete 실패");
			}
		}
	})
}

function checkReview(){
	var primecode =window.location.pathname.split('/').pop();
	var id=$('#name').val();
	
	$.ajax({
		url:"/check/review",
		type:"post",
		data:{
			primecode:primecode,
			id:id
		},
		dataType:"text",
		success:function(check){
			console.log(check);
			if(check == "리뷰 없음"){
				$('#review').show();
				$('#logincheckReviw').hide();
			}else if(check == "비회원"){
				$("#review").hide();
				$('#logincheckReviw').show();
			}else {
				$("#review").hide();
				$('#logincheckReviw').hide();
			}
		}
	})	
}

function tagTop(){
	var primecode =window.location.pathname.split('/').pop();
	
	$.ajax({
		url:"/tag/top",
		type:"post",
		data:{
			primecode:primecode
		},
		dataType:"json",
		success:function(tagtop){
			$('#teaTop1').val();
			$('#teaTop2').val();
			$('#teaTop3').val();
			$('#teaTop4').val();
			$('#teaTop5').val();
		}
	})
}
