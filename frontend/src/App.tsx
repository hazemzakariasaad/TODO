import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
// import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar />
      <AnimatedBackground />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;