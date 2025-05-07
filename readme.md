#客户端依赖的包
npm i axios lodash

#客户端的组件
ImageUpload：图片上传组件
Message：错误消息组件，能够提示图片过大、没有上传图片等错误信息
Progress：进度条组件，直接使用bootstrap中的css样式，接收percentage参数，显示进度百分比

#服务器端依赖的包
pm i cors express express-fileupload uuid
npm i nodemon concurrently -D   //仅在开发阶段使用，一定要加上-D 加入devDependencies类别

#服务器端scripts中添加三条记录
"scripts": {
//nodemon比node方便，可以及时修改保存看到结果 找到根目录server底下的文件运行
"server": "nodemon server.js --prefix server",   
//找到根目录client底下的文件运行
"client": "npm run dev --prefix client",
//cd进入server后运行npm run project，可以同时启动client和server
"project": "concueently \"npm run server\" \"npm run client\""  转义字符
},

#index.html
在此文件中添加bootstrap样式
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous" />

#request/axios.js中封装了instance
import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:80' });
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
export default instance;
multipart/form-data 是一种 HTTP 请求头部的内容类型（Content-Type），用于表单数据的提交，特别是当表单中包含文件上传时。当表单中有文件需要上传时，浏览器会将表单数据和文件分成多个部分（即 multipart），每个部分包含一个文件或一个表单字段的值。服务器端可以根据 boundary 分隔符来解析这些部分。在这个代码片段中，设置 Content-Type 为 multipart/form-data 意味着这个 Axios 实例将始终以这种格式发送请求体，即使没有文件上传。
