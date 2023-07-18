import { useState, createContext, useContext } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const login = (user) => {
        // setUser(user)
        setUser(localStorage.setItem('user', true))
    }
    const logout = () => {
        // setUser(null)
        setUser(localStorage.setItem('user', false))
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}