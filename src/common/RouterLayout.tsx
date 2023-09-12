import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const RouterLayout: React.FC = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>   
        </>
    )
}