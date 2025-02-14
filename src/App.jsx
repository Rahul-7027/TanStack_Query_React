import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from "./component/Layout"
import Home from "./component/Home"
import About from './component/About'
import OldMethod from "./component/OldMethod";
import Contact from "./component/Contact"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FetchQuery from "./component/FetchQuery";
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import FetchIndividual from "./component/FetchIndividual"

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
        {
          path: "/new/:id",
          element: <FetchIndividual/>
        },

      ]
    }
  ])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
        <ReactQueryDevtools initialIsOpen={true} />
        <TanStackRouterDevtools initialIsOpen={false} />
        </RouterProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
