import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Produtos from '../models/Produtos';
import uploadConfig from '../../config/upload';

interface Update {
  id: string;
  nome?: string;
  tipo?: string;
  unidade_medida?: string;
  armazem_padrao?: string;
  foto?: string;
}

interface Request {
  nome: string;
  tipo: string;
  unidade_medida: string;
  armazem_padrao: string;
  foto: string;
}

class ProdutosController {
  public async store({
    nome,
    tipo,
    unidade_medida,
    armazem_padrao,
    foto,
  }: Request): Promise<Produtos> {
    const ProdutosRepository = getRepository(Produtos);

    const CheckNome = await ProdutosRepository.findOne({
      where: { nome },
    });

    if (CheckNome) {
      throw new Error('Produto já cadastrado');
    }

    const produto = ProdutosRepository.create({
      nome,
      tipo,
      unidade_medida,
      armazem_padrao,
      foto,
    });

    await ProdutosRepository.save(produto);
    return produto;
  }

  public async update({
    id,
    nome,
    tipo,
    unidade_medida,
    armazem_padrao,
    foto,
  }: Update): Promise<Produtos> {
    const ProdutosRepository = getRepository(Produtos);

    const produto = await ProdutosRepository.findOne(id);

    if (!produto) {
      throw new Error('Funcionario não encontrado');
    }
    if (produto.foto) {
      const FotoFilePath = path.join(uploadConfig.directory, produto.foto);
      const FotoFileExists = await fs.promises.stat(FotoFilePath);
      if (FotoFileExists) {
        await fs.promises.unlink(FotoFilePath);
      }
    }

    if (nome) {
      produto.nome = nome;
    }
    if (tipo) {
      produto.tipo = tipo;
    }
    if (unidade_medida) {
      produto.unidade_medida = unidade_medida;
    }
    if (armazem_padrao) {
      produto.armazem_padrao = armazem_padrao;
    }
    if (foto) {
      produto.foto = foto;
    }

    await ProdutosRepository.save(produto);
    return produto;
  }
}

export default ProdutosController;
