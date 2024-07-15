import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Grid from '@mui/material/Grid';
import { IPost } from '@/modules/user/interfaces';
import dayjs from 'dayjs';
import UserAvatar from '@/shared/widgets/UserProfile';
import { getNameFirstLetter } from '@/shared/name.util';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/routes/routeslinks';
import postAPI from '@/shared/services/api/post';
import defaultPostImage from '@/assets/2post.jpg';
import CommentBox from './CommentBox';

export const defaultImage=defaultPostImage;

export default function PostCard({ post }: {post: IPost }) {
  const { title, content, image, tags, createdAt }=post;
  const [like, setLike]=useState(post.likes);
  const [toggle, setToggle]=useState(post.isLiked);
  const { USER, FEEDS }=ROUTES;
  const postUser=post.user;
  
  const handleLike=async(postId: string)=>{
      setToggle(!toggle);
      if(toggle){
        if(like>0){
          setLike(like-1);
        }
        return await postAPI.unlike(postId);
      } else {
        setLike(like+1);
        return await postAPI.like(postId);
      }
  };
  
  return (
    <Grid item xs={12}>
    <Card sx={{ maxWidth: '100%', bgcolor:'#fff' }} elevation={1}> 
      <NavLink style={{ textDecoration:'none', color:'inherit' }} to={`${USER}/${FEEDS}/${post._id}`}> 
        <CardHeader
          sx={{ textAlign:'left' }}
          avatar={
              <UserAvatar name={getNameFirstLetter(postUser.firstName)} /> 
          }
          action={
            <IconButton aria-label="settings" onClick={(e)=> e.preventDefault()}> 
              <MoreVertIcon /> 
            </IconButton> 
          }
          title={<span style={{ fontWeight: '600', marginRight:'0.5rem' }}>{`${postUser.firstName} ${postUser.lastName}`}</span> }
          subheader={dayjs(createdAt).format('MMM DD, YYYY')}
        />
      </NavLink>
      
      <CardMedia
        component="img"
        height="350"
        image={image || defaultImage}
        alt={title}
      />
      <CardActions sx={{ display: 'flex', gap: '4px' }} disableSpacing>
        <IconButton aria-label="like" title='Likes' onClick={()=>handleLike(post?._id)}>
          {toggle ? <ThumbUpIcon color='primary'/> : <ThumbUpOutlinedIcon /> }
        </IconButton>

        <IconButton aria-label="add comments" title='comments'>
          <CommentOutlinedIcon />
        </IconButton>
      
        <IconButton aria-label="share" title='share'>
          <ShareOutlinedIcon />
        </IconButton>
      </CardActions>

      <CardContent sx={{ textAlign:'left', pt: 0 }}>
        <Typography align='left' sx={{ color: 'grey', fontSize: '0.9rem', cursor:'pointer' }}>
          { like ? like > 1 ? `${like} likes` : `${like} like` : ``}
        </Typography>
        <Typography variant="body2" color="text.primary">
        <span style={{ fontWeight: '600', marginRight:'0.5rem' }}>{`${postUser.firstName} ${postUser.lastName}`}</span> {title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {content}
        </Typography>
        {tags?.map((tag, index)=><Link key={index} style={{ marginRight: '0.4rem'}}>#{tag}</Link>)}
        <Typography align='left' sx={{ color: 'grey', fontSize: '0.9rem', cursor:'pointer' }}>15 comments</Typography>
        {/* <CommentBox /> */}
      </CardContent>


    </Card>
    </Grid> 
  );
}
