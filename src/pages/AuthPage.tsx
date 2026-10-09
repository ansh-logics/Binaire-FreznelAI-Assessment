import { FormEvent, useState } from 'react'
import useAuth from '../hooks/useAuth'

type AuthMode = 'signin' | 'signup'

type AuthPageProps = {
    mode: AuthMode
}

const AuthPage = ({ mode }: AuthPageProps) => {
    const { user, isLoading, error, createAccount, signIn, logOut } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isSignUpMode = mode === 'signup'

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            if (isSignUpMode) {
                await createAccount(email, password)
            } else {
                await signIn(email, password)
            }

            window.location.hash = '#home'
        } catch {
            // The hook already provides a readable error message.
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-6">
                <p className="text-slate-400">Checking your account…</p>
            </main>
        )
    }

    if (user) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6">
                <section className="rounded border border-slate-700 bg-[#0f1922] p-6">
                    <h1 className="text-2xl font-bold text-white">
                        You are signed in
                    </h1>

                    <p className="mt-3 text-sm text-slate-300">
                        Signed in as {user.email}
                    </p>

                    <div className="mt-6 flex gap-3">
                        <a
                            href="#home"
                            className="rounded bg-[#2a475e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d6c9e]"
                        >
                            Explore movies
                        </a>

                        <button
                            type="button"
                            onClick={logOut}
                            className="rounded border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                        >
                            Sign out
                        </button>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="mx-auto flex min-h-[60vh] max-w-md items-center px-6">
            <section className="w-full rounded border border-slate-700 bg-[#0f1922] p-6 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
                    Movie discovery
                </p>

                <h1 className="mt-2 text-2xl font-bold text-white">
                    {isSignUpMode ? 'Create your account' : 'Welcome back'}
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    {isSignUpMode
                        ? 'Save movies and build your personal watchlist.'
                        : 'Sign in to continue exploring movies.'}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-slate-200"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            required
                            className="w-full rounded border border-slate-600 bg-[#070b10] px-3 py-2 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-slate-200"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete={
                                isSignUpMode ? 'new-password' : 'current-password'
                            }
                            minLength={6}
                            required
                            className="w-full rounded border border-slate-600 bg-[#070b10] px-3 py-2 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded bg-[#5c7e10] px-4 py-2.5 font-semibold text-white transition hover:bg-[#719b13] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting
                            ? 'Please wait…'
                            : isSignUpMode
                                ? 'Create account'
                                : 'Sign in'}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-400">
                    {isSignUpMode
                        ? 'Already have an account?'
                        : 'New to Movie Discovery?'}{' '}
                    <a
                        href={isSignUpMode ? '#auth?mode=signin' : '#auth?mode=signup'}
                        className="font-semibold text-sky-400 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        {isSignUpMode ? 'Sign in' : 'Create one'}
                    </a>
                </p>
            </section>
        </main>
    )
}

export default AuthPage