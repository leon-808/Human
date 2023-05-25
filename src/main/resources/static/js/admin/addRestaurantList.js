$(document)
    //.ready(check_admin)
    .ready(list_getCount)

function list_getCount() {
    $.ajax({
        url: "/adminRestaurant/getCount",
        type: "post",
        dataType: "text",
        success: function (count) {
            $("hidden_countList").val(count);
            //pageIndexing();
        }
    })
}

function adminRestaurnat_getList(cp) {

}
