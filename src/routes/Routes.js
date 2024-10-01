// import React, {useState, useEffect} from 'react';
// import {View, ActivityIndicator, StyleSheet} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PrivateRoute from './private';
// import PublicRoute from './public';

// const Routes = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const checkToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwt');
//       setIsAuthenticated(!!token);
//     } catch (error) {
//       console.error('Error checking token:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     checkToken();
//   });

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (isAuthenticated) {
//     return <PrivateRoute />;
//   } else {
//     return <PublicRoute />;
//   }
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });

// export default Routes;

import {useContext} from 'react';
import PrivateRoute from './private';
import PublicRoute from './public';
import {TokenConstextApi} from '../context/GlobalContext';

const Routes = () => {
  const {jwtToken} = useContext(TokenConstextApi);
  const token = jwtToken;
  if (token) {
    console.log(token, "jwt token")
    
    return <PrivateRoute />;
  } else {
    return <PublicRoute />;
  }
};
export default Routes;
