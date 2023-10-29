import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Gift from "../assets/gift.png";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "rgb(51, 51, 51)" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        {/* Add flex properties here */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h5" style={{ color: "lightgreen" }}>
            Anas BenAbdallah
          </Typography>
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Gift} // Use the imported constant here
            alt="Asset"
            style={{ marginLeft: "10px", height: "40px" }}
          />{" "}
          <Link to="/Recompense" style={{ textDecoration: "none" }}>
            <Typography variant="h5" style={{ color: "lightgreen" }}>
              Recompense
            </Typography>
          </Link>
          <img
            src={Gift} // Use the imported constant here
            alt="Asset"
            style={{ marginLeft: "10px", height: "40px" }}
          />{" "}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
