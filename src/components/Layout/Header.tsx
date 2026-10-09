function Header() {
    return (
        <header className="flex items-center justify-between px-6 h-16 bg-black">
            <div className="logo">
                <h1>Game Store</h1>
            </div>
            <nav aria-label="Primary navigation" className="menu">
                <ul className="flex items-center gap-6">
                    <li>
                        <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">STORE</a>
                    </li>
                    <li>
                        <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">COMMUNITY</a>
                    </li>
                    <li>
                        <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">ABOUT</a>
                    </li>
                    <li>
                        <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">SUPPORT</a>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center gap-6">
                <button className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2">Login</button>
                <button className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2">Account</button>
            </div>
        </header>
    )
}

export default Header