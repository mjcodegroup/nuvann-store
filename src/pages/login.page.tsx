import { HomePageDefault } from '@/components/home-page-default';
import { useUser } from '@/contexts/user';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useAuth0 } from '@auth0/auth0-react';
import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'

export default function LoginPage() {
  const { loginWithRedirect, isLoading: loading, isAuthenticated } = useAuth0();
  const {state} = useUser();
  const { redirect } = useNavigation();

  useEffect(() => {
    if (!state.token) {
      loginWithRedirect();
    } else {
      redirect(window.location.origin as RoutesUrls);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <HomePageDefault>
        <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
        onClick={() => {}}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
    </HomePageDefault>
  )
}
