import React from 'react'

const Notification = ({ notification }) => {
    const style = notification.style
    const content = notification.content 

    const notificationStyle = {
        color: style === "success" ?  'green' : 'red',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    if(content === null) {
        return null
    }

    if(style === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {content}
        </div>
    )
}

export default Notification