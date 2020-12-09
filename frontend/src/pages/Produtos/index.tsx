import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { Container, Content, Title, Next, Produto } from './styles';

interface Produto {
  id: string;
  nome: string;
  tipo: string;
}

const Produtos: React.FC = () => {
  const history = useHistory();
  const [produto, setProduto] = useState<Produto[]>();

  useEffect(() => {
    api.get(`/produtos`).then((response) => {
      setProduto(response.data);
    });
  }, [produto]);

  return (
    <>
      <Container>
        <Content>
          <div>
            <Title>Produtos Cadastrados</Title>
            <p>Este são os produtos que se encontram no sistema</p>
          </div>

          {produto
            ? produto.map((produt) => (
                <Produto>
                  <div>
                    <h1>{produt.nome}</h1>
                    <h1>{produt.tipo}</h1>

                    <div>
                      <button
                        onClick={() => {
                          history.push(`/produto/${produt.id}`);
                        }}
                      >
                        Detalhes
                      </button>
                      <button
                        onClick={() => {
                          api.delete(`/produtos/${produt.id}`);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </Produto>
              ))
            : ''}

          <Next>
            <Link to="/">Inicio</Link>
            <Link to="/Cadastrar">Cadastrar novos produtos</Link>
          </Next>
        </Content>
      </Container>
    </>
  );
};

export default Produtos;
