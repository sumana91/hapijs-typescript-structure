import * as Joi from '@hapi/joi';

export default {
  validateEmail(email: string): any {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regexp.test(email)) {
      return true;
    }
    return false;
  },
  create: {
    payload: {
      first_name: Joi.string().required(),
      middle_name: Joi.string().required(),
      last_name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().required()
    },
  },
  updateById: {
    params: {
      id : Joi.required()
    },
    payload: {
      first_name: Joi.string().optional(),
      middle_name: Joi.string().optional(),
      last_name: Joi.string().optional(),
      role: Joi.string().optional()
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
