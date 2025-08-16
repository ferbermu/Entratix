import { useState, useCallback } from 'react';
import { useAuthRedux } from './useAuthRedux';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError } = useAuthRedux();

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (error) clearError();
    },
    [error, clearError]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      if (error) clearError();
    },
    [error, clearError]
  );

  const isValid = email.includes('@') && password.length > 0;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) return;

      setIsSubmitting(true);
      try {
        await login(email, password);
        // El hook useAuthRedux ya maneja la redirección
      } catch (error: unknown) {
        console.error('Error en el login:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, password, login, isValid]
  );

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    clearError();
  }, [clearError]);

  const clearFormError = useCallback(() => {
    clearError();
  }, [clearError]);

  return {
    email,
    password,
    error,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    resetForm,
    clearError: clearFormError,
    isValid,
  };
};
