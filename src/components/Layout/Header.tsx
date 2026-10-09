import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'

type ActivePage = 'home' | 'discover' | 'about' | 'support' | null

const getActivePage = (): ActivePage => {
    const currentHash = window.location.hash || '#home'

    if (currentHash === '#home') {
        return 'home'
    }

    if (
        currentHash.startsWith('#browse') ||
        currentHash.startsWith('#movie-')
    ) {
        return 'discover'
    }

    if (currentHash === '#about') {
        return 'about'
    }

    if (currentHash === '#support') {
        return 'support'
    }

    return null
}

const Header: React.FC = () => {
    const { user, isLoading, logOut } = useAuth()
    const [activePage, setActivePage] = useState<ActivePage>(getActivePage)

    useEffect(() => {
        const updateActivePage = () => {
            setActivePage(getActivePage())
        }

        window.addEventListener('hashchange', updateActivePage)

        return () => {
            window.removeEventListener('hashchange', updateActivePage)
        }
    }, [])

    const handleLogOut = async () => {
        await logOut()
        window.location.hash = '#home'
    }

    const getNavClassName = (page: ActivePage) => {
        const isActive = activePage === page

        return `border-b-2 pb-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4] ${isActive
                ? 'border-[#1a9fff] text-[#1a9fff]'
                : 'border-transparent text-[#b8b6b4] hover:text-white active:opacity-80'
            }`
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-[#171a21] text-[#b8b6b4] shadow-md">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-10">
                    <a
                        href="#home"
                        className="flex items-center gap-2 text-2xl font-black tracking-wider text-white transition-colors duration-150 hover:text-[#66c0f4] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#66c0f4] text-xs font-bold text-[#171a21] shadow-[0_0_12px_rgba(102,192,244,0.6)]">
                            M
                        </span>

                        <span>MOVIES</span>
                    </a>

                    <nav aria-label="Main navigation" className="hidden md:block">
                        <ul className="flex items-center gap-5 text-sm font-semibold tracking-wide uppercase">
                            <li>
                                <a
                                    href="#home"
                                    aria-current={
                                        activePage === 'home' ? 'page' : undefined
                                    }
                                    className={getNavClassName('home')}
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#browse?tab=popular"
                                    aria-current={
                                        activePage === 'discover'
                                            ? 'page'
                                            : undefined
                                    }
                                    className={getNavClassName('discover')}
                                >
                                    Discover
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#about"
                                    aria-current={
                                        activePage === 'about' ? 'page' : undefined
                                    }
                                    className={getNavClassName('about')}
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#support"
                                    aria-current={
                                        activePage === 'support'
                                            ? 'page'
                                            : undefined
                                    }
                                    className={getNavClassName('support')}
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-3 text-xs">
                    {!isLoading &&
                        (user ? (
                            <>
                                <a
                                    href="#auth?mode=signin"
                                    className="rounded px-2.5 py-1 text-[#b8b6b4] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    Account
                                </a>

                                <button
                                    type="button"
                                    onClick={handleLogOut}
                                    className="rounded px-2.5 py-1 text-[#b8b6b4] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <a
                                    href="#auth?mode=signup"
                                    className="inline-flex items-center rounded-sm bg-[#5c7e10] px-3 py-1.5 font-medium text-white transition hover:bg-[#79a317] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79a317]"
                                >
                                    Create Account
                                </a>

                                <a
                                    href="#auth?mode=signin"
                                    className="rounded px-2.5 py-1 text-[#b8b6b4] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
                                >
                                    Login
                                </a>
                            </>
                        ))}

                    <span className="text-zinc-600">|</span>
                    <span className="px-2 py-1 text-[#8f98a0]">English</span>
                </div>
            </div>
        </header>
    )
}

export default Header