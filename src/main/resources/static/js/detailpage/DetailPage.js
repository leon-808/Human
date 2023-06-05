$(document)
.ready(function() {
    loadFoodDetails();
    uploadimage();
    uploadimage1();
    reviewGetImage();
    myreviewGet();
    checkReview();
    tagRanking();
    textMax();
})
.on('click','#btnSubmit',reviewInsert)
.on('click','#btnreviewup',reviewUpdate)
.on('click','.btnEditReview',myModalOpen)
.on('click','.btnReviewDelete',reviewDelete)
.on('click','.reviewP',photoMax)
.on('click','.reviewPhoto',photoMax)
.on('click','.previewImgD',photoMax)
.on('click','.imgFileD',popupImgFildRm)
.on('click','#review_table tr',function(){
	var id=$(this).find('td:eq(0)').text();
	var ids=id.split(" | ")	
	var idpart = ids[0].trim();
	
	if(idpart !=""){
		openModal(idpart);
	}	
})
.on('click','input[name="tagsD"]',function(e){
	e.preventDefault();
	return false;
})
.on('click','#btnowner',function() {
    var ownerContent = $(this).closest('tr').find('.ownercontent').val();    
    var id = $(this).closest('tr').prev().prev().find('.customid').data('rvid');   
    var primecode =$('#rPrimecode').val();
    ownerReview(ownerContent,id,primecode);
})
.on('click','#btnownerup',function(e){
	e.stopPropagation();
	var ownerContent = $(this).closest('tr').find('.ownercontent').val();    
    var id = $(this).closest('tr').prev().prev().find('.customid').data('rvid');   
    var primecode =$('#rPrimecode').val();
    ownerReview(ownerContent,id,primecode);    
})


//음식점 정보 가져오는 함수
function loadFoodDetails() {
	var rname = decodeURIComponent(window.location.pathname.split('/')[3]);
	var address = decodeURIComponent(window.location.pathname.split('/').pop());

    $.ajax({
        url: '/restaurant/detail/' + rname + '/' + address,
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
            $('#rPrimecode').val(restaurant.rprimecode);
            $('#rOwner').val(restaurant.owner);
            ar=restaurant.menu.split('/');        
            menuConcatenated="";
            for(var i=0;i<ar.length;i++){
				var menuPart = ar[i].trim();
				var menuParts = menuPart.split('-');
                var menuName = menuParts[0].trim();
                var menuPrice = menuParts[1].trim();
                menuConcatenated += menuName + " - " + menuPrice + "\n\n";			
			}
			
            $('#rMenu').text(menuConcatenated);
            var numLines = menuConcatenated.split('\n').length;
            $('#rMenu').attr('rows', numLines);      
            $('#rTage').val(restaurant.goodPoints);

           checkOwner(function(check){
			   if(check=="사장"){
				   $('#review').hide();
				   OwnerReviewList();
			   }else{
				   reviewGet();
			   }
		   });
           
        },
        error: function() {
            console.log('음식상세정보를 불러오지 못했습니다.');
        }
    });
}

//파일 업로드 할 시 이미지 보여주는 함수 내 후기때 나타나는 함수
function uploadimage(){
	const fileInput = document.getElementById("fileUpload");

	const handleFiles = (e) => {
  	const selectedFile = [...fileInput.files];
	const fileReader = new FileReader();
	
	fileReader.readAsDataURL(selectedFile[0]);	
	
		fileReader.onload = function (e) {
	  		$("#preview").html(['<img class="thumb" src="', e.target.result, '" title="', escape(e.name), '"/>'].join(''))
		};
	
	};
	
	fileInput.addEventListener("change", handleFiles);
	$('input[tpye=radio]').prop('checked', false);
}

//파일 업로드 할 시 이미지 보여주는 함수 내 후기 수정지 나타내는 함수
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

//후기 들어가기 전에 이미지 삭제
function popupImgFildRm(){
	$('#fileUpload').val("");
	$('#preview').empty();
}

//리뷰 clear 함수
function reviewClear(){              
	$('#fileUpload').val('');  // 파일 업로드 필드 초기화
    $('input[name="tags"]').prop('checked', false);  // 태그 체크박스 초기화
    $('#myreview').val('');
}

//리뷰 이미지 가져오는 함수
function reviewGetImage() {
	var rname = decodeURIComponent(window.location.pathname.split('/')[3]);
	var address = decodeURIComponent(window.location.pathname.split('/').pop());

    $.ajax({
        url: '/review/get',
        type: 'post',
        data: {
            rname: rname,
            address: address
        },
        dataType: 'json',
        success: function(reviewdata) {
            var reviewPhoto = $('#reviewPhotoList');
            reviewPhoto.empty();

            if (reviewdata.length === 0) {
                reviewPhoto.append('<div class="noPhotos">아직 사진이 없습니다.</div>');
            } else {
                var reviewsPerPage = 3;
                var totalPages = Math.ceil(reviewdata.length / reviewsPerPage);

                var currentPage = 1;
                displayReviews(currentPage);

                // 주어진 페이지에 해당하는 후기를 표시하는 함수입니다.
                function displayReviews(page) {
                    reviewPhoto.empty(); // 데이터를 추가하기 전에 표시 영역을 비워줍니다.

                    var startIndex = (page - 1) * reviewsPerPage;
                    var endIndex = startIndex + reviewsPerPage;
                    var pageReviews = reviewdata.slice(startIndex, endIndex);

                    // 현재 페이지에 해당하는 후기를 표시합니다.
                    for (let i = 0; i < pageReviews.length; i++) {
                        var imageSrc = pageReviews[i]['rvphoto'];
                        if (imageSrc !== undefined) {
                            let photoItem = $('<div>', { class: 'reviewPhotoItem' }).append(
                                $('<img>', { src: imageSrc, class: 'reviewP' })
                            );
                            reviewPhoto.append(photoItem);
                        }
                    }
                }

                if (totalPages > 1) {
                    pagination(totalPages, currentPage, displayReviews);
                }
            }
        }
    });
}

//페이지네이션
function pagination(totalPages, currentPage, displayReviews){
	var reviewPhoto = $('#reviewPhotoList');
    var pageLinksContainer = $('<ul>', { class: 'page-links' });

    for (let i = 1; i <= totalPages; i++) {
        var pageLink = $('<li>', {
            class: 'page-link',
        }).append(
            $('<a>', {
                href: '#',
                text: i,
                class: currentPage === i ? 'active' : '',
                click: function () {
                    currentPage = i;
                    displayReviews(currentPage);
                    updatePageLinks();
                }
            })
        );

        pageLinksContainer.append(pageLink);
    }

    var previousLink = $('<li>', {
        class: 'page-link',
    }).append(
        $('<a>', {
            href: '#',
            text: '<',
            class: currentPage === 1 ? 'disabled' : '',
            click: function () {
                if (currentPage > 1) {
                    currentPage--;
                    displayReviews(currentPage);
                    updatePageLinks();
                }
            }
        })
    );

    var nextLink = $('<li>', {
        class: 'page-link',
    }).append(
        $('<a>', {
            href: '#',
            text: '>',
            class: currentPage === totalPages ? 'disabled' : '',
            click: function () {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayReviews(currentPage);
                    updatePageLinks();
                }
            }
        })
    );

    pageLinksContainer.prepend(previousLink);
    pageLinksContainer.append(nextLink);

    reviewPhoto.after(pageLinksContainer);

    function updatePageLinks() {
        pageLinksContainer.find('a').each(function () {
            var link = $(this);
            var page = parseInt(link.text());

            link.toggleClass('active', page === currentPage);
            link.toggleClass('disabled', page === currentPage || page === 0 || page === totalPages + 1);
        });
    }

    updatePageLinks();
}

//리뷰 목록 가져오는 함수
function reviewGet() {
    var primecode =$('#rPrimecode').val();
	var rname = decodeURIComponent(window.location.pathname.split('/')[3]);
	var address = decodeURIComponent(window.location.pathname.split('/').pop());
	
    $.ajax({
        url: '/review/get',
        type: 'post',
        data: {
            primecode: primecode,
            rname: rname,
            address: address
        },
        dataType: 'json',
        success: function (reviewdata) {
			$('#rReviewN').val(reviewdata.length);
			
            var reviewTable = $('#review_table');
            reviewTable.empty(); // 데이터를 추가하기 전에 테이블을 비워줍니다.

            var reviewsPerPage = 5; // 페이지 당 표시되는 후기 수
            var totalPages = Math.ceil(reviewdata.length / reviewsPerPage); // 총 페이지 수를 계산합니다.

            if (totalPages > 1) {
            var currentPage = 1; // 초기 페이지를 설정합니다.
            displayReviews(currentPage); // 초기 페이지에 해당하는 후기를 표시합니다.

            // 주어진 페이지에 해당하는 후기를 표시하는 함수입니다.
            function displayReviews(page) {
                reviewTable.empty(); // 데이터를 추가하기 전에 테이블을 비워줍니다.

                var startIndex = (page - 1) * reviewsPerPage;
                var endIndex = startIndex + reviewsPerPage;
                var pageReviews = reviewdata.slice(startIndex, endIndex);

                for (let i = 0; i < pageReviews.length; i++) {
                    var time = pageReviews[i]['rvtime'].split(' ')[0];
                    var content = pageReviews[i]['rvowner']
                    let str = '<tr>';
                    str += '<td width="300">' + pageReviews[i]['rvid'] + " | " + time + '</td>';
                    str += '<td><textarea rows=4 cols=30 class="reviewcontent" readonly>' + pageReviews[i]['rvdetail'] + '</textarea></td></tr>';
                    str += '<tr><td height="10"></td></tr>'
                    if(content){
						str += '<tr><td><span>사장님 답글</span></td><td class="ownerc" ><textarea class="ownerreviews" readonly> ⤷ '+content+'</textarea></td></tr>'

					}  
                    str += '<tr><td style="border-top: 1px solid #CCCCCC;" colspan="3" height="10" ></td></tr>';                                                      				
                    reviewTable.append(str);
                }
            }
            createPagination(totalPages, currentPage, displayReviews);
        } else if(totalPages == 0){
			reviewTable.append('<div class="noreview"> 아직 리뷰가 없습니다. 첫 리뷰를 써보세요!</div>');
		}  else {
            // 리뷰가 5개 미만인 경우에는 페이지 네이션을 생성하지 않습니다.
            for (let i = 0; i < reviewdata.length; i++) {
                var time = reviewdata[i]['rvtime'].split(' ')[0];
                var content = reviewdata[i]['rvowner'];
                
                let str = '<tr>';
                str += '<td width="300">' + reviewdata[i]['rvid'] + " | " + time + '</td>';
                str += '<td><textarea rows=4 cols=30 class="reviewcontent" readonly>' + reviewdata[i]['rvdetail'] + '</textarea></td></tr>';
                str += '<tr><td height="10"></td></tr>'
                if(content){								
					str += '<tr><td><span>사장님 답글</span></td><td class="ownerc" ><textarea class="ownerreviews" readonly> ⤷ '+content+'</textarea></td></tr>'
				}
                str += '<tr><td style="border-top: 1px solid #CCCCCC;" colspan="3" height="10" ></td></tr>';				 
                reviewTable.append(str);
            }
       	 }
       }
    })
}

 // 페이지네이션을 생성하는 함수입니다.
function createPagination(totalPages, currentPage, displayReviews) {
	var reviewTable = $('#review_table');
    var pageLinksContainer = $('<ul>', { class: 'page-links' });

    for (let i = 1; i <= totalPages; i++) {
        var pageLink = $('<li>', {
            class: 'page-link',
        }).append(
            $('<a>', {
                href: '#',
                text: i,
                class: currentPage === i ? 'active' : '',
                click: function () {
                    currentPage = i;
                    displayReviews(currentPage);
                    updatePageLinks();
                }
            })
        );

        pageLinksContainer.append(pageLink);
    }

    var previousLink = $('<li>', {
        class: 'page-link',
    }).append(
        $('<a>', {
            href: '#',
            text: '<',
            class: currentPage === 1 ? 'disabled' : '',
            click: function () {
                if (currentPage > 1) {
                    currentPage--;
                    displayReviews(currentPage);
                    updatePageLinks();
                }
            }
        })
    );

    var nextLink = $('<li>', {
        class: 'page-link',
    }).append(
        $('<a>', {
            href: '#',
            text: '>',
            class: currentPage === totalPages ? 'disabled' : '',
            click: function () {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayReviews(currentPage);
                    updatePageLinks();
                }
            }
        })
    );

    pageLinksContainer.prepend(previousLink);
    pageLinksContainer.append(nextLink);

    reviewTable.after(pageLinksContainer);

    function updatePageLinks() {
        pageLinksContainer.find('a').each(function () {
            var link = $(this);
            var page = parseInt(link.text());

            link.toggleClass('active', page === currentPage);
            link.toggleClass('disabled', page === currentPage || page === 0 || page === totalPages + 1);
        });
    }

    updatePageLinks();
}

// 내 리뷰 가져오는 함수
function myreviewGet(){
	var primecode =$('#rPrimecode').val();
	var rname = decodeURIComponent(window.location.pathname.split('/')[3]);
	var address = decodeURIComponent(window.location.pathname.split('/').pop());
	var id=$('#name').val();
	
	$.ajax({
		url:'/review/getMy',
		type:'post',
		data:{
			primecode:primecode,
			id:id,
			rname:rname,
			address:address
		},
		dataType:'json',
		success:function(reviewdata){
            for(let i=0;i<reviewdata.length;i++){
				let str = '<tr>';
			    str += '<td>' + reviewdata[i]['rvid'] + ' | ' + reviewdata[i]['rvtime'] + '</td>';
			    str += '<tr><td><textarea rows=4 cols=50 class="reviewcontent" readonly>' + reviewdata[i]['rvdetail'] + '</textarea></td></tr>';
			    if(reviewdata[i]['rvphoto']){
					str += '<td><img id="reviewPhoto" class="reviewPhoto" src="' + reviewdata[i]['rvphoto'] + '" ></td><tr>';
					str += '<td class="button-container">';
				    str += '<button class="btnEditReview" data-review-id="' + reviewdata[i]['rvid'] + '">수정</button>';
				    str += '<button class="btnReviewDelete" data-review-id="' + reviewdata[i]['rvid'] + '">삭제</button>';
				    str += '</td>';
				    str += '</tr>';
				    $('#review_myTable').append(str);
				}else{
					str += '<td class="button-container">';
				    str += '<button class="btnEditReview" data-review-id="' + reviewdata[i]['rvid'] + '">수정</button>';
				    str += '<button class="btnReviewDelete" data-review-id="' + reviewdata[i]['rvid'] + '">삭제</button>';
				    str += '</td>';
				    str += '</tr>';
				    $('#review_myTable').append(str);
				}
			    
			    
			}
		}
	})
	
}

//리뷰 목록에서 리뷰누를시 나타나는 리뷰 함수
function openModal(id){
	var primecode =$('#rPrimecode').val();
    var rname=$('#rName').val();
    var address = $('#rAddress').val();

	$.ajax({
	    url: '/review/getMy',
	    type: 'post',
	    data:{
			primecode:primecode,
			id:id,
			rname:rname,
			address:address
		},
	    dataType: 'json',
	    success: function (review) {
            $('#reviewAllModal').dialog({
                title: '리뷰',
                modal: true,
                width: 700,                
            });
            
            $('#myreviewD').val(review[0]['rvdetail']);
            var photoUrl = review[0]['rvphoto'];
            if(photoUrl){
				$('#previewImgD').attr('src', photoUrl);
				$('#previewImgD').show();
			}else{
				$('#previewImgD').attr('src', '').hide();
			}
                        
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

//내 리뷰 수정 눌렀을시 나타나는 리뷰 함수
function myModalOpen(){
	var primecode =$('#rPrimecode').val();
	var id = $('#name').val();
	var rname=$('#rName').val();
    var address = $('#rAddress').val();
	
	$.ajax({
	    url: '/review/getMy',
	    type: 'post',
	    data:{
			primecode:primecode,
			id:id,
			rname:rname,
			address,address
		},
	    dataType: 'json',
	    success: function (review) {
            $('#reviewModal').dialog({
                title: '리뷰 수정',
                modal: true,
                width: 700,                
            });
            $('#myreviewU').val(review[0]['rvdetail']);
            $('#previewImg1').attr('src', review[0]['rvphoto']);
            
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

//리뷰 넣는 함수
function reviewInsert(){
	var primecode =$('#rPrimecode').val();
	var checkboxValues=[];
	$('input[name="tags"]:checked').each(function(){
		checkboxValues.push($(this).val());
	})
	
	var photo = $('#fileUpload')[0].files[0];
	
	// FormData 객체 생성
	var formData = new FormData();
	formData.append('primecode', primecode);
	formData.append('id', $('#name').val());
	formData.append('visit', 1);
	if(photo){
		formData.append('photo',photo);
	}else{
		formData.append('photo','');
	}
	formData.append('tags', checkboxValues);
	formData.append('detail', $('#myreview').val());
	formData.append('rname',$('#rName').val());
	formData.append('raddress',$('#rAddress').val());
	
	$.ajax({
		url:"/review/insert",
		type:"post",
		dataType:"text",
		data:formData,
		processData: false,
        contentType: false,
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

//리뷰 업데이트 하는 함수
function reviewUpdate(){
	var primecode =$('#rPrimecode').val();
	var checkboxValues=[];
	
	$('input[name="tagsU"]:checked').each(function(){
		checkboxValues.push($(this).val());
	})	
	var photo;
	var oldImageUrl = $('#previewImg1').attr('src');
	
	var fileInput = $('#fileUpload1')[0];
	if (fileInput.files.length > 0) {
	    photo = fileInput.files[0];
	}
	
	var formData = new FormData();
	formData.append('primecode', primecode);
	formData.append('id', $('#nameU').val());
	formData.append('rname',$('#rName').val());
	formData.append('raddress',$('#rAddress').val());	
	if (photo) {
	    formData.append('photo', photo);
	} else if (oldImageUrl && oldImageUrl !== '/img/DetailPage/') {
	    formData.append('photo', oldImageUrl);
	}else {
	    formData.append('photo', '');
	}		
	formData.append('tags',checkboxValues);
	formData.append('detail',$('#myreviewU').val());	

	$.ajax({
		url:'/review/update',
		type:'post',
		dataType:'text',
		data:formData,
		processData: false, // FormData 객체를 jQuery가 처리하지 않도록 설정
		contentType: false,
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

// 리뷰 지우는 함수
function reviewDelete(){

	if(confirm("정말로 지우시겠습니까?")==true){
		var photo = $('.reviewPhoto').attr('src');
		$.ajax({
			url:'/review/delete',
			type:'post',
			dataType:'text',
			data:{
				id:$('#name').val(),
				rname:$('#rName').val(),
         	 	raddress:$('#rAddress').val(),
         	 	photo:photo
			},
			success:function(data){
				if (data == "ok") {
                    alert("삭제되셨습니다.");
                    location.reload();
                } else {
                    alert("delete 실패");
                }
            }
        });
    } else {
        alert("삭제가 취소됬습니다.");
    }
}

//후기 작성했는지 안했는지 체크 함수
function checkReview(){
	var id = $('#name').val();
	var rname = decodeURIComponent(window.location.pathname.split('/')[3]);
	var address = decodeURIComponent(window.location.pathname.split('/').pop());
	
	$.ajax({
		url:"/check/review",
		type:"post",
		data:{
			id:id,
			rname:rname,
			address:address
		},
		dataType:"text",
		success:function(check){
			if(check == "리뷰 없음"){
				$('#review').show();
				$('#logincheckReviw').hide();
				$('.myreview-info').hide();	
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

//사장인지 체크하는 함수 및 댓글 달게 하는 함수
function checkOwner(callback){
	var primecode = $('#rPrimecode').val();
	var id = $('#name').val();	
	
	$.ajax({
		url:"/check/owner",
		type:"post",
		data:{
			primecode:primecode,
			id:id
		},
		dataType:"text",
		success:function(check){
			if(typeof callback ==="function"){
				callback(check);
			}			
		}
	})
}

//사장일때 나오는 리뷰 목록함수
function OwnerReviewList(){
	var primecode = $('#rPrimecode').val();
	var rname = decodeURIComponent(window.location.pathname.split('/')[3]);
	var address = decodeURIComponent(window.location.pathname.split('/').pop());

	$.ajax({
        url: '/review/get',
        type: 'post',
        data: {
            primecode: primecode,
            rname: rname,
            address: address
        },
        dataType: 'json',
        success: function (reviewdata) {
			$('#rReviewN').val(reviewdata.length);
			
            var reviewTable = $('#review_table');
            reviewTable.empty(); // 데이터를 추가하기 전에 테이블을 비워줍니다.

            var reviewsPerPage = 5; // 페이지 당 표시되는 후기 수
            var totalPages = Math.ceil(reviewdata.length / reviewsPerPage); // 총 페이지 수를 계산합니다.

            if (totalPages > 1) {
                var currentPage = 1; // 초기 페이지를 설정합니다.
                displayReviews(currentPage); // 초기 페이지에 해당하는 후기를 표시합니다.

                // 주어진 페이지에 해당하는 후기를 표시하는 함수입니다.
                function displayReviews(page) {
                    reviewTable.empty(); // 데이터를 추가하기 전에 테이블을 비워줍니다.

                    var startIndex = (page - 1) * reviewsPerPage;
                    var endIndex = startIndex + reviewsPerPage;
                    var pageReviews = reviewdata.slice(startIndex, endIndex);

                    for (let i = 0; i < pageReviews.length; i++) {
                        var time = pageReviews[i]['rvtime'].split(' ')[0];
                        var content = pageReviews[i]['rvowner']
                        let str = '<tr>';
                        str += '<td width="300" class="customid" data-rvid="'+pageReviews[i]['rvid']+'">' + pageReviews[i]['rvid'] + " | " + time + '</td>';
                        str += '<td><textarea rows=4 cols=30 class="reviewcontent" readonly>' + pageReviews[i]['rvdetail'] + '</textarea></td></tr>';
                        str += '<tr><td height="10"></td></tr>'
                        
						if(!content){
                        	str += '<tr><td><textarea maxlength="1000" placeholder="답글을 달아주세요" rows=4 cols=30 class="ownercontent"></textarea></td>';
                        	str += '<td><button id="btnowner">답글달기</button></td></tr>'
                        }else if(content){
							str += '<tr><td><textarea maxlength="1000" class="ownercontent" onclick="event.stopPropagation()">'+content+'</textarea></td>'
							str += '<td><button id="btnownerup">답글수정</button></td>'
						}
                        str += '<tr><td style="border-top: 1px solid #CCCCCC;" colspan="3" height="10" ></td></tr>';						                        										
                        reviewTable.append(str);
                    }
                }
                createPagination(totalPages, currentPage, displayReviews);
            } else if(totalPages == 0){
                reviewTable.append('<div class="noreview"> 아직 리뷰가 없습니다. 첫 리뷰를 써보세요!</div>');
            } else {
                // 리뷰가 5개 미만인 경우에는 페이지 네이션을 생성하지 않습니다.
                for (let i = 0; i < reviewdata.length; i++) {
                    var time = reviewdata[i]['rvtime'].split(' ')[0];
                    var content = reviewdata[i]['rvowner']
                    let str = '<tr>';
					str += '<td width="300" class="customid" data-rvid="'+reviewdata[i]['rvid']+'">' + reviewdata[i]['rvid'] + " | " + time + '</td>';				                    str += '<td><textarea rows=4 cols=30 class="reviewcontent" readonly>' + reviewdata[i]['rvdetail'] + '</textarea></td></tr>';
                    str += '<tr><td height="10"></td></tr>'
                   
					if(!content){
						str += '<tr><td><textarea maxlength="1000" placeholder="답글을 달아주세요" rows=4 cols=30 class="ownercontent"></textarea></td>';
						str += '<td><button id="btnowner">답글달기</button></td></tr>'
					}else if(content){										
						str += '<tr><td><textarea class="ownercontent" onclick="event.stopPropagation()">'+content+'</textarea></td>'
						str += '<td><button id="btnownerup">답글수정</button></td>'
					}
                    str += '<tr><td style="border-top: 1px solid #CCCCCC;" colspan="3" height="10" ></td></tr>';								                    
					
                    reviewTable.append(str);				                    				                    
                }
            }
            
            
        }
    })
}

//사장 리뷰 insert,update 함수
function ownerReview(ownerContent,id,primecode){
	$.ajax({
		url:'/owner/insert',
		type:'post',
		dataType:'text',
		data :{
			ownercontent:ownerContent,
			id:id,
			primecode:primecode,
		},
		success:function(data){
			if(data=="ok"){
				alert("답글이 작성되었습니다.")
				location.reload();
			}else{
				alert("리뷰 안들어감");
				return false;
			}
		}
	})
}

//태그 랭킹 5위 함수
function tagRanking(){
	var rname = decodeURIComponent(window.location.pathname.split('/')[3]);
	var address = decodeURIComponent(window.location.pathname.split('/').pop());
	
	$.ajax({
		url:"/tag/top",
		type:"post",
		data:{
			rname:rname,
			address:address
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
				   if(values[j] == "clean"){
					   categoryCounts.cleanlinessC++;					   
				   }else if(values[j] == "kind"){
					   categoryCounts.kindnessC++;
				   }else if(values[j] == "parking"){
					   categoryCounts.parkingC++;
				   }else if(values[j] == "fast"){
					   categoryCounts.cookingC++;
				   }else if(values[j] == "pack"){
					   categoryCounts.packagingC++;
				   }else if(values[j] == "alone"){
					   categoryCounts.aloneC++;
				   }else if(values[j] == "together"){
					   categoryCounts.groupC++;
				   }else if(values[j] == "focus"){
					   categoryCounts.focusC++;
				   }else if(values[j] == "talk"){
					   categoryCounts.conversationC++;
				   }else if(values[j] == "photoplace"){
					   categoryCounts.photoC++;
				   }else if(values[j] == "delicious"){
					   categoryCounts.tasteC++;
				   }else if(values[j] == "lot"){
					   categoryCounts.quantityC++;
				   }else if(values[j] == "cost"){
					   categoryCounts.costC++;
				   }else if(values[j] == "portion"){
					   categoryCounts.niceC++;
				   }else if(values[j] == "satisfy"){
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
				//랭킁 5등까지 나타나게..
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

//후기 내용 초과 확인 함수
function textMax(){
	$('#myreview').keyup(function(){
		if($(this).val().length>1000){
			alert('내용이 초과됬습니다.');
			$(this).val($(this).val().substr(0, $(this).attr('maxlength')));
		}
	})
}

//사진 누르면 사진 보여주는 함수
function photoMax() {
    const src = $(this).attr("src");

    var modal = $('<div>', { class: 'modal' }).append(
        $('<span>', { class: 'close' }),
        $('<img>', { src: src, class: 'modal-content' })
    );
    $('body').append(modal);

    $('.close').html('&#215;').addClass('modal-close');

    $('.modal-close').click(function () {
        modal.remove();
    });
    
    var isDragging = false;
    var offsetX = 0;
    var offsetY = 0;

    modal.mousedown(function (e) {
        isDragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });

    $(document).mousemove(function (e) {
        if (isDragging) {
            modal.css({
                top: e.clientY - offsetY,
                left: e.clientX - offsetX
            });
        }
    }).mouseup(function () {
        isDragging = false;
    });
}