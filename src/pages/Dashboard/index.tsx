import React from 'react'
import { Container, Typography, Button } from '@mui/material';
import { startLogout } from '../../Api';
import { useAppDispatch } from '../../redux/hooks';

type Props = {}

const DashboardPage = (props: Props) => {
  const distpach = useAppDispatch();

  const onLogout =  () => {
    distpach(startLogout());
  }
  return (
    <Container>
      <Typography variant='h3' color={"secondary"}>
        DashboardPage
      </Typography>
      <Button variant='contained' onClick={onLogout}>
        SALIR
      </Button>
    </Container>
  )
}

export default DashboardPage