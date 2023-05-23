$(document).ready(function() {
   //var primecode =$('#rPrimecode').val();
    loadFoodDetails();
});

function loadFoodDetails() {
	var primecode =window.location.pathname.split('/').pop();
	console.log(primecode);
    $.ajax({
        url: '/restaurant/detail/' + primecode,
        type: 'post',
        dataType: 'json',
        success: function(response) {
            var restaurant = response[0];

            $('#rImg').attr('src', restaurant.imageUrl);
            $('#rName').val(restaurant.rname);
            $('#rCategory').val(restaurant.category);
            $('#rReviewN').val(restaurant.reviewCount);
            $('#rAddress').val(restaurant.address);
            $('#rPhone').val(restaurant.rphone);
            $('#rMenu').val(restaurant.menu);
            $('#rTage').val(restaurant.goodPoints);

           
        },
        error: function() {
            console.log('음식상세정보를 불러오지 못했습니다.');
        }
    });
}