import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Grid from '@mui/material/Grid';
import { IPost } from '@/modules/user/interfaces';
import dayjs from 'dayjs';
import UserAvatar from '@/shared/widgets/UserProfile';
import { getNameFirstLetter } from '@/shared/name.util';


export default function PostCard(post: IPost) {
  const { title, content, image, tags, createdAt }=post;
  return (
    <Grid item xs={12}>
    <Card sx={{ maxWidth: '100%', bgcolor:'#fff'}} elevation={1}>
      <CardHeader
        sx={{textAlign:'left'}}
        avatar={
          <UserAvatar name={getNameFirstLetter('David')} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={dayjs(createdAt).format('MMM DD, YYYY')}
        
      />
      <CardMedia
        component="img"
        height="350"
        image={image}
        alt={title}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="like" title='Likes' sx={{color:red[400]}}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="add comments" title='comments'>
            <CommentIcon />
        </IconButton>
        
        <IconButton aria-label="share" title='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>

      <CardContent sx={{textAlign:'left'}}>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        {tags.map((tag, index)=><Link key={index} style={{ marginRight: '0.4rem'}}>#{tag}</Link>)}
      </CardContent>
    </Card>
    </Grid> 
  );
}
