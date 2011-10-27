
function unshortHelper()
{
    var timer = null;
    var current_obj = null;
    var title = null;


    function checkFocus()
    {
        var url = "http://unshort.ru/json/?url=" + encodeURIComponent(current_obj.attr("href"));
        self.postMessage(url);
        clearTimeout(timer);
    }


    /*========PUBLIC=======*/
    this.proceedData = function(raw_data)
    {
        var data = JSON.parse(raw_data);
        if(data.result=="true")
        {
            var width = current_obj.width();
            var pos = current_obj.offset();  

            var mdialog = $("#mdialog");
            var html = '<img src="http://unshort.ru/media/images/logo.png" width="60" heitgh="60" align="left" style="padding-right:4px;"><b>Редирект</b>: <a href="' + data.redirect + '">' + data.redirect + '</a><br>';
            var html = html + '<b>Жалобы на ссылку: </b>' + (data.alert=='no'?'Нет':'<b><font color=red>Есть</font></b>') + ' <br>2011г., <a href="http://Unshort.ru">Unshort.ru</a>';
            mdialog.html(html);
            mdialog.css( { left: (pos.left + width) + "px", top:pos.top + "px" } );
            mdialog.show();
        }
    }

    this.setObject = function(curr_object)
    {
        //console.log("SET OBJECT");
        if(current_obj!=null)
        {
            current_obj.attr("title",title);
        }
        current_obj = curr_object;
        title = curr_object.attr("title");
        curr_object.attr("title","");
        //console.log("SET OBJECT DONE");
    }


    this.focus = function(){
        //console.log("SET FOCUS");
        timer = setTimeout(checkFocus,500);
    }


    this.unfocus = function(){
        //console.log("UNSET FOCUS");
        clearTimeout(timer);
    }
}

//HELPER
var helper = new unshortHelper();

//XHR READY EVENT
self.on("message",helper.proceedData);


function setHandler()
{
    $("a").live("mouseout",function(){
        var mdialog = $("#mdialog");
        mdialog.hide();
        helper.unfocus();
    });

    $("a").live("mouseover",function(){
        helper.setObject($(this));
        helper.focus();
    });
}


$(document).ready(function(){
    $("body").append("<div id='mdialog' style='display:none;z-index:100;color:#575757;background-color:#fcfcfe;width:auto;height:auto;padding:4px;position:absolute;border: 1px solid #767676;'></div>");
    setHandler();
});

