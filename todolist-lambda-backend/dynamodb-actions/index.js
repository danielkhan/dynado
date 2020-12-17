// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const table = 'to-do-list-item';

AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getItems = async (id) => {
  const params = {
    TableName: table,
  };
  let method = 'scan';
  if (id) {
    params.Key = {
      id,
    };
    method = 'get';
  }
  return dynamoDB[method](params).promise();
};

const createItem = async (item, completed) => {
  const id = uuidv4();
  const params = {
    TableName: table,
    Item: {
      id,
      item,
      completed,
    },
  };
  await dynamoDB.put(params).promise();
  return getItems(id);
};

const updateItem = async (id, item, completed) => {
  const params = {
    TableName: table,
    Key: {
      id,
    },
    Item: {
      id,
      item,
      completed,
    },
  };
  await dynamoDB.put(params).promise();
  return getItems(id);
};

const deleteItem = async (id) => {
  const params = {
    TableName: table,
    Key: {
      id,
    },
  };
  return dynamoDB.delete(params).promise();
};

module.exports = {
  createItem,
  updateItem,
  deleteItem,
  getItems,
};
