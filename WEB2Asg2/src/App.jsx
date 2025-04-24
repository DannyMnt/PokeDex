import { Link, Outlet, useLocation } from "react-router-dom"
import './App.css'

export default function App() {
    const location = useLocation();
    
    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="nav-brand">
                    <Link to = "/">Pokedex</Link>
                </div>
                <div className="nav-links">
                    <Link to="/pokemonList">List</Link>
                    <Link to="/about">About</Link>
                </div>
            </nav>
            <main className="content">
                {location.pathname === "/" && (
                    <div className="landing-page-content">
                        <h1>Welcome to the Pokedex!</h1>
                    </div>
                )}
                <Outlet />
            </main>
        </div>
    )
}