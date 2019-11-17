import * as Yup from 'yup';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import CardapioModel from '../models/Cardapio';

class Cardapio {
  async adicionar(req, res) {
    const schema = Yup.object().shape({
      fechado: Yup.boolean().required(),
      salada: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Salada é obrigatória.'),
          otherwise: Yup.string().notRequired(),
        }),
      principal: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Prato principal é obrigatório.'),
          otherwise: Yup.string().notRequired(),
        }),
      acompanhamento_1: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Acompanhamento 1 é obrigatório.'),
          otherwise: Yup.string().notRequired(),
        }),
      acompanhamento_2: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Acompanhamento 2 é obrigatório.'),
          otherwise: Yup.string().notRequired(),
        }),
      sobremesa: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Sobremesa é obrigatória.'),
          otherwise: Yup.string().notRequired(),
        }),
      dia: Yup.date().required(),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const {
      salada,
      principal,
      acompanhamento_1,
      acompanhamento_2,
      sobremesa,
      dia,
      fechado,
    } = req.body;

    try {
      await CardapioModel.insert(['*'], {
        salada,
        principal,
        acompanhamento_1,
        acompanhamento_2,
        sobremesa,
        dia,
        fechado,
      });
      return res.status(200).json({
        message: `Cardápio do dia ${dia} adicionado com sucesso.`,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Falha ao adicionar cardápio.', error: e });
    }
  }

  async recuperar(req, res) {
    const schema = Yup.object().shape({
      dia: Yup.date().required(),
    });

    try {
      await schema.validate(req.query);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { dia } = req.query;
    const comecoSemana = format(startOfWeek(new Date(dia)), 'yyyy-MM-dd');
    const fimSemana = format(endOfWeek(new Date(dia)), 'yyyy-MM-dd');

    try {
      return res
        .status(200)
        .json(await CardapioModel.getCardapioSemana(comecoSemana, fimSemana));
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Falha ao recuperar cardápio da semana.', error: e });
    }
  }

  async alterar(req, res) {
    const schema = Yup.object().shape({
      fechado: Yup.boolean().required(),
      dia: Yup.date().required(),
      salada: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Salada é obrigatória.'),
          otherwise: Yup.string().notRequired(),
        }),
      principal: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Prato principal é obrigatório.'),
          otherwise: Yup.string().notRequired(),
        }),
      acompanhamento_1: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Acompanhamento 1 é obrigatório.'),
          otherwise: Yup.string().notRequired(),
        }),
      acompanhamento_2: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Acompanhamento 2 é obrigatório.'),
          otherwise: Yup.string().notRequired(),
        }),
      sobremesa: Yup.string()
        .max(100)
        .when('fechado', {
          is: false,
          then: Yup.string().required('Sobremesa é obrigatória.'),
          otherwise: Yup.string().notRequired(),
        }),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const {
      salada,
      principal,
      acompanhamento_1,
      acompanhamento_2,
      sobremesa,
      dia,
      fechado,
    } = req.body;

    try {
      await CardapioModel.update(
        ['*'],
        { dia },
        {
          salada,
          principal,
          acompanhamento_1,
          acompanhamento_2,
          sobremesa,
          fechado,
        }
      );
      return res.status(200).json({
        message: `Cardápio do dia ${dia} atualizado com sucesso.`,
      });
    } catch (e) {
      return res.status(500).json({
        message: `Falha ao atualizar cardápio do dia ${dia}.`,
        error: e,
      });
    }
  }

  async remover(req, res) {
    const schema = Yup.object().shape({
      dia: Yup.date().required('Dia a ser removido é obrigatório.'),
    });

    try {
      await schema.validate(req.query);
    } catch (e) {
      return res.status(400).json({ error: e.errors });
    }

    const { dia } = req.query;

    try {
      await CardapioModel.delete(['*'], { dia });
      return res.status(200).json({
        message: `Cardápio do dia ${dia} removido com sucesso.`,
      });
    } catch (e) {
      return res.status(500).json({
        message: `Falha ao remover cardápio do dia ${dia}.`,
        error: e,
      });
    }
  }
}

export default new Cardapio();
