import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./component/Layout"
import Home from "./component/Home"
import About from './component/About'
import OldMethod from "./component/OldMethod";
import Contact from "./component/Contact"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/old",
          element: <OldMethod/>
        },

      ]
    }
  ])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
