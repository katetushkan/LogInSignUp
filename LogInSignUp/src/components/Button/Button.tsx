import type { ReactNode, MouseEvent } from "react";
import { Link } from 'react-router';
import clsx from 'clsx';

import S from './Button.module.css';

interface IButton {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  autoFocus?: boolean;
  value?: string;
  disabled?: boolean;
  type?: 'normal' | 'accent';
  actionType: 'submit' | 'button';
  to?: { pathname: string, state: {} } | string;
  children?: ReactNode;
}

export const Button = ({
                         onClick,
                         className,
                         children,
                         autoFocus,
                         value,
                         disabled,
                         actionType,
                         to,
                         type = 'normal',
                       }: IButton) => {

  const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onClick?.(event);
  }

  if (to) {
    return (
      <Link
        to={to}
        className={clsx(S.button, {
          [S.normal]: type === 'normal',
          [S.accent]: type === 'accent',
          [S.disabled]: disabled,
        }, className)}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      autoFocus={autoFocus}
      className={clsx(S.button, {
        [S.normal]: type === 'normal',
        [S.accent]: type === 'accent',
        [S.disabled]: disabled,
      }, className)}
      onClick={handleClick}
      value={value}
      disabled={disabled}
      type={actionType}
    >
      {children}
    </button>

  )
};
