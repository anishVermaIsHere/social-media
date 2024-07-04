import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';



export default function GridPostCard(post: any) {
  return (
    <Card sx={{ position:'relative', maxWidth: '100%', m: 1, cursor: 'pointer', ":hover": { opacity: '0.8' } }}>
      <IconButton aria-label="options" sx={{ position: 'absolute', right: 0, color:'#ddd', background: '#0005' }}>
          <MoreVertIcon />
      </IconButton>
      <CardMedia sx={{ height: 250 }} image={post.image} title={post.title} />
      
    </Card>
  );
}

