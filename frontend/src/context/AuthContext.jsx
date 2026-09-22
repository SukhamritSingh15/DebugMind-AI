import { createContext, useContext, useState } from "react"
import api from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")

    return savedUser
      ? JSON.parse(savedUser)
      : null
  })

  const login = async (email, password) => {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    )

    const userData = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    }

    localStorage.setItem(
      "token",
      response.data.token
    )

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    )

    setUser(userData)

    return response.data
  }

  const register = async (name, email, password) => {
    const response = await api.post(
      "/api/auth/register",
      {
        name,
        email,
        password,
      }
    )

    return response.data
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}