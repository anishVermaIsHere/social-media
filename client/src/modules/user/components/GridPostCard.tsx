import { useState, MouseEvent } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/routes/routeslinks';
import OptionMenu from '@/components/OptionMenu';


export default function GridPostCard(post: any) {
  const { USER, FEEDS }=ROUTES;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOptions = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: MouseEvent) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  
  return (
    <>
    <NavLink to={`${USER}/${FEEDS}/${post._id}`}>
      <Card sx={{ position:'relative', maxWidth: '100%', m: 1, cursor: 'pointer', ":hover": { opacity: '0.8' } }}>
          <IconButton 
          aria-label="options" 
          sx={{ position: 'absolute', right: 0, color:'#ddd', background: '#0005' }} 
          onClick={handleOptions}
          >
            <MoreVertIcon />
          </IconButton>
        <OptionMenu open={open} anchorEl={anchorEl} handleClose={handleClose} postId={post._id} />
        
        <CardMedia sx={{ height: 180 }} image={post.image} title={post.title} />
      </Card>
    </NavLink>
    </>
  );
}

