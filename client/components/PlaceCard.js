import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import * as timeago from 'timeago.js'
import { getStaticURL } from '../apis'

export default function PlaceCard({ pin }) {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" src={getStaticURL + pin.user.avatar}>
						{pin.username}
					</Avatar>
				}
				title={pin.title}
				subheader={timeago.format(new Date(pin.createdAt))}
			/>
			<CardMedia image={pin.mapUrl} title={`Map of ${pin.title}`} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{pin.desc}
				</Typography>
			</CardContent>
		</Card>
	)
}
