import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import "./sidebar.css";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSignOut = async () => {
    try {
      // Send a request to the backend's logout endpoint
      await axios.post("http://localhost:3333/users/logout");

      // Remove tokens or authentication data from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refreshToken");

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarVariants = {
    expanded: {
      left: "0",
    },
    collapsed: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={handleToggleExpand}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={expanded ? "expanded" : "collapsed"}
      >
        {/* logo */}
        <div className="logo">
          <img src="./images/login.jpg" alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            const isActive = item.path === location.pathname;
            return (
              <div
                className={isActive ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setExpanded(false)}
              >
                <item.icon />
                {item.path ? (
                  <Link to={item.path}>
                    <span>{item.heading}</span>
                  </Link>
                ) : (
                  <span>{item.heading}</span>
                )}
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem" onClick={handleSignOut}>
            <Link to="/login">
              <UilSignOutAlt />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}





