import Header from "./components/Layout/Header"
import StoreToolbar from "./components/Layout/StoreToolbar"
import HomePage from "./pages/HomePage"

function App() {
  return <main className="min-h-screen bg-slate-950 text-slate-100">
    <Header />
    <StoreToolbar />
    <HomePage />
  </main>
}

export default App
