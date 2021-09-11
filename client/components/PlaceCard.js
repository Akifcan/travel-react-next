import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip';


export default function PlaceCard() {
    return <Card>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe">
                    R
                </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        />
        <CardMedia
            image="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/28.48135832898997,39.43399468437858,8,0/600x600?access_token=pk.eyJ1IjoiYWtpZmNhbiIsImEiOiJjazZhMWZxaDQwMHh2M2twaTRqenJ6M3VuIn0.mbCFqcaQPilg3aWu_l0V6Q"
            title="Paella dish"
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Tooltip title="Go to this location">
                <IconButton aria-label="add to favorites">
                    <LocationOnIcon />
                </IconButton>
            </Tooltip>
        </CardActions>
    </Card>
}
