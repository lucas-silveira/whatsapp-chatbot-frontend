import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';
import DashboardLayout from 'layouts/dashboard';
import { Backdrop } from '@styles/components/backdrop.style';
import * as S from '@styles/pages/dahsboard.style';

export default function Applications(): JSX.Element {
  const router = useRouter();
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.accessToken) {
      router.push('signin');
      return;
    }
    setPageIsLoading(false);
  }, [router, auth]);

  return (
    <>
      <Head>
        <title>Meus aplicativos | Jully Bot</title>
      </Head>
      <Backdrop open={pageIsLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!pageIsLoading && (
        <DashboardLayout>
          <S.Wrapper>Aplicativos...</S.Wrapper>
        </DashboardLayout>
      )}
    </>
  );
}