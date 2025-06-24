import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext();

//envolvemos la lógica dentro de un provider
export const AuthContextProvider = ({children}) => {
   const [user, setUser] = useState(null)

//obtener el token
const auth = Cookies.get('jwtoken') || null;

useEffect(() => {
    if (auth) {
      try {
        const decoded = jwtDecode(auth)
        setUser({ name: decoded.name, id: decoded.id })
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [auth])

    return (
        <AuthContext.Provider value={{user, setUser, auth}}>
            {children}
        </AuthContext.Provider>
    )
}