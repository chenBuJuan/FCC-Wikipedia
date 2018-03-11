$(document).ready(function(){
    var sBtn = $("#sBtn");
    var rBtn = $("#rBtn");
    var sTxt = $("#sTxt");

    rBtn.bind("click", function(){
        $("#rBtnTarget>span").trigger("click");
    });

    sBtn.bind("click", function(){
        var keyword = $("#sTxt").val();
        
        var ajax = $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            type: "get",
            data: "action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
            dataType: "jsonp",
            success: function(data){
                showRes(data.query.search);
            },
            error: function(request, errInfo, errObj) {
                console.log(request, errInfo, errObj);
            }
        });
    });

    sTxt.bind("focus", function(){
        $(document).bind("keyup", function(e){
            if(e.which == 13){
                sBtn.trigger("click");
            }
        });
    });
});

function showRes(data){
    $.each(data, function(key, value){
        var a = $("<a href=\"https://en.wikipedia.org/?curid=" + value.pageid + "\"></a>");
        var li = $("<li></li>");
        var h3 = $("<h3>" + value.title + "</h3>");
        var p1 = $("<p>" + value.snippet + "</p>");
        var p2 = $("<p>" + value.timestamp + "</p>");
        
        a.append(li);
        li.append(h3, p1, p2);
        a.appendTo($("#result"));
    });
}