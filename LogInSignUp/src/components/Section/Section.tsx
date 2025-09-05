import { type ReactNode, useId } from "react";
import clsx from 'clsx';

import { Typography } from "../Typography/Typography.tsx";

import S from './Section.module.css';

interface ISection {
  className?: string;
  header?: ReactNode | string;
  children?: ReactNode;
}

export const Section = ({ className, header, children }: ISection) => {
  const headerId = useId();

  return (
    <section
      className={clsx(S.section, className)}
      aria-labelledby={headerId}
    >
      <Typography
        className={S.header}
        component='h1'
        variant='h1'
        id={headerId}
        align='center'
      >
        {header}
      </Typography>
      {children}
    </section>
  );
};
