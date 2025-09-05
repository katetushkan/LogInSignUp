import { type FormEvent, useState } from 'react';
import { Link } from 'react-router';
import clsx from 'clsx';

import { Input } from '../../../components/Input/Input.tsx';
import { PasswordInput } from '../../../components/PasswordInput/PasswordInput.tsx';
import { Checkbox } from '../../../components/Checkbox/Checkbox.tsx';
import { Button } from '../../../components/Button/Button.tsx';
import { Typography } from '../../../components/Typography/Typography.tsx';
import { Paths } from '../../../routing/paths.ts';
import { Section } from '../../../components/Section/Section.tsx';
import { firebaseErrorTypeGuard, getFBError } from '../../../services/FirebaseService/FirebaseService.errors.ts';
import { authRepo } from '../../../repositories/AuthRepository/AuthRepository.ts';
import { DEFAULT_ERROR_MESSAGE, EMPTY_ERROR_MESSAGE, isValidEmail } from '../Authentication.utils.ts';
import { useAuthToken } from '../../../contexts/AuthProvider/AuthProvider.tsx';
import { Icon } from '../../../components/Icon/Icon.tsx';

import S from './LogInForm.module.css';

export const LogInForm = () => {
  const { email: rememberedEmail, rememberEmail, authenticate } = useAuthToken();

  const [password, setPassowrd] = useState('');
  const [email, setEmail] = useState(rememberedEmail || '');
  const [isRemembered, setIsRemembered] = useState(false)
  const [formError, setFormError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      return setFormError(EMPTY_ERROR_MESSAGE);
    }

    try {
      const authUser = await authRepo.authenticate({ email, password });

      authenticate(authUser.token);
      rememberEmail(email);
    } catch (e) {
      if (firebaseErrorTypeGuard(e)) {
        const error = getFBError(e);
        setFormError(error?.message || DEFAULT_ERROR_MESSAGE);
      }
    }
  }

  const handleEmailInput = (value: string) => {
    setFormError('');
    setEmail(value);
  }

  const handlePasswordInput = (value: string) => {
    setFormError('');
    setPassowrd(value);
  }

  return (
    <Section header='Welcome back, Son! Wanna login?' className={clsx({
      [S.formError]: formError
    })}>
      <form className={S.form} method='POST' onSubmit={submit}>
        <div className={S.fields}>
          <Input
            className={S.email}
            label='Email'
            type='email'
            placeholder='example@icloud.com'
            onChange={handleEmailInput}
            validator={isValidEmail}
            defaultValue={rememberedEmail}
            required
          />
          <PasswordInput
            className={S.password}
            label='Password'
            onChange={handlePasswordInput}
          />
          <Icon className={S.provider} name='Google' size='xl' />
          <Checkbox
            className={S.remember}
            id={'Remember'}
            label={'Remember me'}
            checked={isRemembered}
            onChange={(_id, checked) => setIsRemembered(checked)}
          />
        </div>

        <Button type='accent' actionType='submit'>
          <Typography variant='button'>log in</Typography>
        </Button>
        <Typography align='center' variant='subtitle' className={S.error}>{formError}</Typography>
      </form>
      <footer>
        <Typography align='center' variant='subtitle'>Don't have an account yet? Join us <Link
          to={Paths.FALLBACK_SCREEN}>here</Link>!</Typography>
        <Typography align='center' variant='subtitle'>
          <Link className={S.forget} to={Paths.WELCOME_SCREEN}>Restore</Link> your password if you forget :)
        </Typography>
      </footer>
    </Section>
  )
};

