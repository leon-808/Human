$(document)
    .ready(check_admin)
    .ready(getList)
    .on("click", "#btnYN #btnOk", insertRestaurant)
    .on("click", "#btnYN #btnCancel", deleteAdrt_restaurant)

function check_admin() {
    $.ajax({
        url: "/check/admin",
        type: "post",
        dataType: "text",
        success: function (check) {
            if (check == "false") {
                document.location = "/main";
                alert("관리자만 사용 가능한 페이지입니다");
            }
        }
    })
}

function getList() {
    $.ajax({
        url: "/adminRestaurant/getList",
        type: "post",
        dataType: "json",
        success: function (data) {
            $("#tbl_adrtRestaurant tr:gt(0)").remove();

            for (i = 0; i < data.length; i++) {
                html = [];
                html.push(
                    "<tbody><tr><th scope='row'>", i + 1, "</th>",
                    "<td>", data[i]["adrt_r_name"], "</td>",
                    "<td>", data[i]["adrt_primecode"], "</td>",
                    "<td>", data[i]["adrt_document"], "</td>",
                    "<td hidden>", data[i]["adrt_localurl"], "</td>",
                    "<td hidden>", data[i]["adrt_lat"], "</td>",
                    "<td hidden>", data[i]["adrt_lng"], "</td>",
                    "<td hidden>", data[i]["adrt_owner"], "</td>",
                    "<td hidden>", data[i]["adrt_category"], "</td>",
                    "<td hidden>", data[i]["adrt_address"], "</td>",
                    '<td id=btnYN><input type="button" class="btn btn-secondary btn-sm" id=btnOk value="승인">&nbsp;',
                    '<input type="button" class="btn btn-secondary btn-sm" id=btnCancel value="거부"></td></tr></tbody>'
                );
                $("#tbl_adrtRestaurant").append(html.join(""));
            }

        }
    })
}

function insertRestaurant() {
    currentRow = $(this).closest("tr");
    primecode = currentRow.find('td:eq(1)').text();

    $.ajax({
        url: "/insertRestaurant",
        type: "post",
        data: { primecode: primecode },
        dataType: "text",
        success: function (check) {
            alert("승인");
            ajaxDeleteRestaurant();
        }
    })
}

function deleteAdrt_restaurant() {
    currentRow = $(this).closest("tr");
    primecode = currentRow.find('td:eq(1)').text();
    ajaxDeleteRestaurant();
    alert("거부");

}

function ajaxDeleteRestaurant() {
    $.ajax({
        url: "/deleteRestaurant",
        type: "post",
        data: { primecode: primecode },
        dataType: "text",
        success: function (check) {
            getList();
        }
    })
}