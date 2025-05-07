//Fragment 是 React 中的一个特殊组件，
//它允许你将多个元素或组件包裹在一起，而不需要添加额外的 DOM 元素。
import { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from '../request/axios';
import { isEmpty } from 'lodash';

const ImageUpload = () => {
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [file, setFile] = useState({}); //file是上传的文件,类型是File的对象，包括name，size，type等等
    const [uploadedFile, setUploadedFile] = useState({}); //包括文件名和文件路径的对象，接收服务器传回的值{ fileName, filePath }

    //点击选择文件，触发onChange，一旦上传文件，e.target.files[0]就是上传的文件
    const onChange = e => {
        if (e.target.files.length) {
            console.log('file', e.target.files[0])//可以看到FILE类型的对象内容
            console.log('type', typeof (e.target.files[0])) //可以看到类型是object
            setFile(e.target.files[0]); //触发setFile使得file获得文件值
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        //creates a new instance of the FormData object, which is used to compile a set of key/value pairs 
        //to send using the XMLHttpRequest (XHR) object or the Fetch API.
        const formData = new FormData();
        formData.append('file', file);
        try {
            //send post request，get response from server with error info or file info
            const res = await axios.post('/upload', formData, {
                //onUploadProgress是axios中的回调函数，用于更新上传进度
                onUploadProgress: (ProgressEvent) => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                        )
                    )
                }
            });

            const { fileName, filePath } = res.data;
            setTimeout(() => {
                setUploadPercentage(0)   //clear percentage
                setUploadedFile({ fileName, filePath })  //将服务器传回的文件名和文件路径赋值给uploadedFile
            }, 5000);  //5s后显示图片并清空进度条，这个时间可以修改，和进度条到达100%的时间不一样，图片小，进度条1s可能就满了
        }

        catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400) {
                    setMessage(`Bad request: ${data.error}`)
                } else if (status === 500) {
                    setMessage(`Server error: ${data.error}`)
                } else {
                    setMessage(data.error);
                }
            }
            else {
                setMessage('An unexpected error occured')
            }

            setUploadPercentage(0);
        }
    }

    return (
        <Fragment>

            {message && <Message message={message} setMessage={setMessage} />}
            <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                    <input type="file" className='form-control' onChange={(onChange)} />
                </div>
                <Progress percentage={uploadPercentage} />
                <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4' />
            </form>

            {!isEmpty(uploadedFile) && (
                <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>
                        <h3 className='text-center'>{uploadedFile.fileName}</h3>
                        <img
                            src={uploadedFile.filePath}
                            alt='uploaded file'
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ImageUpload;