import { Grid } from "@mui/material";
import Item from "@/components/Item";
import { useParams } from "react-router-dom";
import PostCard from "@/modules/posts/components/PostCard";
import postAPI from "@/shared/services/api/post";
import { useQuery } from "@tanstack/react-query";
import NoData from "@/shared/widgets/NoData";
import Spinner from "@/shared/widgets/Spinner";
import AlertCard from "@/shared/widgets/AlertCard";

const Post = () => {
    const params=useParams();
    const { isPending, isLoading, error, isError, data } = useQuery({
      queryKey: ['post', params.id],
      queryFn: async() => await postAPI.fetchById(params.id || ''),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });

    const post=data?.data;
    console.log('post', post);

  if (isLoading || isPending) {
    return (
      <Grid item xs={12} md={9}>
        <Spinner />
      </Grid>
    );
  }
  if(post===undefined){
   return <NoData message="No data..."/> 
  }
  if (isError) {
    return <AlertCard message={error.message} severity="error" />;
  }
  return (
      <Item elevation={0}>
        <Grid container spacing={2}>
          <PostCard post={post} />
        </Grid>
      </Item>
      
  );
};

export default Post;
