$(document)
.ready(getList)
.on("click", ".fileView", fileView)
.on('click', "#tbl_adrtRestaurant td", searchByAddress)
.on("click", "#btnOk", admin_insup_restaurant)
.on("click", "#btnCancel", admin_delete_restaurant)

function getList() {
    $.ajax({
        url: "/admin/restaurant/getList",
        type: "post",
        dataType: "json",
        success: function (data) {
            $("#tbl_adrtRestaurant tr:gt(0)").remove();
            if (data.length != 0) {
	            for (i = 0; i < data.length; i++) {
					let localURL = data[i]["adrt_localurl"];
					if (localURL == undefined) localURL = "/img/admin/No-image.jpg";
	                html = [];
	                html.push(
	                    "<tbody><tr><th scope='row'>", i + 1, "</th>",
	                    "<td>",data[i]["adrt_r_name"],"</td>",
	                    "<td>",data[i]["adrt_primecode"],"</td>",
	                    "<td>",data[i]["adrt_category"],"</td>",
	                    "<td><img src='",localURL,"' class='fileView'></td>",
	                    "<td>",data[i]["adrt_owner"],"</td>",
	                   	"<td>",
	                   	'<input type="button"class="btn btn-secondary btn-sm" id=btnOk value="승인">&nbsp;',
	                    '<input type="button" class="btn btn-secondary btn-sm" id=btnCancel value="거부"></td>',
	                    "<td hidden>",data[i]["adrt_address"],"</td></tr></tbody>"
	                );
	                $("#tbl_adrtRestaurant").append(html.join(""));
	            }
            }
        }
    })
}

function fileView() {
	const src = $(this).attr("src");
	const image_viewer = window.open("", '_blank');
	image_viewer.document.write(`
		<html><head></head>
		<body>
			<img src='${src}' style="width: 100%; height: 100%">
		</body></html>
	`);
}

function searchByAddress() {
	let index = $(this).index();
	if (index != 6) {
		let tr = $(this).parent(),
		query = encodeURI(tr.find("td:eq(6)").text());
		window.open(`/main/search/${query}`, '_blank');
	}
}

function admin_insup_restaurant() {
    let primecode = $(this).closest("tr").find('td:eq(1)').text(),
    address = $(this).closest("tr").find("td:eq(6)").text(),
    changeFlag = 0;

    $.ajax({
        url: "/admin/insup/restaurant",
        type: "post",
        data: { 
			primecode: primecode,
			address: address,
			changeFlag: changeFlag 
		},
        dataType: "text",
        success: function (check) {
			if (check == "insert") {
            	alert("해당 업체 신청은 승인되었습니다");
            	getList();
            }
            else if (check == "exist") {
				if (confirm("이미 해당 업체가 등록되어 있습니다\n요청하신 계정주로 업주를 변경하시겠습니까?")) {
					changeFlag = 1;
					 $.ajax({
				        url: "/admin/insup/restaurant",
				        type: "post",
				        data: { 
							primecode: primecode,
							address: address,
							changeFlag: changeFlag  
						},
				        dataType: "text",
				        success: function (check) {
							if (check == "update") {
								alert("요청하신 계정주로 해당 업체의 업주가 변경되었습니다");
							}
							else alert("업주 변경 과정 실패");
						}
					})
				}
				else alert("승인 과정이 취소되었습니다");
			}
        }
    })
}

function admin_delete_restaurant() {
	let address = $(this).closest("tr").find("td:eq(6)").text();
    $.ajax({
        url: "/admin/delete/restaurant",
        type: "post",
        data: { address: address },
        dataType: "text",
        success: function (check) {
			alert("해당 업체 신청은 반려되었습니다");
			getList();
        }
    })
}