//a web framework for building web applications
const express = require('express');
//a middleware for handling file uploads
const fileUpload = require('express-fileupload');
//a middleware for enabling Cross-Origin Resource Sharing (CORS)//
const cors = require('cors');
//a module for generating unique identifiers (specifically, version 4 UUIDs)
const { v4: uuidv4 } = require('uuid');
//a built-in Node.js module for working with file paths
const path = require('path');

//create web server
const app = express();

app.use(cors());
app.use(fileUpload());

//前端的UploadImage组件中const res = await axios.post('/upload', formData)发送upload请求
//此处后端接收到前端请求，对formData带的图片文件进行处理
app.post("/upload", (req, res) => {
    //check if image was uploaded
    if (!req.files || !req.files.file) {
        return res.status(400).json({
            error: 'No file uploaded',
        });
    }
    const file = req.files.file;
    //validate file size
    const maxSize = 10 * 1024 * 1024;  //10MB，可以改小测试大图片报错
    if (file.size > maxSize) {
        return res.status(400).json({
            error: 'File size is too big',
        });
    }

    //genereate unique filename with a random UUID and the file extension
    const fileName = uuidv4() + path.extname(file.name);
    //__dirname表示当前server.js所在的文件夹，..表示回到上一层目录，之后进入client存储上传的文件
    const upload_dir = `${__dirname}/../client/public/uploads`;
    //save file to uploads folder
    file.mv(`${upload_dir}/${fileName}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({
            fileName: fileName,
            filePath: `/uploads/${fileName}`,
        });
    })
})

app.listen(80, () => console.log('server is running on http://localhost:80'));
