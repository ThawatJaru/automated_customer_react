import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "00000000-0000-4000-8000-000000000000",
  })
  const [machineId, setMachineId] = useState()

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        machineId,
        setMachineId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider