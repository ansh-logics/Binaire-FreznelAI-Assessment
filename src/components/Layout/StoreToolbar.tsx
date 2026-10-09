const StoreToolbar = () => {
    return (
        <nav aria-label="Store navigation" className="flex items-center justify-between px-6 h-10 bg-[#3d6c9e]">
            <ul className="flex items-center gap-6">
                <li>
                    <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">Your Store</a>
                </li>
                <li>
                    <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">New & Noteworthy</a>
                </li>
                <li>
                    <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">Categories</a>
                </li>
                <li>
                    <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">Points Shop</a>
                </li>
                <li>
                    <a className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" href="/">News & Updates</a>
                </li>
            </ul>
            <div className="search" role="search">
                <label htmlFor="search" className="sr-only">Search the store</label>
                <input className="border-2 border-white/50 focus-visible:outline-offset-2 focus-visible:outline-white" type="search" name="search" id="search" placeholder="Search the store" />
                <button className="hover:text-white focus:text-white focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2" type="button" aria-label="Search">Search</button>
            </div>
        </nav>
    )
}

export default StoreToolbar