import React from "react";
import { Grid } from "@mui/material";
import Item from "@/components/Item";
import { useParams } from "react-router-dom";

const Post = () => {
    const params=useParams();
    
    const 
  return (
    <Grid item xs={12} md={9}>
      <Item>
        <Grid container spacing={2}>
          Post detail page
        </Grid>
      </Item>
    </Grid>
  );
};

export default Post;
