import React from "react";
import { Outlet } from "react-router-dom";
import { Typography, Container } from "@mui/material";

type Props = {};

const RouterDashboard = (props: Props) => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default RouterDashboard;
