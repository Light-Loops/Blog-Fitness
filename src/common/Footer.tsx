import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export const Footer = (props: Props) => {
  return (
    <AppBar position="static" component={"footer"} >
    <Toolbar>
      <Typography variant="body1" color="inherit">
        &copy; 2023 Blog Fitness
      </Typography>
    </Toolbar>
    </AppBar>
  )
}