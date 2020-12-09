import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Title, Cadastro, InputFoto } from './styles';

const Cadastrar: React.FC = () => {
  const history = useHistory();

  const [nome, setNome] = useState('');
  const [armazem, setArmazem] = useState('');
  const [foto, setFoto] = useState<File>();

  const handleFoto = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];

      setFoto(selectedImage);
    }
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let selectTipo = document.getElementById('tipo') as HTMLSelectElement;
    const tipo = selectTipo?.options[selectTipo.selectedIndex].value;

    let selectUnidade = document.getElementById('unidade') as HTMLSelectElement;
    const unidade = selectUnidade?.options[selectUnidade.selectedIndex].value;

    const data = new FormData();

    if (foto && nome !== '' && tipo !== '' && unidade !== '' && armazem !== '') {
      data.append('nome', nome);
      data.append('tipo', tipo);
      data.append('unidade_medida', unidade);
      data.append('armazem_padrao', armazem);
      data.append('foto', foto);

      await api.post('produtos', data).then((response) => {
        if (response.data.error) {
          alert('Produto ja cadastrado.');
        } else {
          history.push('/Produtos');
          alert('Cadastro realizado com sucesso !');
        }
      });
    } else {
      alert('Preencha os dados corretamente !');
    }
  }

  return (
    <>
      <Container>
        <Content>
          <div>
            <Title>CADASTRO</Title>
            <p>preencha o formulario para cadastrar um novo produto.</p>
          </div>

          <Cadastro>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div>
                  <label htmlFor="nome">Nome:</label>
                  <input
                    id="nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="tipo">Tipo de Produto: </label>
                  <select id="tipo">
                    <option value=""></option>
                    <option value="Materia prima">Materia prima</option>
                    <option value="Produto acabado">Produto acabado</option>
                    <option value="Produto intermediario">
                      Produto intermediario
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="unidade">Unidade de Medida:</label>
                  <select id="unidade">
                    <option value=""></option>
                    <option value="Metro">Metro</option>
                    <option value="Peça">Peça</option>
                    <option value="Polegadas">Polegas</option>
                    <option value="Toneladas">Toneladas</option>
                    <option value="Unidades">Unidades</option>
                    <option value="Tambor">Tambor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="armazem">Armazem padrão:</label>
                  <input
                    id="armazem"
                    value={armazem}
                    onChange={(event) => setArmazem(event.target.value)}
                  />
                </div>

                <label htmlFor="foto">Foto:</label>
                <InputFoto>
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    onChange={handleFoto}
                  />
                </InputFoto>

                <button type="submit">Cadastrar</button>
              </fieldset>
            </form>
          </Cadastro>

          <Link to="/">Voltar</Link>
        </Content>
      </Container>
    </>
  );
};

export default Cadastrar;
