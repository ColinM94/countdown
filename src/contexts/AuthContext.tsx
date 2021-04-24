import * as React from "react"
import { auth } from "api/config"

interface CurrentUser {
    id: string | null
    email: string | null
    isSignedIn: boolean
}

type AuthProviderProps = {
    children?: React.ReactNode | React.ReactNode[]
}

interface State {
    currentUser: CurrentUser,
}

export const AuthContext = React.createContext({} as State)

export const useAuth = (): State => {
    return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = React.useState<CurrentUser>({
        id: null, 
        email: null, 
        isSignedIn: false,
    })

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser({
                id: user?.uid ?? null,
                email: user?.email ?? null,
                isSignedIn: user ? true : false
            })   
        })
        return () => unsubscribe()
    }, [])

    const value: State = {
        currentUser
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

