import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  CardActionArea, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Grid,
  Box,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from "react-router-dom";
import listService from '../services/list'

const ListItem = () => {
  const { id } = useParams();
  const [ item, setItem ] = useState({})

  const navigate = useNavigate()

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
      <Box sx={{ mt: 3 }} >
        <Button variant='contained' color="secondary" onClick={() => navigate('/')}
        startIcon={<ArrowBackIcon/>}>Go back</Button>
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
      </Box>
    </Grid>
  )
}

export default ListItem;
