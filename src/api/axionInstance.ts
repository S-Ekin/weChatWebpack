import axios ,{AxiosResponse,AxiosError,AxiosRequestConfig} from "axios";
import mpAdapter from 'axios-miniprogram-adapter';
// import {loadFn} from "@js/common/icon/index";
// import noticeFn from "@js/common/toast/index";
// SUCCESS(100, "成功"),
// FAIL_PARAMS_VALIDATOR(200, "参数验证错误"),
// FAIL_SERVICE_VALIDATOR(300, "服务验证错误"),
// FAIL_DATA_VALIDATOR(400, "数据验证错误"),
// FAIL_ERROR(999, "系统异常");
axios.defaults.adapter = mpAdapter;
 const CancelToken = axios.CancelToken;
const cancelApi = CancelToken.source();

const instance = axios.create({
		baseURL: "http://172.16.13.139:8080",
		headers: {
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			'X-Custom-Header': 'foobar',
		},
});
declare global{
	interface IAxiosInterfaceResponse {
		data: any;
		msg:string;
		code:number;
	}
}

//过滤返回值
instance.interceptors.response.use(function (response) {
        //session过期跳转登录页
		if(response.headers["content-type"].includes("text/html")){
			// window.location.href=`${window.getSession("getPath")}login`;
			return Promise.reject();
		}	
		//关闭loading
		//loadFn.close();
		const data = response.data;
		if (data.code === 100 ) {
			return response.data;
		} if(data.code === 666){
		//	noticeFn.add(data.msg,"warn",true);
			return Promise.reject(data);
		}else {
			console.log(data.msg);
		//	noticeFn.add("操作失败！","error",true);
			return Promise.reject(data);
		}
    
  }, function (error:AxiosError) {

	//	loadFn.close();
	//	noticeFn.add("操作失败！","error",true);
    	return Promise.reject(error);
});

export {instance,cancelApi} ;
