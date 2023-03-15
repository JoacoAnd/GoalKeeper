import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { IUser } from '../redux/reducers/auth';

type OnlyUsersProps = {
    redirectTo?: string;
    children?: React.ReactNode;
    user: IUser | null;
};

const OnlyForUser = ({ children, user, redirectTo="/" } : OnlyUsersProps) => {

    if (!user) {
        return <Navigate to={redirectTo} />
    }

  return <Outlet />
}

export default OnlyForUser