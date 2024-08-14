import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from '~/templates'
import { Home, TimerHistory } from '~/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    // errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/timer-history', element: <TimerHistory /> }
    ]
  },
  // {
  //   path: '/',
  //   element: <AuthLayout />,
  //   children: [
      // { path: '/sign-in', element: <SignIn /> },
      // { path: '/sign-up', element: <SignUp /> },
  //   ],
  // },
])
