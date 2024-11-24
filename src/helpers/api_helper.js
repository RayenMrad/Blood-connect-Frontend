import axios from "axios";

export class APIClient {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:5000/api/",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get(url, config = {}) {
    return this.client.get(url, config);
  }

  post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.client.delete(url, config);
  }
}
