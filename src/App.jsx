import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from "./component/Layout"
import Home from "./component/Home"
import About from './component/About'
import OldMethod from "./component/OldMethod";
import Contact from "./component/Contact"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FetchQuery from "./component/FetchQuery";

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
          element: <OldMethod />
        },
        {
          path: "/new",
          element: <FetchQuery />
        },

      ]
    }
  ])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
        <ReactQueryDevtools initialIsOpen={true} />
        </RouterProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
