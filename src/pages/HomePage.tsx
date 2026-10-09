const HomePage = () => {
    return (
        <section
            aria-labelledby="featured-heading"
            className="mx-auto max-w-6xl px-6 py-10"
        >
            <h2 id="featured-heading">Featured &amp; Recommended</h2>

            <article
                aria-labelledby="featured-title"
                className="mt-4 grid gap-4 border-2 border-slate-200 p-4 md:grid-cols-[2fr_1fr]"
            >
                <div
                    aria-hidden="true"
                    className="min-h-72 bg-slate-800"
                />

                <div>
                    <h3 id="featured-title">Dune: Part Two</h3>
                    <p>Fight for Arrakis. The spice must flow.</p>
                    <time dateTime="2024">2024</time>

                    <ul className="mt-4 flex flex-wrap gap-2">
                        <li>Science Fiction</li>
                        <li>Adventure</li>
                        <li>Drama</li>
                    </ul>

                    <button type="button" className="mt-6">
                        View details
                    </button>
                </div>
            </article>
        </section>
    )
}

export default HomePage