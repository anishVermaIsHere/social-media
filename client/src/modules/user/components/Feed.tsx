import { useEffect } from "react";
import { Grid } from "@mui/material";
import Item from "../../../components/Item";
import PostCard from "../../posts/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/shared/widgets/Spinner";
import postAPI from "@/shared/services/api/post";
import AlertCard from "@/shared/widgets/AlertCard";
import NoData from "@/shared/widgets/NoData";
import { useAppSelector, useAppDispatch } from "@/redux/store/store";
import { addPosts } from "@/redux/slices/post"; 

const Feed = () => {
  const { isPending, error, isError, isSuccess, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await postAPI.fetch(),
  });
  const postState=useAppSelector(state=>state.posts.posts);
  const dispatch=useAppDispatch();

  const posts = data?.data?.posts;

  useEffect(()=>{
    dispatch(addPosts(posts));
    return ()=>{
      dispatch(addPosts([]));
    }
  },[isSuccess]);

  
  if (isPending) {
    return (
      <Grid item xs={12} md={9}>
        <Spinner />
      </Grid>
    );
  }
  if(!postState?.length){
    return <NoData message="No posts..."/> 
   }
  if (isError) {
    return <AlertCard message={error.message} severity="error" />
  }

  return (
    <>
      <Item elevation={0}>
        <Grid container spacing={2}>
          {postState?.map((post: any) => {            
            return <PostCard key={post._id} post={post} />
          })}
        </Grid>
      </Item>
    </>
  );
};

export default Feed;
