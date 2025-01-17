'use client';
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 5 * 60 * 1000
    }
  }
})

export default function Providers({children}:{children:React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
