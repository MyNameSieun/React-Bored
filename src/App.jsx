import { AuthProvider } from 'context/AuthContext';
import Router from 'shared/Router';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
