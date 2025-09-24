import { createContext, useState } from 'react'

export type User = {
  name: string
}

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {},
})

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>({ name: 'Fiorella' })

  const login = async () => {
    // const user = axios.post('/login')
    // setUser(user)
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
