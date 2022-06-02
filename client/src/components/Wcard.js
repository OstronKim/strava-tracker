import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
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

import "./styles/style.scss";

function Wcard(props) {
  const [id, setId] = useState();
  const history = useHistory();
  let date_time = props.info.start_date.split("T");
  const date = date_time[0];
  const time = date_time[1].split(":");

  useEffect(() => {
    setId(props.info.id);
  }, [props.info.id]);

  const getActivityImg = (type) => {
    if (type === "Run") {
      return "https://images.unsplash.com/photo-1610969524113-bae462bb3892?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
    } else if (type === "Ride") {
      return "https://images.unsplash.com/photo-1456990493443-0d0ee2a630cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    } else if (type === "Walk") {
      return "https://images.unsplash.com/photo-1526573461737-b504d8040d92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    } else {
      return "https://images.unsplash.com/photo-1557330359-ffb0deed6163?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    }
  };

  const convertDistance = (dist) => {
    return (dist / 1000).toFixed(1);
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
          image={getActivityImg(props.info.type)}
          alt="running"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            {props.info.name}
          </Typography>
          <List dense={true} sx={{ color: "#272343" }}>
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
            <Divider />
            <ListItemText
              sx={{ textAlign: "center" }}
              primary={date + ", " + time[0] + ":" + time[1]}
            ></ListItemText>
          </List>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Link
            to={{
              pathname: "activity/" + `${id}`,
              state: { activity: props.info },
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "orange",
                color: "#272343",
                fontWeight: "bold",
                ":hover": {
                  bgcolor: "orange",
                },
              }}
            >
              View workout
            </Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
}

export default Wcard;
