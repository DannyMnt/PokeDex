import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import PokemonList from './pages/PokemonList.jsx'
import About from './pages/About.jsx'
import PokemonInfo from './pages/PokemonInfo.jsx'
import './index.css'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/pokemonList",
        element: <PokemonList />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/pokemon/:name",
        element: <PokemonInfo />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
