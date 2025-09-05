import { type ReactNode, useId } from "react";
import clsx from 'clsx';

import { Icon } from "../Icon/Icon.tsx";

import S from './Checkbox.module.css';
import { Typography } from "../Typography/Typography.tsx";

interface ICheckbox {
  id: string;
  ariaLabel?: string;
  className?: string;
  label?: string;
  checked: boolean;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (id: string, checked: boolean) => void;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
}

export const Checkbox = ({
                           id,
                           className,
                           ariaLabel,
                           label,
                           onChange,
                           required,
                           disabled,
                           name,
                           value,
                           checked,
                           checkedIcon,
                           uncheckedIcon,
                         }: ICheckbox) => {
  const checkboxId = useId();

  const handleChange = () => {
    onChange?.(id, !checked);
  };

  return (
    <div className={clsx(S.checkbox, {
      [S.checkboxChecked]: checked,
      [S.checkboxDisabled]: disabled,
      [S.check]: !checkedIcon && !uncheckedIcon,
    }, className)}>
      <input
        className={S.input}
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={checked}
        required={required}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
        aria-checked={checked}
      />
      <label
        className={S.label}
        htmlFor={checkboxId}
      >
        {label && <Typography variant='label'>{label}</Typography>}
        <div className={S.icon}>
          {
            checked
              ? checkedIcon || <Icon name="Check" />
              : uncheckedIcon || null
          }
        </div>
      </label>
    </div>
  );
};
