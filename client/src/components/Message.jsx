import React from 'react';
//这个button就是小叉叉样式的关闭按钮，bootstrap的设计样式btn-close
//一旦点击，则清空错误提示信息对应的message

export default function Message({ message, setMessage }) {
    return (
        <div
            className='alert alert-warning alert-dismissible fade show'
            role='alert'>
            {message}
            <button
                type='button'
                className='btn-close'
                aria-label='Close'
                onClick={() => setMessage('')}
            ></button>
        </div>
    )
}