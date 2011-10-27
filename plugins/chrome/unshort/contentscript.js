var current_obj = null;
var title = null;
var alt = null;

function proceedData(data,settings)
{
    if(data.result=="true")
    {
        var mdialog = $("#mdialog");
		var html = '<img src="http://unshort.ru/media/images/logo.png" width="60" heitgh="60" align="left" style="padding-right:4px;"><b>Редирект</b>: <a href="' + data.redirect + '">' + data.redirect + '</a><br>';
		var html = html + '<b>Жалобы на ссылку: </b>' + (data.alert=='no'?'Нет':'<b><font color=red>Есть</font></b>') + ' <br>2011г., <a href="http://Unshort.ru">Unshort.ru</a>';
        mdialog.html(html);
        mdialog.css( { left: (settings.left + settings.width) + "px", top:settings.top + "px" } );
        mdialog.show();
    }
}


function setHandler()
{
    $("a").live("mouseout",function(){
        current_obj.attr("title",title);
        var mdialog = $("#mdialog");
        mdialog.hide();
        chrome.extension.sendRequest({"action":"uncheckItem"});
    });

    $("a").live("mouseover",function(){
        current_obj = $(this);
        title = current_obj.attr("title");
        current_obj.attr("title","");
        var mdata = $(this);
        var width = current_obj.width();
        var pos = current_obj.offset();  
        //chrome.extension.sendRequest({'action' : 'fetchUnshorterData','data':{'link':current_obj.attr("href"),'left':pos.left,"top":pos.top,"width":width}},function(mdata){proceedData(mdata.result,mdata.settings)});
        chrome.extension.sendRequest({"action":"checkItem",'data':{'link':current_obj.attr("href"),'left':pos.left-100,"top":pos.top,"width":width}},function(mdata){proceedData(mdata.result,mdata.settings)});
    });
}


$(document).ready(function(){
    $("body").append("<div id='mdialog' style='display:none;z-index:100;color:#575757;background-color:#fcfcfe;width:auto;height:auto;padding:4px;position:absolute;border: 1px solid #767676;'></div>");
    setHandler();
    //setInterval(setHandler,2000);
});

