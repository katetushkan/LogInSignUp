import clsx from "clsx";

import { LogInForm } from "./LogInForm/LogInForm.tsx";

import GS from '../Page.module.css';
import S from './AuthenticationPage.module.css';

interface IAuthenticationPage {}

export const AuthenticationPage = ({}: IAuthenticationPage) => {


  return (
    <div className={GS.page}>
      <div className={clsx(GS.content, S.content)}>
        <LogInForm />
      </div>
    </div>
  );
};
