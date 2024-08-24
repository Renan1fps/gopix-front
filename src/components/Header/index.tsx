import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/logo.svg'
import { Container, Content} from './style'

interface HeaderProps{
 onOpenNewTransactionModal: ()=> void
}

export function Header({onOpenNewTransactionModal}: HeaderProps){
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
 
  return(
    <Container>
      <Content>
      <img src={LogoImg} alt="dt money"/>
      <button type="button" onClick={onOpenNewTransactionModal}>
        Nova transação
      </button>
      <button type="button" onClick={logout}>
        Sair
      </button>
      </Content>
      
    </Container>
  )
}