import { Box, Typography } from "@mui/material";
import { ReactComponent as Hero } from "../../assets/hero.svg";

function Home() {
  return (
    <Box sx={{ marginTop: "100px" }}>
      <Typography variant="h5" component="h2" sx={{ marginTop: "20px" }}>
        To Access our Services pleazz Sign in ;)
      </Typography>
      <Hero style={{ width: "75vw", height: "75vh" }} />
    </Box>
  );
}

export default Home;
