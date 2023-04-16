$(function () {
    $("#publishBtn").click(publish);
});
//发送AJAX请求之前,将CSRF令牌设置到请求的消息头中.
//    var token = $("meta[name='_csrf']").attr("content");
//    var header = $("meta[name='_csrf_header']").attr("content");
//    $(document).ajaxSend(function(e, xhr, options){
//        xhr.setRequestHeader(header, token);
//    });

function publish() {
    $("#publishModal").modal("hide");

    var title = $("#recipient-name").val();
    var content = $("#message-text").val();
    $.post(
        CONTEXT_PATH + "/discuss/add",
        {"title": title, "content": content},
        function (data) {
            data = $.parseJSON(data);
            $("#hintBody").text(data.msg);
            $("#hintModal").modal("show");
            setTimeout(function () {
                $("#hintModal").modal("hide");
                // 刷新页面
                if (data.code == 0) {
                    window.location.reload();
                }
            }, 2000);

        }
    );
}