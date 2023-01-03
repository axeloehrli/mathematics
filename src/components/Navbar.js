import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../icons/menu.svg"
import menuData from "../MenuData";

export default function Navbar(props) {
  const [showMenu, setShowMenu] = useState(false)
  const toggleShowMenu = () => setShowMenu(prevState => !prevState)
  const strings = props.strings
  return (
    <div className="navbar-wrapper">
      <nav>
        <img src={MenuIcon} alt="menu-icon" onClick={toggleShowMenu} />
        <h1 className="nav-title">{strings.mathematics}</h1>
        <div className={showMenu ? "nav-menu-mask active" : "nav-menu-mask"} onClick={toggleShowMenu}></div>
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
        <p
          onClick={props.onLanguageClick}
          className="language"
        >
          {props.language}
        </p>
      </nav>
    </div>
  )
}