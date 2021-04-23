import * as React from "react"
import { auth, FirebaseUser } from "api/config"

interface State {
    /** Boolean stuff kiiid */
    isSignedIn: boolean
    /** Boolean userId */
    userId: string | null
}

type AuthProviderProps = {
    children?: React.ReactNode | React.ReactNode[]
}

const initialState: State = {
    isSignedIn: false,
    userId: null
}

export const AuthContext = React.createContext(initialState)

export const useAuth = () => {
    return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isSignedIn, setIsSignedIn] = React.useState(initialState.isSignedIn)
    const [userId, setUserId] = React.useState(initialState.userId)

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUserId(user?.uid ?? null)
            setIsSignedIn(user ? true : false)      
        })

        return unsubscribe
    }, [])

    const value: State = {
        isSignedIn,
        userId
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

