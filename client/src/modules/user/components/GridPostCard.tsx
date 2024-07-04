import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


export default function GridPostCard() {
  return (
    <Card>
      <CardMedia
        sx={{ height: 180 }}
        image="https://i.blogs.es/f496c5/the-matrix-awakens/840_560.jpeg"
        title="green iguana"
      />
    </Card>
  );
}
