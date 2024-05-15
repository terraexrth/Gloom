import React from 'react'
import Sidebar from '../../component/Sidebar'
import NotiCard from '../../component/Card/Noti/NotiCard'
import "./Noti.css"

const Notification = () => {
  return (
	<div className="noti_container">
		<Sidebar/>
		<div className="noti_content">
			<NotiCard/>
		</div>
	</div>
    )
}

export default Notification
