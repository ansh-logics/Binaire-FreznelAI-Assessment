import { useEffect, useState } from 'react'
import Header from './components/Layout/Header'
import StoreToolbar from './components/Layout/StoreToolbar'
import MyListPage from './pages/MyListPage'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import AuthPage from './pages/AuthPage'
import NetworkStatus from './components/NetworkStatus'
import InfoPage from './pages/InfoPage'
import SiteFooter from './components/Layout/SiteFooter'

type Route =
  | { page: 'home' }
  | { page: 'browse' }
  | { page: 'details'; movieId: number }
  | { page: 'auth'; mode: 'signin' | 'signup' }
  | { page: 'my-list' }
  | { page: 'about' }
  | { page: 'support' }

const getRoute = (): Route => {
  const detailMatch = window.location.hash.match(/^#movie-(\d+)$/)

  if (window.location.hash === '#my-list') {
    return { page: 'my-list' }
  }

  if (detailMatch) {
    return {
      page: 'details',
      movieId: Number(detailMatch[1]),
    }
  }

  if (window.location.hash.startsWith('#browse')) {
    return { page: 'browse' }
  }
  if (window.location.hash === '#about') {
    return { page: 'about' }
  }

  if (window.location.hash === '#support') {
    return { page: 'support' }
  }

  if (window.location.hash.startsWith('#auth')) {
    const query = window.location.hash.split('?')[1] ?? ''
    const params = new URLSearchParams(query)

    return {
      page: 'auth',
      mode: params.get('mode') === 'signup' ? 'signup' : 'signin',
    }
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
      <NetworkStatus />

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
      {route.page === 'auth' && <AuthPage mode={route.mode} />}
      {route.page === 'my-list' && <MyListPage />}
      {route.page === 'about' && <InfoPage page="about" />}
      {route.page === 'support' && <InfoPage page="support" />}
      <SiteFooter />
    </div>
  )
}

export default App