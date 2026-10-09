import { useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    type User,
} from 'firebase/auth'
import { auth } from '../auth/firebase'

const getAuthErrorMessage = (error: unknown) => {
    if (!(error instanceof Error)) {
        return 'Something went wrong. Please try again.'
    }

    if (error.message.includes('auth/email-already-in-use')) {
        return 'An account with this email already exists.'
    }

    if (error.message.includes('auth/invalid-credential')) {
        return 'Incorrect email or password.'
    }

    if (error.message.includes('auth/weak-password')) {
        return 'Use a password with at least six characters.'
    }

    if (error.message.includes('auth/invalid-email')) {
        return 'Enter a valid email address.'
    }

    return 'Authentication failed. Please try again.'
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    const createAccount = async (email: string, password: string) => {
        setError(null)

        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            const message = getAuthErrorMessage(error)
            setError(message)
            throw new Error(message)
        }
    }

    const signIn = async (email: string, password: string) => {
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            const message = getAuthErrorMessage(error)
            setError(message)
            throw new Error(message)
        }
    }

    const logOut = async () => {
        setError(null)

        try {
            await signOut(auth)
        } catch {
            setError('Could not sign out. Please try again.')
        }
    }

    return {
        user,
        isLoading,
        error,
        createAccount,
        signIn,
        logOut,
    }
}

export default useAuth