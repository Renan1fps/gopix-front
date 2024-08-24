import { createContext, useEffect, useState } from "react";
import { api } from "./services/api";
import { ReactNode } from 'react'

interface Transaction {
  transactionId: number,
  documentReceive: string,
  category: string,
  amount: number,
  type: string,
  date: string
}

interface TransactionProviderProps {
  children: ReactNode,
}

interface TransactionContextData {
  transactions: Transaction[]
  setTransactions: (value: React.SetStateAction<Transaction[]>) => void
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get<any>('/transactions/all', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setTransactions(response.data)
    }
    fetchData();
  }, []);

  return (
    <>
      <TransactionContext.Provider value={{ transactions, setTransactions }}>
        {children}
      </TransactionContext.Provider>
    </>
  )

}