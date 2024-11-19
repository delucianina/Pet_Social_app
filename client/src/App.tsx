import { Routes, Route } from 'react-router-dom';
import { useStore } from './store';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import ProtectRoute from './components/ProtectRoute.js';

import Landing from './pages/Landing';
import AuthForm from './pages/AuthForm';
import PetForm from './pages/PetForm';
import Dashboard from './pages/Dashboard/index';

function App() {
  const {state} = useStore();

  return (
    <>
    {state.loading && (
      <div className="loading-overlay d-flex justify-content-center aliogn-items-center"></div>
    )}
    <Header />
    
    <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/register" element={(
            <ProtectRoute>
              <AuthForm isLogin={false} />
            </ProtectRoute>
          )} />
          <Route path="/login" element={(
            <ProtectRoute>
              <AuthForm isLogin={true} />
            </ProtectRoute>
          )} />

          <Route path="/pet" element={(
            <ProtectRoute>
              <PetForm />
            </ProtectRoute>
          )} />
          

          <Route path="/dashboard" element={(
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          )} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App