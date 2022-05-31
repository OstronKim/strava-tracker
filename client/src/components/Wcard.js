import React, { useEffect, useState } from "react";
import { useHistory, generatePath, Link } from "react-router-dom";
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
  const [id, setId] = useState();
  const history = useHistory();

  useEffect(() => {
    setId(props.info.id);
  }, [props.info.id]);

  // const handleProceed = (e) => {
  //   id && history.push(generatePath("/activity/:id", { id }));
  // };
  const convertDistance = (dist) => {
    return (dist / 1000).toFixed(1);
  };

  const convertPace = (dist) => {
    return ((props.info.average_speed / 1000) * 60).toFixed(2);
  };

  return (
    <Card className="card">
      <Box
        className="cardContent"
        sx={{
          minWidth: 200,
          maxWidth: 300,
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
            {props.info.type}
          </Typography>
          <List dense={true}>
            <ListItem disablePadding>
              <ListItemText primary="Duration"></ListItemText>
              <ListItemText
                primary={`${props.info.elapsed_time} s`}
              ></ListItemText>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText primary="Distance"></ListItemText>
              <ListItemText
                primary={`${convertDistance(props.info.distance)} km`}
              ></ListItemText>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText primary="Pace"></ListItemText>
              <ListItemText
                primary={`${props.info.average_speed.toFixed(1)} m/s`}
              ></ListItemText>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemText primary="Elevation"></ListItemText>
              <ListItemText
                primary={`${props.info.total_elevation_gain} m`}
              ></ListItemText>
            </ListItem>
          </List>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Link
            to={{
              pathname: "activity/" + `${id}`,
              state: { activity: props.info },
            }}
          >
            <Button variant="contained" size="small">
              View workout
            </Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
}

export default Wcard;
