import React from "react";
import MenuIcon from "../icons/menu.svg"

export default function Header() {
  return (
    <header>
      <img src={MenuIcon}/>
      <h1 className="header-title">Mathematics</h1>
    </header>
  )
}