import Modal from 'react-modal'
import { Container, TransactionsTypeContainer, ButtonTypeTransaction } from './style'
import CloseImg from '../../assets/close.svg'
import IncomeImg from '../../assets/income.svg'
import OutcomeImg from '../../assets/outcome.svg'
import { FormEvent, useContext, useState } from 'react'
import { TransactionContext } from '../../TransactionContext'
import toast from 'react-hot-toast'
import { api } from '../../services/api'


interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { setTransactions } = useContext(TransactionContext)
  const [document, setDocument] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('DEPOSIT')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      userReceiveDocument: document,
      amount: value,
      category,
      type
    })
    setDocument('')
    setValue(0)
    setCategory('')
    onRequestClose()
  }

  async function createTransaction(transactionsInput: any) {
    console.log('AQUIII', transactionsInput)
    api.defaults.validateStatus = function () {
      return true;
    }
    const { status, data } = await api.post<any>('transactions', { ...transactionsInput }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

    if (status === 400) {
      toast.error(data.message);
      onRequestClose()
    }

    if (status === 201) {
      const response = await api.get<any>('/transactions/all', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setTransactions([
        ...response.data
      ]);

      if (transactionsInput.type === 'DEPOSIT') {
        toast.success('Deposito realizado com sucesso!');
      } else {
        toast.success('Transferencia realizada com sucesso!');
      }
    }

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={CloseImg} alt="Close modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Documento do destinatario"
          value={document}
          onChange={event => setDocument(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />
        <TransactionsTypeContainer>
          <ButtonTypeTransaction
            type="button"
            onClick={() => setType('DEPOSIT')}
            isActive={type === 'DEPOSIT'}
          >
            <img src={IncomeImg} alt="Income" />
            <span>Entrada</span>
          </ButtonTypeTransaction>
          <ButtonTypeTransaction
            type="button"
            onClick={() => setType('TRANSFER')}
            isActive={type === 'TRANSFER'}
          >
            <img src={OutcomeImg} alt="Outcome" />
            <span>Saída</span>
          </ButtonTypeTransaction>
        </TransactionsTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}
