import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Grid from '@mui/material/Grid';
import { IPost } from '@/modules/user/interfaces';
import dayjs from 'dayjs';
import UserAvatar from '@/shared/widgets/UserProfile';
import { getNameFirstLetter } from '@/shared/name.util';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/routes/routeslinks';
import postAPI from '@/shared/services/api/post';


export default function PostCard(post: IPost) {
  const { title, content, image, tags, createdAt }=post;
  const [like, setLike]=useState(false);
  const { USER, FEEDS }=ROUTES;
  const likedColor=red[400];
  
  const handleLike=async(postId: string)=>{
    return await postAPI.like(postId);
  };

  return (
    <Grid item xs={12}>
    <Card sx={{ maxWidth: '100%', bgcolor:'#fff' }} elevation={1}> 
      <NavLink style={{ textDecoration:'none', color:'inherit' }} to={`${USER}/${FEEDS}/${post._id}`}> 
        <CardHeader
          sx={{ textAlign:'left' }}
          avatar={
              <UserAvatar name={getNameFirstLetter('David')} /> 
          }
          action={
            <IconButton aria-label="settings" onClick={(e)=> e.preventDefault()}> 
              <MoreVertIcon /> 
            </IconButton> 
          }
          title={'David Paul'}
          subheader={dayjs(createdAt).format('MMM DD, YYYY')}
        />
      </NavLink>
      
      <CardMedia
        component="img"
        height="350"
        image={image}
        alt={title}
      />
      <CardActions sx={{ display: 'flex', gap: '4px'}} disableSpacing>
          <IconButton aria-label="like" title='Likes' onClick={()=>handleLike(post?._id)}>
          <FavoriteBorderOutlinedIcon />
          </IconButton>

          <IconButton aria-label="add comments" title='comments'>
            <CommentOutlinedIcon />
          </IconButton>
        
          <IconButton aria-label="share" title='share'>
            <ShareOutlinedIcon />
          </IconButton>
      </CardActions>

      <CardContent sx={{textAlign:'left'}}>
        <Typography align='left' sx={{ color: 'grey', fontSize: '0.9rem', cursor:'pointer' }}>12.5 likes</Typography>
        <Typography variant="body2" color="text.primary">
          {content}
        </Typography>
        {tags?.map((tag, index)=><Link key={index} style={{ marginRight: '0.4rem'}}>#{tag}</Link>)}
        <Typography align='left' sx={{ color: 'grey', fontSize: '0.9rem', cursor:'pointer' }}>15 comments</Typography>
      </CardContent>


    </Card>
    </Grid> 
  );
}
