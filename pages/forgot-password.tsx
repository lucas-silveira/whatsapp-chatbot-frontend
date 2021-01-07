import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import * as yup from 'yup';
import * as S from '@styles/pages/signin.style';
import HeaderBrand from 'components/header/header-brand';
import {
  FormValidationError,
  validateForgotPasswordForm,
} from '@utils/form-validators';
import { jullyAPI } from '@utils/api';
import ToastFormError from '@components/toasts/toast-form-error';
import { useRecoilValue } from 'recoil';
import { authState } from 'store/auth';
import { useRouter } from 'next/router';
import ForgotPasswordForm from '@components/forms/forgot-password-form';

type FormState = {
  email: string;
  isSending: boolean;
  emailSent: boolean;
  errors: {
    [key: string]: string;
  };
};

export default function ForgotPassword(): JSX.Element {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const [formState, setFormState] = useState<FormState>({
    email: '',
    isSending: false,
    emailSent: false,
    errors: {},
  });
  const [toastError, setToastError] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    if (auth.accessToken) router.push('dashboard');
  }, [router, auth]);

  const handleToastErrorClose = useCallback(() => {
    setToastError({
      open: false,
      message: '',
    });
  }, []);

  const validateFormData = useCallback(async () => {
    try {
      await validateForgotPasswordForm({
        email: formState.email,
      });

      setFormState(oldValues => ({
        ...oldValues,
        errors: {},
      }));

      return true;
    } catch (err) {
      const errors = {};

      if (err instanceof yup.ValidationError) {
        (err.errors as any).forEach((error: FormValidationError) => {
          errors[error.field] = error.message;
        });
      }

      setFormState(oldValues => ({
        ...oldValues,
        errors,
      }));

      return false;
    }
  }, [formState.email]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      try {
        event.preventDefault();

        const formIsValid = await validateFormData();

        if (!formIsValid) return;

        setFormState(oldValues => ({
          ...oldValues,
          isSending: true,
        }));

        // const { data } = await jullyAPI.post('/authentication', {
        //   email: formState.email,
        //   password: formState.password,
        // });

        setFormState(oldValues => ({
          ...oldValues,
          isSending: false,
          emailSent: true,
        }));
      } catch (err) {
        setFormState(oldValues => ({
          ...oldValues,
          isSending: false,
        }));

        setToastError({
          open: true,
          message: err.response.data.message,
        });
      }
    },
    [validateFormData],
  );

  const handleChange = useCallback(
    (prop: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState(oldValues => ({ ...oldValues, [prop]: event.target.value }));
    },
    [],
  );

  return (
    <>
      <Head>
        <title>Recuperar senha | Jully Bot</title>
      </Head>
      <ToastFormError toast={toastError} handleClose={handleToastErrorClose} />
      <S.LayoutWrapper>
        <HeaderBrand />
        <S.LayoutMain>
          <S.LoginBox>
            {!formState.emailSent ? (
              <>
                <header>
                  <h2>Recupere a sua senha</h2>
                  <p>
                    Insira o seu e-mail abaixo e enviaremos as instruções de
                    redefinição.
                  </p>
                </header>
                <ForgotPasswordForm
                  formState={formState}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                />
              </>
            ) : (
              <header>
                <h2>E-mail de recuperação enviado</h2>
                <p>
                  Confira a sua caixa de entrada. O e-mail pode levar alguns
                  minutos para chegar.
                </p>
              </header>
            )}
          </S.LoginBox>
        </S.LayoutMain>
      </S.LayoutWrapper>
    </>
  );
}
