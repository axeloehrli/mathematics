import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../icons/menu.svg"
import menuData from "../MenuData";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleShowMenu = () => setShowMenu(prevState => !prevState)

  return (
    <nav>
      <img src={MenuIcon} alt="menu-icon" onClick={toggleShowMenu} />
      <h1 className="nav-title">Mathematics</h1>

      <div className={showMenu ? "nav-menu-mask active" : "nav-menu-mask"} onClick={setShowMenu}></div>
      <div className={showMenu ? "nav-menu active" : "nav-menu"} onClick={toggleShowMenu}>
        {menuData.map((item, index) => {
          return (
            <Link key={index} to={item.pathName}>
              <div className="menu-item">
                <p>{item.title}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}