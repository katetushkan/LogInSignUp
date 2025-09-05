import type { ElementType, ReactNode } from "react";
import clsx from 'clsx';

import S from './Typography.module.css';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'body2' | 'caption' | 'button' | 'sectionLabel' | 'label';

interface ITypography {
  id?: string;
  className?: string;
  variant?: TypographyVariant;
  component?: ElementType;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'semi-bold' | 'bold';
  ariaHidden?: boolean;
  children: ReactNode;
}

export const Typography = ({
                             id,
                             className,
                             variant = 'body',
                             component: Component = 'p',
                             align = 'left',
                             weight = 'normal',
                             ariaHidden,
                             children
                           }: ITypography) => {
  return (
    <Component
      id={id}
      className={clsx(S.typogrpahy, {
        [S.h1]: variant === 'h1',
        [S.h2]: variant === 'h2',
        [S.h3]: variant === 'h3',
        [S.subtitle]: variant === 'subtitle',
        [S.body]: variant === 'body',
        [S.body2]: variant === 'body2',
        [S.caption]: variant === 'caption',
        [S.button]: variant === 'button',
        [S.sectionLabel]: variant === 'sectionLabel',
        [S.label]: variant === 'label',
        [S.weightSemiBold]: weight === 'semi-bold',
        [S.weightBold]: weight === 'bold',
        [S.alignRight]: align === 'right',
        [S.alignLeft]: align === 'left',
        [S.alignCenter]: align === 'center',
      }, className)}
      aria-hidden={ariaHidden}
    >
      {children}
    </Component>
  );
};
