import { Grid, Typography} from "@mui/material";
import Item from "../../../components/Item";
import PostCard from '../../posts/components/PostCard';
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/shared/widgets/Spinner";
import postAPI from "@/shared/services/api/post";



const Feed = () => {
  const { isPending, error, isError, data } = useQuery({
    queryKey: ['posts'],
    queryFn: async() => await postAPI.fetch(),
  });
  console.log('data', data);
  const posts=data?.data;

  if(isPending){
    return <Grid item xs={12} md={9}><Spinner /></Grid>
  }
  if(isError) {
    return <Grid>
      <Typography component="p">{error.message}</Typography>
      </Grid>;
  }
  return (
    <>
       <Grid item xs={12} md={9}>
          <Item>
          <Grid container spacing={2}>
              {posts.map((post: any)=><PostCard key={post._id} {...post} />)}
          </Grid>
          </Item>
        </Grid>
    </>
  )
}

export default Feed