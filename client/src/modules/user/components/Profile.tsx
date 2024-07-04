import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Item from "@/components/Item";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import GridPostCard from "./GridPostCard";

const Profile = () => {
  return (
    <>
      <Grid item xs={12} md={9}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={3} md={2} lg={3} xl={2}>
            <Card
              sx={{ width: "100%", borderRadius: "50%", maxWidth: 200 }}
              elevation={0}
            >
              <CardMedia
                component="img"
                // image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMMzyU03K6-Gfto9jn7FrNN_ix4IYLVDkdw&s"
                image="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/385fdc07-325d-49f4-b941-2d39634f1cdb/2876b1ae-c518-416a-9b1f-0dadd6fa45bb.png"
                alt="profile pic"
              />
            </Card>
          </Grid>
          <Grid item xs={9} md={7} lg={6} xl={7}>
            <Item elevation={0}>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center", m: 3 }}
              >
                <Typography variant="h6">David Paul</Typography>
                <Button variant="outlined" sx={{ mx: 2 }}>
                  Edit Profile
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Typography variant="h6">
          Posts
        </Typography>
        <Divider sx={{my: 1}} />
        <Grid container>
          {[...new Array(19)].map((_,index)=><Grid key={index} item xs={12} md={4}>
            <GridPostCard />
          </Grid>)}
          
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
