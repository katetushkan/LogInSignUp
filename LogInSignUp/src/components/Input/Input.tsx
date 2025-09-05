import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useState
} from 'react';
import clsx from 'clsx';

import { Icon } from '../Icon/Icon.tsx';
import { Typography } from '../Typography/Typography.tsx';

import S from './Input.module.css';

type InputType = 'text' | 'email' | 'password' | 'number';

interface IInput {
  className?: string;
  defaultValue?: string;
  type?: InputType;
  label?: string;
  required?: boolean;
  placeholder?: string;
  checked?: boolean;
  actions?: ReactNode;
  disabled?: boolean;
  showModifiers?: boolean;
  caption?: string;
  validator?: (value: string) => { error: boolean, message: string };
  onChange?: (value: string, error: boolean) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const Input = ({
                        className,
                        label,
                        placeholder,
                        checked,
                        actions,
                        onChange,
                        onFocus,
                        onBlur,
                        disabled,
                        caption,
                        validator,
                        defaultValue,
                        required = false,
                        showModifiers = true,
                        type = 'text',
                      }: IInput) => {
  const inputId = useId();
  const captionId = useId();

  const [isCapitalized, setIsCapitalized] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    let { error, message } = validator?.(value) || {};

    if (error) {
      setError(message!);
    } else {
      setError('');
    }

    onChange?.(event.currentTarget.value, error!);
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.currentTarget.tagName !== 'BUTTON') {
      onFocus?.(event)
    }
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsCapitalized(false);
    onBlur?.(event);
  }

  const handleCapsLock = (event: KeyboardEvent) => {
    const isCapsLocked = event.getModifierState?.('CapsLock');
    setIsCapitalized(isCapsLocked);
  }

  return (
    <div
      className={clsx(S.wrapper, className)}
      data-testid='Input'
    >
      <label
        className={S.label}
        htmlFor={inputId}
      >
        <Typography variant='label'>{label}</Typography>
      </label>
      <div
        className={clsx(S.inputWrapper, {
          [S.error]: error.length !== 0
        })}
      >
        <input
          className={S.input}
          type={type}
          id={inputId}
          placeholder={placeholder}
          name={label}
          checked={checked && checked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUpCapture={handleCapsLock}
          onKeyDownCapture={handleCapsLock}
          inputMode={type === 'number' ? 'numeric' : 'text'}
          aria-invalid={error.length !== 0}
          aria-describedby={captionId}
          autoComplete={type}
          defaultValue={defaultValue}
        />
        {
          showModifiers &&
          <Icon
            name='CapsLock'
            className={clsx(S.capsLock, {
              [S.capsLockHidden]: !isCapitalized,
            })}
          />
        }
        {actions}
      </div>
      <Typography
        variant='caption'
        className={clsx(S.caption, {
          [S.error]: error.length !== 0
        })}
        id={captionId}
        ariaHidden={!(error || caption)}
      >
        {error || caption}
      </Typography>
    </div>
  );
};
