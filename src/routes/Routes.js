import PrivateRoute from './private';
import PublicRoute from './public';
import {useSelector} from 'react-redux';

const Routes = () => {
  const isLogin = useSelector(e => e?.userAuth?.login);
  const jwt = useSelector(e => e?.userAuth?.jwt);
  if (isLogin && jwt) {
    return <PrivateRoute />;
  } else {
    return <PublicRoute />;
  }
};
export default Routes;
