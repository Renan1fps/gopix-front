import { useContext } from 'react';
import IncomeImg from '../../assets/income.svg'
import OutcomeImg from '../../assets/outcome.svg'
import Total from '../../assets/total.svg'
import { TransactionContext } from '../../TransactionContext';
import { Container } from "./style";



export function Summary() {
  const { transactions } = useContext(TransactionContext)

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'DEPOSIT') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraws += transaction.amount
      acc.total -= transaction.amount
    }
    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeImg} alt="income" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: "currency",
            currency: "BRL"
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={OutcomeImg} alt="outcome" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: "currency",
            currency: "BRL"
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={Total} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: "currency",
            currency: "BRL"
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}