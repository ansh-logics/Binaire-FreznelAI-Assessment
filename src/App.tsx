import { useEffect, useState } from 'react'
import Header from './components/Layout/Header'
import StoreToolbar from './components/Layout/StoreToolbar'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import MovieDetailsPage from './pages/MovieDetailsPage'

type Route =
  | { page: 'home' }
  | { page: 'browse' }
  | { page: 'details'; movieId: number }

const getRoute = (): Route => {
  const detailMatch = window.location.hash.match(/^#movie-(\d+)$/)

  if (detailMatch) {
    return {
      page: 'details',
      movieId: Number(detailMatch[1]),
    }
  }

  if (window.location.hash.startsWith('#browse')) {
    return { page: 'browse' }
  }

  return { page: 'home' }
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute)

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute())
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <StoreToolbar
        onSearch={(query) => {
          const normalizedQuery = query.trim()

          window.location.hash = normalizedQuery
            ? `#browse?q=${encodeURIComponent(normalizedQuery)}`
            : '#browse'
        }}
      />

      {route.page === 'home' && <HomePage />}
      {route.page === 'browse' && <BrowsePage />}
      {route.page === 'details' && (
        <MovieDetailsPage movieId={route.movieId} />
      )}
    </div>
  )
}

export default App