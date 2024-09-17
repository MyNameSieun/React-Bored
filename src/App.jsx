import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'context/AuthContext';
import Router from 'shared/Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
