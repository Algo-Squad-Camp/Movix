import React from 'react'
import { MdCancel } from "react-icons/md";


import "./style.scss";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Line from '../line/Line';

function Stream({ EndPoint, id, title }) {
    return (
        <>
            <div className="main-streamarea">
                <h1>Streaming {EndPoint} '{title}' </h1>
                <div className='stream-main'>
                    <div className="stream-body">
                        <iframe src={`https://vidsrc.to/embed/${EndPoint}/${id}`} className='iframe-stream' frameborder="0" referrerpolicy="origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <div className='notplaystream342'>
                <span className="notplaystream34256">Video not coming ? Use VPN and enjoy!</span>
            </div>
            <Line />
        </>
    )
}

export default Stream