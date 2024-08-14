import { RouterProvider } from 'react-router-dom'

import { router } from '~/routes'
import { Toaster } from 'react-hot-toast'
import { CyclesContextProvider } from '~/contexts'

import { GlobalStyles } from '~/themes'

export const App = () => {
  return (
    <div>
      <GlobalStyles />
      <CyclesContextProvider>
        <RouterProvider router={router} />
      </CyclesContextProvider>
      <Toaster position='bottom-right' />
    </div>
  )
}
