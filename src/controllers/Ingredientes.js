import * as Yup from 'yup';
import IngredientesModel from '../models/Ingredientes';

class Ingredientes {
  async adicionar(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .max(100)
        .required('Nome do ingrediente é obrigatório.'),
      tipo: Yup.mixed()
        .oneOf(['salada', 'principal', 'acompanhamento', 'sobremesa'])
        .required('Tipo de ingrediente inválido.'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { nome, tipo } = req.body;

    try {
      await IngredientesModel.insert(['*'], { nome, tipo });
      return res.status(200).json({
        message: 'Ingrediente adicionado com sucesso.',
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Falha ao adicionar ingrediente.', error: e });
    }
  }

  async recuperar(_, res) {
    try {
      return res.status(200).json(await IngredientesModel.getAll());
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Falha ao recuperar ingrediente.', error: e });
    }
  }

  async alterar(req, res) {
    const schema = Yup.object().shape({
      nome_antigo: Yup.string()
        .max(100)
        .required('Nome do ingrediente a ser alterado é obrigatório.'),
      nome: Yup.string()
        .max(100)
        .required('Novo nome do ingrediente é obrigatório.'),
      tipo: Yup.mixed()
        .oneOf(['salada', 'principal', 'acompanhamento', 'sobremesa'])
        .required('Tipo de ingrediente inválido.'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { nome_antigo, nome, tipo } = req.body;

    try {
      await IngredientesModel.update(
        ['*'],
        { nome: nome_antigo },
        { nome, tipo }
      );
      return res.status(200).json({
        message: 'Ingrediente atualizado com sucesso.',
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Falha ao atualizar ingrediente.', error: e });
    }
  }

  async remover(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .max(100)
        .required('Nome do ingrediente é obrigatório.'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { nome } = req.body;

    try {
      await IngredientesModel.delete(['*'], { nome });
      return res.status(200).json({
        message: 'Ingrediente removido com sucesso.',
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Falha ao remover ingrediente.', error: e });
    }
  }
}

export default new Ingredientes();
