const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        notification.includes('has already been removed from server')
        ? <div className="notificationError">{notification}</div>
        : <div className="notification">{notification}</div>
    )
}

export default Notification