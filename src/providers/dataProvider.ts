import type { DataProvider } from "@refinedev/core";

// change this for both prod and dev. find a robust way to do this!
const API_URL = "http://localhost:8000";

const DUMMY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzc0NzYwLCJpYXQiOjE3MzAyMjI3NjAsImp0aSI6ImRmOTU5YzkxMWY3MTRkODNhMDc3ODQxMzhkMDYwYWVkIiwidXNlcl9pZCI6ImQyMWRmNzczLThhMzAtNGExOS04N2ZhLTVlNDQzMzE1MjBkNCJ9.eOE7GBQZFZX_YEOP1mQoPb3f2MuSKD5_Oc0JzbRi6FU"

export const dataProvider: DataProvider = {
  getOne: async ({resource, id}) => {
    if(resource === "couriers" || resource === "stores" || resource === "orders") {
      // have no idea why these requests are still being made
      // so i will just disable them manually......
      return { data: {}, total: 0 };
    }

    const response = await fetch(`${API_URL}/api/${resource}/${id}`, {
        headers: {
            // "Authorization": `Bearer ${DUMMY_TOKEN}`,
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();

    if (response.status < 200 || response.status > 299) throw response;

    return { data, total: data.length };
  },
  update: () => {
    throw new Error("Not implemented");
  },

  getList: async ({resource, pagination, filters, sorters, meta}) => {
    if(resource === "couriers" || resource === "stores" || resource === "orders") {
      // ..... same as here
      return { data: {}, total: 0 };
    }
    const response = await fetch(`${API_URL}/api/${resource}/`, {
        headers: {
            // "Authorization": `Bearer ${DUMMY_TOKEN}`,
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    // console.log("response: ", JSON.stringify(data, null, 2));

    if (response.status < 200 || response.status > 299) throw response;

    return { data, total: data.length };
  },

  create: () => {
    throw new Error("Not implemented");
  },
  deleteOne: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => API_URL,
  // Optional methods:

  getMany: () => {
    throw new Error("Not implemented");
  },

  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  custom: async ({url, method, }) => {
    const response = await fetch(url, {
        method,
        headers: {
            // "Authorization": `Bearer ${DUMMY_TOKEN}`,
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    // console.log("response: ", JSON.stringify(data, null, 2));

    if (response.status < 200 || response.status > 299) throw response;

    return { data, total: data.length };
  },
};
