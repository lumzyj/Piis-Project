import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import './sidebar.css';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={handleToggleExpand}>
        <UilBars />
      </div>
      <motion.div
        className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src='./images/login.jpg' alt="logo" />
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
          <div className="menuItem">
            <Link to="/login">
            <UilSignOutAlt />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}




