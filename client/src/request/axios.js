/*
 * This code creates a custom instance of the Axios library, 
 * setting the base URL to http://localhost:80 
 * and defaulting the Content-Type header to multipart/form-data 
 * for all requests made with this instance. 
 * The instance is then exported for use elsewhere in the application.
 */

import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:80' });

//multipart/form-data 是一种 HTTP 请求头部的内容类型（Content-Type），
// 用于表单数据的提交，特别是当表单中包含文件上传时。
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance;
