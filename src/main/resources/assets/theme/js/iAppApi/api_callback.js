(function($){

var timestamp = (new Date()).valueOf();

/*列表*/
$.callback_list = {
	"requestcommand" : "callback_list",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",	
	"isHome":"false",	
	"listtemplateVer":"none",	
	"orderField":"createdTime",	
	"orderType":"desc",
	"id":"",
	"moduleType":"",
	"moduleId":"402893b74fedf704014fedf713c80000",
	"viewId":"",
	"searchVallist":"",
	"dicSearch":[
	             {
	            	"dicPojoName":"PURPOSE",
	            	"dicValues":[
	            	             "网络推广1"
	            	             ]
	            	 
	             }
	             ],
	 "currentPage":"",// 当前页 
	 "limit":"" // 每页记录数   	             
};
	
/*获取数据详情*/
$.callback_getinfobyid = {
	"requestcommand" : "callback_getinfobyid",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"formtemplateVer":"none",
	"id":"455453ffew1w1ef1w2fwwef"
	
};


/*数据增删改*/
$.callback_cud = {
	"requestcommand" : "callback_cud",
	"requesttime": timestamp,
	"userId":"402893bb50d6280d0150d62aa2f00001",
	"id":"",
	"isCUD":"add",
	"formFields":[],
	"callbacklist":[
	            {"模板中pojoProperty":"值"}
	            ]

};

})(Test);