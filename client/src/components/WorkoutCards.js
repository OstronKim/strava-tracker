import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

function Wcard(props) {
  return (
    <Card>
      <Box
        sx={{
          maxWidth: 200,
        }}
      >
        <CardMedia
          component="img"
          height="100"
          image="https://images.unsplash.com/photo-1610969524113-bae462bb3892?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="running"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <List dense={true}>
            <ListItem disablePadding>
              <ListItemText primary="Distance"></ListItemText>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText primary="Duration"></ListItemText>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText primary="Pace"></ListItemText>
            </ListItem>
            <Divider />
          </List>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button variant="contained" size="small">
            View route on map
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
let titles = ["one", "two", "three", "four", "five"];

//Egentligen ta in de 5 senaste (eller färre om inte 5 finns) och hämta ut ur props
function WorkoutCards(props) {
  return (
    <div className="cardRow">
      {titles.map(function (title) {
        return <Wcard key={title} title={title} />;
      })}
    </div>
  );
}

export default WorkoutCards;
