import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from '~/routes'
import '~/themes'

export function App() {
  return (
    <div>
      <Toaster position='bottom-right' />
      <RouterProvider router={router} />
    </div>
  )
}
