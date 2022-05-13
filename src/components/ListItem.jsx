import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  CardActionArea, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Grid
} from '@mui/material';
import listService from '../services/list'

const ListItem = () => {
  const { id } = useParams();
  const [ item, setItem ] = useState({})

  useEffect(() => {
    (async() => {
      try {
        const data = await listService.getItem(id);
        setItem(data)
      } catch(e) {
        console.log(e.message)
      }
    })()
  }, []);

  const width = 800
  const height = 400

  return (
    <Grid 
    container 
    direction='column'
    alignItems='center'
  >
      <Card sx={{ maxWidth: {width}, mt: 2 }}>
        <CardContent>
          <Typography color="text.secondary">
            User ID: {item.userId}
          </Typography>
        </CardContent>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={`https://picsum.photos/${width}/${height}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default ListItem;
