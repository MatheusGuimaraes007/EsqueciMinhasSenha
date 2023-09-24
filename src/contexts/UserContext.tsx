import {createContext, useState, ReactNode} from 'react'

type UserContextType = {
  user: string;
  setUser: (newUser: string) => void;
  password: string;
  setPassword: (newPassword: string) => void
  email: string;
  setEmail: (newEmail: string) => void;
}



export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  



  return (
    <UserContext.Provider value={{user, setUser, password, setPassword, email, setEmail}}>{children}</UserContext.Provider>
  )
}
