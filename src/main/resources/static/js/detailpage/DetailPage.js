$(document)
.ready(function() {
    loadFoodDetails();
    uploadimage();
    uploadimage1();
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
	var ids=id.split(" | ")	
	var idpart = ids[0].trim();
	
	if(idpart !=""){
		console.log(idpart);
		openModal(idpart);
	}
	
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
	const fileInput = document.getElementById("fileUpload1");

	const handleFiles = (e) => {
  	const selectedFile = [...fileInput.files];
	const fileReader = new FileReader();
	
	fileReader.readAsDataURL(selectedFile[0]);	
	
		fileReader.onload = function () {
	  		document.getElementById("previewImg1").src = fileReader.result;
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
	
	var photo = $('#fileUpload')[0].files[0];
	console.log(photo);
	
	// FormData 객체 생성
	var formData = new FormData();
	formData.append('primecode', primecode);
	formData.append('id', $('#name').val());
	formData.append('visit', 1);
	formData.append('photo', photo);
	formData.append('tags', checkboxValues);
	formData.append('detail', $('#myreview').val());

	
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
			detail:$('#myreview').val()
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

function reviewGet() {
    var primecode = window.location.pathname.split('/').pop();

    $.ajax({
        url: '/review/get',
        type: 'post',
        data: {
            primecode: primecode
        },
        dataType: 'json',
        success: function(reviewdata) {
		
			updateReviewCount();
            var reviewTable = $('#review_table');
            reviewTable.empty(); // 데이터를 추가하기 전에 테이블을 비워줍니다.

            var reviewsPerPage = 5; // 페이지 당 표시되는 후기 수
            var totalPages = Math.ceil(reviewdata.length / reviewsPerPage); // 총 페이지 수를 계산합니다.

            var currentPage = 1; // 초기 페이지를 설정합니다.
            displayReviews(currentPage); // 초기 페이지에 해당하는 후기를 표시합니다.

            // 주어진 페이지에 해당하는 후기를 표시하는 함수입니다.
            function displayReviews(page) {
                reviewTable.empty(); // 데이터를 추가하기 전에 테이블을 비워줍니다.

                var startIndex = (page - 1) * reviewsPerPage;
                var endIndex = startIndex + reviewsPerPage;
                var pageReviews = reviewdata.slice(startIndex, endIndex);

                for (let i = 0; i < pageReviews.length; i++) {
					/*var imageScr = "/img/DetailPage/"+pageReviews[0].rvphoto;
					var imageUrl = imageScr;
					console.log(imageScr);
					
					$('#reviewP1').attr('src', imageUrl);
					$('#reviewP2').attr('src', imageUrl);*/
					//$('#reviewP3').attr('src', pageReviews[2].rvphoto);

					var time = pageReviews[i]['rvtime'].split(' ')[0];
                    let str = '<tr>';
                    str += '<td width="300">' + pageReviews[i]['rvid'] +" | "+time+ '</td>';
                    str += '<td><textarea rows=4 cols=30 class="reviewcontent" readonly>' + pageReviews[i]['rvdetail'] + '</textarea></td></tr>';
                    str+='<tr><td height="10"></td></tr>'
                    str += '<tr><td style="border-top: 1px solid #CCCCCC;" colspan="3" height="10" ></td></tr>';

                    reviewTable.append(str);
                }
            }

            // 페이지별로 버튼을 생성합니다.
            var buttonsContainer = $('<div>', { class: 'buttons-container' });

            for (let i = 1; i <= totalPages; i++) {
                var pageBtn = $('<button>', {
                    text: i,
                    class: 'page-btn',
                    disabled: currentPage === i
                }).click(function() {
                    currentPage = i;
                    displayReviews(currentPage);
                    updateButtons();
                });

                buttonsContainer.append(pageBtn);
            }

            // 이전 버튼을 생성합니다.
            var previousBtn = $('<button>', {
                text: '이전',
                class: 'page-btn',
                disabled: currentPage === 1
            }).click(function() {
                if (currentPage > 1) {
                    currentPage--;
                    displayReviews(currentPage);
                    updateButtons();
                }
            });

            // 다음 버튼을 생성합니다.
            var nextBtn = $('<button>', {
                text: '다음',
                class: 'page-btn',
                disabled: currentPage === totalPages
            }).click(function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayReviews(currentPage);
                    updateButtons();
                }
            });

            buttonsContainer.prepend(previousBtn);
            buttonsContainer.append(nextBtn);

            // 버튼 컨테이너를 후기 테이블 뒤에 추가합니다.
            reviewTable.after(buttonsContainer);

            // 버튼 상태를 업데이트하는 함수입니다.
            function updateButtons() {
                buttonsContainer.find('button').each(function() {
                    var button = $(this);
                    var page = parseInt(button.text());

                    button.prop('disabled', page === currentPage);
                });
            }

            // 후기 개수를 업데이트하는 함수입니다.
            function updateReviewCount() {
                if (reviewdata.length > 0) {
					var reviewcount = reviewdata[0]['reviewcount'];
				$('#rReviewN').val(reviewcount);
			    } else {
				$('#rReviewN').val('아직 후기가 없습니다.');
			    }
			}
   			
   			if(reviewdata.length<=5){
				   buttonsContainer.remove();
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
				let str = '<tr>';
			    str += '<td>' + reviewdata[i]['rvid'] + ' | ' + reviewdata[i]['rvtime'] + '</td>';
			    str += '<tr><td><textarea rows=4 cols=50 class="reviewcontent" readonly>' + reviewdata[i]['rvdetail'] + '</textarea></td></tr>';
			    str += '<tr>';
			    str += '<td class="button-container">';
			    str += '<button class="btnEditReview" data-review-id="' + reviewdata[i]['rvid'] + '">수정</button>';
			    str += '<button class="btnReviewDelete" data-review-id="' + reviewdata[i]['rvid'] + '">삭제</button>';
			    str += '</td>';
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
	if(confirm("정말로 지우시겠습니까?")==true){
		$.ajax({
			url:'/review/delete',
			type:'post',
			dataType:'text',
			data:{
				primecode:primecode,
				id:$('#name').val()
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
	} else{
		alert("삭제가 취소됬습니다.");
	}
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
			if(check == "리뷰 없음"){
				$('#review').show();
				$('#logincheckReviw').hide();
			}else if(check == "비회원"){
				$("#review").hide();
				$('#logincheckReviw').show();
				$('.myreview-info').hide();				
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
				
			var categoryCounts = {
                	 cleanlinessC : 0,
	                 kindnessC : 0,
	                 parkingC : 0,
	                 cookingC : 0,
	                 packagingC : 0,
	                 aloneC : 0,
	                 groupC : 0,
	                 focusC : 0,
	                 conversationC : 0,
	                 photoC : 0,
	                 tasteC : 0,
	                 quantityC : 0,
	                 costC : 0,
	                 niceC : 0,
	                 satisfactionC : 0
            };  
            
			
            for (let i = 0; i < tagtop.length; i++) {
                var value = tagtop[i].tags;                
                var values = value.split(',').map(tag => tag.trim());
                
                for (let j = 0; j < values.length; j++) {
				   if(values[j] == "청결"){
					   categoryCounts.cleanlinessC++;					   
				   }else if(values[j] == "친절"){
					   categoryCounts.kindnessC++;
				   }else if(values[j] == "주차"){
					   categoryCounts.parkingC++;
				   }else if(values[j] == "조리"){
					   categoryCounts.cookingC++;
				   }else if(values[j] == "포장"){
					   categoryCounts.packagingC++;
				   }else if(values[j] == "혼밥"){
					   categoryCounts.aloneC++;
				   }else if(values[j] == "단체"){
					   categoryCounts.groupC++;
				   }else if(values[j] == "집중"){
					   categoryCounts.focusC++;
				   }else if(values[j] == "대화"){
					   categoryCounts.conversationC++;
				   }else if(values[j] == "사진"){
					   categoryCounts.photoC++;
				   }else if(values[j] == "맛"){
					   categoryCounts.tasteC++;
				   }else if(values[j] == "양"){
					   categoryCounts.quantityC++;
				   }else if(values[j] == "가성비"){
					   categoryCounts.costC++;
				   }else if(values[j] == "알참"){
					   categoryCounts.niceC++;
				   }else if(values[j] == "만족"){
					   categoryCounts.satisfactionC++;
				   }
					
				}
			}					
			
			var categoryRanking = [];
			
			for (var category in categoryCounts) {
			    if (categoryCounts.hasOwnProperty(category)) {
			        categoryRanking.push({
			            category: category,
			            count: categoryCounts[category]
			        });
			    }
			}
			
			categoryRanking.sort(function(a, b) {
			    return b.count - a.count;
			});	
			
			for ( i = 0; i < categoryRanking.length; i++) {
				
				var category = categoryRanking[i].category;
			
				if(category =="kindnessC"){
					 // 실제 아이콘 코드 포인트로 대체
  					category ="😊 \t친절";							
				}else if(category =="cleanlinessC"){
					category="🧹 \t청결";
				}else if(category =="parkingC"){
					category="🅿️ \t주차"
				}else if(category =="cookingC"){
					category="🍳 \t조리"
				}else if(category =="packagingC"){
					category="🥡 \t포장"
				}else if(category =="aloneC"){
					category="🙇‍♀ \t혼밥"
				}else if(category =="groupC"){
					category="👥 \t단체"
				}else if(category =="focusC"){
					category="🔥 \t집중"
				}else if(category =="conversationC"){
					category="💭 \t대화"
				}else if(category =="photoC"){
					category="📷 \t사진"
				}else if(category =="tasteC"){
					category="🍱 \t맛"
				}else if(category =="quantityC"){
					category="🥣 \t양"
				}else if(category =="costC"){
					category="💰 \t가성비"
				}else if(category =="niceC"){
					category="👌 \t알참"
				}else if(category =="satisfactionC"){
					category="👍 \t만족"
				}
		
				if(i==0){
					$('#tagTop1').val(category+" "+"(" +categoryRanking[0].count+')');
				}else if(i==1){
					$('#tagTop2').val(category+" "+"(" +categoryRanking[1].count+')');	
				}else if(i==2){
					$('#tagTop3').val(category+" "+"(" +categoryRanking[2].count+')');	
				}else if(i==3){
					$('#tagTop4').val(category+" "+"(" +categoryRanking[3].count+')');	
				}else if(i==4){
					$('#tagTop5').val(category+" "+"(" +categoryRanking[4].count+')');	
				}
				
			}
	
		}
        
	})
}
