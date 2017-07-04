/**
 * Comment.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {

  schema: true,

  primaryKey: 'id',

  attributes: {

    id: {
      type: 'number',
      unique: true,
      autoIncrement: true
    },

    text: {
      type: 'string',
      required: true
    },

    path: {
      type: 'string',
      required: true
    },

    fileName: {
      type: 'string',
      required: true
    },

    manga: {
      model: 'manga',
      required: true
    }

  }


};
