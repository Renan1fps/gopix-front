import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Global } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { useEffect, useState } from "react";
import { TransactionsProvider } from "./TransactionContext";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";


function App() {
  const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/cadastro') {
      navigate('/login');
    }
  }, [token, navigate]);

  function handleOpenTransactionModal() {
    setIsOpenTransactionModal(true);
  }

  function handleCloseTransactionModal() {
    setIsOpenTransactionModal(false);
  }

  return (

    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <>
              <TransactionsProvider>
                <Header onOpenNewTransactionModal={handleOpenTransactionModal} />
                <Dashboard />
                <NewTransactionModal
                  isOpen={isOpenTransactionModal}
                  onRequestClose={handleCloseTransactionModal}
                />
                <Global />
                <Toaster/>
              </TransactionsProvider>
            </>
          ) : (
            <Login />
          )
        }
      />
      <Route path="/login" element={<><Login /> <Global /> </>} />
      <Route path="/cadastro" element={<><Signup /><Global /></>} />
    </Routes>
  );
}

export { App };
