import React from 'react';

export default function Progress({ percentage }) {
    return (<div className='progress'>
        <div
            className='progress-bar progress-bar-striped bg-success'
            role='progressbar'
            style={{ width: `${percentage}%` }}
        >
        </div>
    </div>)
}