import clsx from "clsx";
import { Typography } from "../../components/Typography/Typography.tsx";


import GS from '../Page.module.css';
import S from './WelcomePage.module.css';

interface IWelcomePage {}

export const WelcomePage = ({}: IWelcomePage) => {
  return (
    <div className={GS.page}>
      <div className={clsx(GS.content, S.content)}>
        <Typography variant='h1' align='center'>WELCOME!</Typography>
      </div>
    </div>
  );
};
