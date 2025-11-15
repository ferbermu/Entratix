import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { registerUserAction } from '../../actions/auth';

export const useRegister = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    email.includes('@') &&
    phone.trim() !== '' &&
    birthDate !== undefined &&
    password.length >= 6 &&
    password === confirmPassword &&
    agreeTerms;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!isValid) {
        setError('Por favor completa todos los campos requeridos correctamente');
        return;
      }

      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }

      if (!agreeTerms) {
        setError('Debes aceptar los términos y condiciones');
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const response = await registerUserAction({
          firstName,
          lastName,
          email,
          phone,
          birthDate,
          password,
          receiveUpdates,
        });

        if (response.success) {
          // Guardar token en localStorage
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
          
          // Redirigir a la página principal
          router.push('/');
        } else {
          setError(response.message || 'Error al registrar el usuario');
        }
      } catch (error) {
        console.error('Error en el registro:', error);
        setError('Error al registrar el usuario');
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      password,
      confirmPassword,
      agreeTerms,
      receiveUpdates,
      isValid,
      router,
    ]
  );

  const resetForm = useCallback(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setBirthDate(undefined);
    setPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setReceiveUpdates(false);
    setError(null);
  }, []);

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    agreeTerms,
    setAgreeTerms,
    receiveUpdates,
    setReceiveUpdates,
    error,
    isSubmitting,
    isValid,
    handleSubmit,
    resetForm,
    clearError,
  };
};

