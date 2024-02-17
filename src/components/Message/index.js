import React from 'react'
import moment from 'moment'

import './index.css'
import Cookies from 'js-cookie'


const Message = ({data}) => {
    const {username} = JSON.parse(Cookies.get("jwt_token"))

    return (
        <li className={`message-container ${ data.sentUser === username? "my-message" : ""}`}>
            <div>
                <h4>{data.sentUser}</h4>
                <p>{moment(new Date(data.timeStamp)).fromNow()}</p>
            </div>
            <p>{data.message}</p>
        </li>
    )
}

export default Message