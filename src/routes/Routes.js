import ApplyDriverJobRoute from './applyDriverJob';
import PrivateRoute from './private';
import PublicRoute from './public';
import {useSelector} from 'react-redux';

const Routes = () => {
  const isLogin = useSelector(e => e?.userAuth?.login);
  const jwt = useSelector(e => e?.userAuth?.jwt);
  const isRegistered = useSelector(e => e?.userAuth?.isRegistered);

  if (!isRegistered && isLogin && jwt) {
    return <ApplyDriverJobRoute />;
  } else if (isLogin && jwt && isRegistered) {
    return <PrivateRoute />;
  } else {
    return <PublicRoute />;
  }
};
export default Routes;
