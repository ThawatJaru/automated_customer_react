import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [user, setUser] = useState()
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