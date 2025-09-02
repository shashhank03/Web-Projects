import React, { createContext, type ReactNode } from 'react'

type UserContextType = {
    role: 'student' | 'staff' | 'admin';
    authenticated: boolean;
}

export const userContext = createContext<UserContextType | undefined>(undefined);
interface ContextProviderProps{
    children: ReactNode;
}
const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    const role:UserContextType['role'] = 'admin'
    const authenticated = true;
    return (
        <userContext.Provider value = {{role,authenticated}}>
            {children}
        </userContext.Provider>
    )
}

export default ContextProvider
