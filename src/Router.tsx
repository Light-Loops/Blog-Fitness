import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import { RouterLayout } from "./common/RouterLayout";
import { ArticleDetail } from "./pages/ArticleDetails";
import { LoginPage } from "./pages/Login";
import { Grid, CircularProgress } from "@mui/material";
import { useCheckAuth } from "./hooks/useCheckAuth";
import DashboardPage from "./pages/Dashboard";
import RouterDashboard from "./common/RouterDashboard";

export const AppRouter: React.FC = () => {
  const { status } = useCheckAuth();
  console.log(status);

  if (status === "checking") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", padding: 4 }}
      >
        <Grid container direction="row" justifyContent="center">
          <CircularProgress color="primary" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Routes>
  {status === "authenticated" ? (
    <>
      <Route path="/dashboard/*" element={<RouterDashboard />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </>
  ) : (
    <>
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<HomePage title={"Inicio"} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/article/:title" element={<ArticleDetail />} />
        <Route path="/Nutrición" element={<HomePage title={"Nutrición"} />} />
        <Route path="/Entrenamiento" element={<HomePage title={"Entrenamiento"} />} />
        <Route path="/Estilo-de-vida" element={<HomePage title={"Estilo de vida"} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </>
  )}
</Routes>
  );
};
