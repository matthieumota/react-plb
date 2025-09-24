import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router'
import About from './pages/About.tsx'
import Home from './pages/Home.tsx'
import BookSingle from './pages/BookSingle.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // layout parent des pages
    children: [
      { index: true, element: <Home /> },
      { path: 'a-propos', element: <About />, children: [
        { index: true, element: <p>RIEN</p> }, // /a-propos
        { path: '1', element: <p>1 iciiiiii</p> }, // /a-propos/1
        { path: '2', element: <p>2 lààààà</p> }, // /a-propos/2
      ] },
      { path: 'livre/:id', Component: BookSingle },
    ],
  },
  { path: '*', element: <p>404</p>, loader: () => {
    // throw redirect('/')
  } },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
