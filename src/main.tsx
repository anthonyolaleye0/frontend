import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
      refetchIntervalInBackground: true,
      refetchInterval: 100000
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <>
  <BrowserRouter>
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>

    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster visibleToasts={1} position='top-center' richColors />
  </QueryClientProvider>
  </Provider>
  </BrowserRouter>
  </>,
)
