import * as Yup from 'yup';
import { startOfWeek as sW, endOfWeek as eW, format } from 'date-fns';
import MenuModel from '../models/menu';

const defaultSchemaValidator = {
  closed: Yup.boolean().required(),
  salad: Yup.string()
    .max(100)
    .when('closed', {
      is: false,
      then: Yup.string().required(),
      otherwise: Yup.string().notRequired(),
    }),
  mainCourse: Yup.string()
    .max(100)
    .when('closed', {
      is: false,
      then: Yup.string().required(),
      otherwise: Yup.string().notRequired(),
    }),
  firstSideDish: Yup.string()
    .max(100)
    .when('closed', {
      is: false,
      then: Yup.string().required(),
      otherwise: Yup.string().notRequired(),
    }),
  secondSideDish: Yup.string()
    .max(100)
    .when('closed', {
      is: false,
      then: Yup.string().required(),
      otherwise: Yup.string().notRequired(),
    }),
  dessert: Yup.string()
    .max(100)
    .when('closed', {
      is: false,
      then: Yup.string().required(),
      otherwise: Yup.string().notRequired(),
    }),
  day: Yup.date().required(),
};

class Menu {
  async add(req, res) {
    const schema = Yup.object().shape(defaultSchemaValidator);

    await schema.validate(req.body);
    const {
      salad,
      mainCourse,
      firstSideDish,
      secondSideDish,
      dessert,
      day,
      closed,
    } = req.body;

    const menu = await MenuModel.insert(['*'], {
      salad,
      mainCourse,
      firstSideDish,
      secondSideDish,
      dessert,
      day,
      closed,
    });

    return res.status(201).json(...menu);
  }

  async get(req, res) {
    const schema = Yup.object().shape({
      day: Yup.date().required(),
    });

    await schema.validate(req.query);
    const { day } = req.query;

    const startOfWeek = format(sW(new Date(day)), 'yyyy-MM-dd');
    const endOfWeek = format(eW(new Date(day)), 'yyyy-MM-dd');
    const weekMenu = await MenuModel.getWeekMenu(startOfWeek, endOfWeek);

    return res.status(200).json(weekMenu);
  }

  async update(req, res) {
    const schema = Yup.object().shape(defaultSchemaValidator);

    await schema.validate(req.body);

    const {
      salad,
      mainCourse,
      firstSideDish,
      secondSideDish,
      dessert,
      day,
      closed,
    } = req.body;

    const menu = await MenuModel.update(
      ['*'],
      { day },
      {
        salad,
        mainCourse,
        firstSideDish,
        secondSideDish,
        dessert,
        day,
        closed,
      }
    );

    return res.status(200).json(...menu);
  }

  async remove(req, res) {
    const schema = Yup.object().shape({
      day: Yup.date().required(),
    });

    await schema.validate(req.query);
    const { day } = req.query;
    await MenuModel.delete(['*'], { day });

    return res.sendStatus(204);
  }
}

export default new Menu();
