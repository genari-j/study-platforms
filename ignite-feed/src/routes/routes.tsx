import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from '~/templates'
import { Posts } from '~/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Posts />,
      }
    ]
  },
  // {
  //   path: '/',
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: '/sign-in',
  //       element: <SignIn />,
  //     },
  //     {
  //       path: '/sign-up',
  //       element: <SignUp />,
  //     },
  //   ],
  // },
])
