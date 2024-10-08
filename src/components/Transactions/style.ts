import styled from "styled-components";


export const Container = styled.div`
margin-top: 4rem;

table{
width: 100%;
border-spacing: 0 0.5rem; 

  th{
  text-align: left;
  color: var(--text-body);
  font-weight: 400;
  line-height: 1.5rem;
  padding: 1rem 2rem;
}
  td{
    padding: 1rem 2rem;
    border: 0;
    background-color: var(--shape);
    border-radius: 0.25rem;
    color: var(--text-body);
    &:first-child{
      color: var(--text-title);
    }
    &.DEPOSIT{
      color: var(--green)
    }
    &.TRANSFER{
      color: var(--red)
    }
}
}
`;