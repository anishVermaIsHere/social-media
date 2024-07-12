import { Grid } from "@mui/material";
import Item from "../../../components/Item";
import PostCard from "../../posts/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/shared/widgets/Spinner";
import postAPI from "@/shared/services/api/post";
import AlertCard from "@/shared/widgets/AlertCard";
import NoData from "@/shared/widgets/NoData";

const Feed = () => {
  const { isPending, error, isError, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await postAPI.fetch(),
  });
  const posts = data?.data;

  if (isPending) {
    return (
      <Grid item xs={12} md={9}>
        <Spinner />
      </Grid>
    );
  }
  if(!posts.posts.length){
    return <NoData message="No posts..."/> 
   }
  if (isError) {
    return <AlertCard message={error.message} severity="error" />;
  }
  return (
    <>
      <Item elevation={0}>
        <Grid container spacing={2}>
          {posts.posts?.map((post: any) => {
            
            let isLikedByMe=false;
            posts.likes.some((like: any) => {
              if (like.post === post._id) {
                isLikedByMe = true;
                return true;  
              } else {
                return false;
              }
            });

            const updatedPost={ ...post, isLikedByMe };

            return <PostCard key={post._id} post={updatedPost} />
          })}
        </Grid>
      </Item>
    </>
  );
};

export default Feed;
