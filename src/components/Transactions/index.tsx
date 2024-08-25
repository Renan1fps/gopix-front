import { useContext } from "react";
import { TransactionContext } from "../../TransactionContext";
import { Container } from "./style";

export function Transactions() {
  const { transactions } = useContext(TransactionContext)

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Destinatario</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.transactionId}>
              <td>{transaction.documentReceive}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: "currency",
                  currency: "BRL"
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>{new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.date))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}