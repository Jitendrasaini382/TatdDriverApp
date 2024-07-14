
import { useContext } from "react"
import PrivateRoute from "./private"
import PublicRoute from "./public"
import { TokenConstextApi } from "../context/GlobalContext"

const Routes = ()=>{

  const{jwtToken} = useContext(TokenConstextApi)
  const token = jwtToken
  if(token){
    return<PrivateRoute/>
  }
  else{
    return <PublicRoute/>
  }

}
export default Routes