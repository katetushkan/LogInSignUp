import clsx from 'clsx';

import Warning from './icons/icon--warning.svg?react';
import CapsLock from './icons/icon--capslock.svg?react';
import Check from './icons/icon--check.svg?react';
import ShowPassword from './icons/icon--showPassword.svg?react';
import HidePassword from './icons/icon--hidePassword.svg?react';
import Google from './icons/icon--google.svg?react';

import S from './Icon.module.css';

const Icons = {
  Warning,
  CapsLock,
  Check,
  ShowPassword,
  HidePassword,
  Google
}

type IconSize = 's' | 'm' | 'l' | 'xl';

interface IIcon {
  className?: string;
  name: keyof typeof Icons;
  size?: IconSize;
}

export const Icon = ({ className, name, size = 'm' }: IIcon) => {
  const IconComponent = Icons[name];

  return (
    <i
      data-name={name}
      className={clsx(S.icon, className, {
        [S.small]: size === 's',
        [S.large]: size === 'l',
        [S.extra]: size === 'xl',
      })}
    >
      <IconComponent
        className={S.svg}
        aria-hidden
      />
    </i>
  );
};
