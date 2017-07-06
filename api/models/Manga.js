/**
 * Manga.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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

    name: {
      type: 'string',
      required: true,
      unique: true
    },

    path: {
      type: 'string',
      required: true,
      unique: true
    },

    lastPage: {
      type: 'string'
    },

    comments: {
      collection: 'comment',
      via: 'manga'
    }

  }
};
