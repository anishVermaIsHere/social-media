import { Grid} from "@mui/material";
import Item from "../../../components/Item";
import PostCard from '../../posts/components/PostCard';


const Feed = () => {

  return (
    <>
       <Grid item xs={12} md={9}>
          <Item>
          <Grid container spacing={2}>
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
          </Grid>
          </Item>
        </Grid>
    </>
  )
}

export default Feed