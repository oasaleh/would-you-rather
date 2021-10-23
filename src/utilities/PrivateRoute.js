/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../features/users/usersSlice';

function PrivateRoute({ children, ...rest }) {
  const authUser = useSelector(selectAuthUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
