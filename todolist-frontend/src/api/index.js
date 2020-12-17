import axios from 'axios';
import normalizeUrl from 'normalize-url';

// Please set the baseurl to your lambda function here:
// e.g.: https://a12345678b.execute-api.us-east-1.amazonaws.com/dev
const baseurl = '';

if (!baseurl) {
  throw new Error('Please define a baseurl for your Lambda functions!');
}

const normalizedUrl = normalizeUrl(baseurl);

export default {
  async getItems(id) {
    const rurl = id ? `${normalizedUrl}/todolist/${id}` : `${baseurl}/todolist`;
    const response = await axios.get(rurl);
    return response.data;
  },

  async createItem(item) {
    const rurl = `${normalizedUrl}/todolist`;
    const response = await axios.post(rurl, { item, completed: false });
    return response.data;
  },

  async updateItem(id, item, completed) {
    const rurl = `${normalizedUrl}/todolist/${id}`;
    const response = await axios.put(rurl, { item, completed });
    return response.data;
  },

  async deleteItem(id) {
    const rurl = `${normalizedUrl}/todolist/${id}`;
    const response = await axios.delete(rurl);
    return response.data;
  }
};
