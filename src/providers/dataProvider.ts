import type { DataProvider } from "@refinedev/core";
import { TOKEN_KEY, API_URL } from "./authProvider";

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const dataProvider: DataProvider = {
  getOne: async ({resource, id}) => {
    if(resource === "couriers" || resource === "stores" || resource === "orders") {
      // have no idea why these requests are still being made
      // so i will just disable them manually......
      return { data: {}, total: 0 };
    }

    const response = await fetch(`${API_URL}/api/${resource}/${id}`, {
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status < 200 || response.status > 299) throw response;

    return { data, total: data.length };
  },

  update: () => {
    throw new Error("Not implemented");
  },

  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    if (resource === "couriers" || resource === "stores" || resource === "orders") {
      // ..... same as here
      return { data: {}, total: 0 };
    }

    const params = new URLSearchParams();
    if (pagination) {
      // @ts-ignore
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      // @ts-ignore
      params.append("_end", pagination.current * pagination.pageSize);
    }

    // if (sorters && sorters.length > 0) {
    //   params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
    //   params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    // }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(
      `${API_URL}/api/${resource}?${params.toString()}/`,
      {
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const {total, data} = await response.json();

    if (response.status < 200 || response.status > 299) throw response;

    return { data, total };
  },

  create: () => {
    throw new Error("Not implemented");
  },

  // @ts-ignore
  deleteOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/api/${resource}/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
      },
    });
    
    if (response.status < 200 || response.status > 299) throw response;
    
    return { data: id, total: 1 };
  },


  getApiUrl: () => API_URL,

  getMany: () => {
    throw new Error("Not implemented");
  },

  custom: async ({ url, method }) => {
    const response = await fetch(url, {
      method,
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status < 200 || response.status > 299) throw response;

    return { data, total: data.length };
  },
};
