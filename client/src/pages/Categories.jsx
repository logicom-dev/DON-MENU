import React, { useState } from 'react'
import CategoriesBody from "../components/CategoriesBody"
import logo from "../assets/thedon.png";
import { useScrollTrigger } from '@mui/material';

export default function Categories() {
  return (
    <div style={{
                 minHeight: "calc(100vh - 400px)",
                 maxWidth: "1200px" ,
                 margin: "auto",
                 marginBottom: "20px"}}>
    <div style={{
                 paddingTop: "50px",
                 paddingBottom: "50px",
                 width: "100%" ,
                 display: "flex" ,
                 justifyContent: "flex-start" ,
                 alignItems: "center" ,
                 flexDirection: "column"}}>
            <img src={logo ? require("../assets/thedon.png") : logo} alt="logo" style={{ height: "auto", width: "200px" }}/> 
            <div style={{  width: "6rem" , height: "0.25rem" , background: "#FFEE18"}}/>
    </div>
    <CategoriesBody/>
    </div>
  )
}
