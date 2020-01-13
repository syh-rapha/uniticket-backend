import * as Yup from 'yup';
import IngredientsModel from '../models/ingredients';

const ingredientTypes = [
  'salad',
  'main_course',
  'vegetarian',
  'side_dish',
  'dessert',
];
class Ingredients {
  async add(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .max(100)
        .required(),
      type: Yup.mixed()
        .oneOf(ingredientTypes)
        .required(`field 'type' must be one of ${ingredientTypes}`),
    });

    await schema.validate(req.body);
    const { name, type } = req.body;
    const ingredient = await IngredientsModel.insert(['*'], { name, type });

    return res.status(201).json(...ingredient);
  }

  async get(_, res) {
    const ingredients = await IngredientsModel.getAll();

    return res.status(200).json(ingredients);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      oldName: Yup.string()
        .max(100)
        .required(),
      newName: Yup.string()
        .max(100)
        .required(),
      newType: Yup.mixed()
        .oneOf(ingredientTypes)
        .required(`Ingredient new type must be one of ${ingredientTypes}`),
    });

    await schema.validate(req.body);
    const { oldName, newName, newType } = req.body;
    const ingredient = await IngredientsModel.update(
      ['*'],
      { name: oldName },
      { name: newName, type: newType }
    );

    return res.status(200).json(...ingredient);
  }

  async remove(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .max(100)
        .required('Ingredient name is required'),
    });

    await schema.validate(req.body);
    const { name } = req.body;
    await IngredientsModel.delete(['*'], { name });

    return res.sendStatus(204);
  }
}

export default new Ingredients();
