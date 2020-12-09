import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Title, Next } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Container>
        <Content>
          <div>
            <Title>Sistema de Produtos</Title>
            <p>Cadastre seus produtos conosco.</p>
          </div>

          <Next>
            <Link to="/produtos">Produtos Cadastrados</Link>
            <Link to="/cadastrar">Cadastrar Produto</Link>
          </Next>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
