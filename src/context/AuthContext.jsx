import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        id,
        setId,
        cpf,
        setCpf,
        password,
        setPassword,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
