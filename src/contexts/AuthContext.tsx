import * as React from "react"
import { auth, FirebaseUser } from "api/config"

const AuthContext = React.createContext<UseAuthProps | undefined>(undefined)
export const useAuth = () => {
    return React.useContext(AuthContext)
}

type AuthProviderProps = {
    children?: JSX.Element | JSX.Element[]
}

interface UseAuthProps {
    isSignedIn: boolean
    currentUser?: CurrentUser
}

interface CurrentUser {
    id: string,
    email: string | null
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isSignedIn, setIsSignedIn] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState<CurrentUser>()

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user ? {id: user?.uid, email: user?.email} : undefined)
            setIsSignedIn(user ? true : false)      
        })

        return unsubscribe
    }, [])

    const value: UseAuthProps = {
        isSignedIn,
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}