import { Checkbox } from '../Checkbox/Checkbox.tsx';
import { Icon } from '../Icon/Icon.tsx';
import { Input } from '../Input/Input.tsx';
import { type FocusEvent, useState } from 'react';

interface IPasswordField {
  className?: string;
  label?: string;
  onChange?: (value: string, error: boolean) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({ className, label, onFocus, onChange, onBlur }: IPasswordField) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)


  return (
    <Input
      className={className}
      type={showPassword ? 'text' : 'password'}
      required
      actions={
        <Checkbox
          id='showPassword'
          ariaLabel={showPassword ? 'Hide the password' : 'Show the password'}
          checked={showPassword}
          onChange={(_id, checked) => {
            setShowPassword(checked);
          }}
          checkedIcon={<Icon name='ShowPassword' />}
          uncheckedIcon={<Icon name='HidePassword' />}
        />
      }
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      label={label}
      validator={(value) => { return( { error: value.length === 0, message: 'Should not be empty'})}}
    >
    </Input>
  );
};
