import * as Joi from '@hapi/joi';
export default {
  create: {
    payload: {
      text: Joi.string().required()
    },
  },
  updateById: {
    params: {
      id : Joi.required()
    },
    payload: {
      text: Joi.string().optional()
    },
  },
  getById: {
    params: {
      id: Joi.required(),
    },
  },
  deleteById: {
    params: {
      id: Joi.required(),
    }
  }
};
