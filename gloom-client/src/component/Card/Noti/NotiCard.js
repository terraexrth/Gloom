import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import "./NotiCard.css"

const NotiCard = () => {
  return (
	<div className="noticard_container">
		<Box className="noticard_box">
			<Card>
				<CardContent>
					<Typography>การแจ้งเตือน</Typography>
				</CardContent>
			</Card>
			</Box>
	</div>
  )
}

export default NotiCard
