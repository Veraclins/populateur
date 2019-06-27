import response from '../helpers/response';
import { checkForRequiredFields, validateLocation } from '../helpers/validator';
import models from '../models';

const { Location } = models;

export default {
  create: async (req, res, next) => {
    const requiredFields = ['name', 'male', 'female'];
    const requiredFieldsErrors = checkForRequiredFields(
      req.body,
      requiredFields
    );
    if (requiredFieldsErrors) {
      return next(response.error.badInput(requiredFieldsErrors));
    }

    const invalidLocation = validateLocation(req.body);
    if (invalidLocation) {
      return next(response.error.badInput(invalidLocation));
    }

    const { body } = req;
    const { name } = body;
    const { parentId } = body;
    const male = Number(body.male);
    const female = Number(body.female);
    const total = male + female;
    try {
      const location = await Location.create({
        name,
        male,
        female,
        total,
        parentId,
      });

      return res
        .status(201)
        .json(response.success('location', 'created', location));
    } catch (error) {
      return next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const locations = await Location.findAll({
        attributes: ['id', 'name', 'male', 'female', 'total'],
      });
      if (!locations.length) {
        return next(response.error.empty('locations'));
      }

      return res
        .status(200)
        .json(response.success('locations', 'fetched', locations));
    } catch (error) {
      return next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;

    try {
      const location = await Location.findByPk(id);
      if (!location) {
        return next(response.error.notFound('location', 'id'));
      }
      const { body } = req;

      const invalidLocation = validateLocation(body);
      if (invalidLocation) {
        return next(response.error.badInput(invalidLocation));
      }
      const name = body.name || location.name;
      const male = Number(body.male) || location.male;
      const female = Number(body.female) || location.female;
      const total = male + female;
      const updated = await Location.update(
        {
          name,
          male,
          female,
          total,
        },
        { where: { id }, returning: true }
      );
      const data = updated[1][0];
      return res
        .status(200)
        .json(response.success('location', 'updated', data));
    } catch (error) {
      return next(error);
    }
  },

  getOne: async (req, res, next) => {
    const { id } = req.params;

    try {
      const location = await Location.findOne({
        where: { id },
        include: [
          {
            model: Location,
            as: 'subLocations',
            attributes: ['id', 'name', 'male', 'female', 'total'],
          },
        ],
      });
      if (!location) {
        return next(response.error.notFound('location', 'id'));
      }
      const { id: returnedId, total, subLocations, female, male } = location;
      let overallTotal = total;
      if (subLocations.length) {
        subLocations.forEach(innerLocation => {
          overallTotal += innerLocation.total;
        });
      }
      const data = {
        id: returnedId,
        overallTotal,
        total,
        female,
        male,
        subLocations,
      };
      return res
        .status(200)
        .json(response.success('location', 'fetched', data));
    } catch (error) {
      return next(error);
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const location = await Location.destroy({ where: { id } });
      if (!location) {
        return next(response.error.notFound('location', 'id'));
      }
      return res
        .status(200)
        .json(response.success('location', 'deleted', location));
    } catch (error) {
      return next(error);
    }
  },
};
