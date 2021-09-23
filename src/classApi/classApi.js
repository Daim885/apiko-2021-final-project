class Api {
  constructor() {
    this.url = "https://apiko-2021-spring-course-api.herokuapp.com";
    this.headers = {
      accept: "application/json",
      "Content-type": "application/json",
    };
    this.getCountries = this.getCountries.bind(this);
  }

  register = async (user) => {
    const { fullName, email, password, phone } = user;
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
      }),
    });
    return response;
  };

  logIn = async (user) => {
    const { email, password } = user;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return response;
  };

  logOut = () => {
    this.headers.Authorization = null;
  };

  fetchUserData = async (token) => {
    if (!!token) this.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await fetch("/api/account", {
        method: "GET",
        headers: this.headers,
      });
      return await response.json();
    } catch (e) {
      console.log(`Error in fetchUserData: ${e}`);
    }
  };

  fetchProductsByUrl = async (url) => {
    let fetchUrl;
    if (url.startsWith("/favorites")) fetchUrl = `/api/products${url}`;
    else fetchUrl = `/api${url}`;
    const headers = {
      method: "GET",
      headers: this.headers,
    };
    const response = await fetch(fetchUrl, headers);
    const data = response.json();
    return data;
  };

  fetchCategories = async () => {
    const fetchUrl = "/api/categories";
    const headers = {
      method: "GET",
      headers: this.headers,
    };
    const response = await fetch(fetchUrl, headers);
    const data = response.json();
    return data;
  };

  addProductToFavorite = async (id) => {
    try {
      await fetch(`/api/products/${id}/favorite`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          id: id,
        }),
      });
    } catch (e) {
      console.log(`Error in addProductToFavorite: ${e}`);
    }
  };

  removeProductFromFavorite = async (id) => {
    try {
      await fetch(`/api/products/${id}/favorite`, {
        method: "DELETE",
        headers: this.headers,
        body: JSON.stringify({
          id: id,
        }),
      });
    } catch (e) {
      console.log(`Error in removeProductFromFavorite: ${e}`);
    }
  };

  async getCountries() {
    try {
      const response = await fetch("/api/locations/countries", {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok)
        throw new Error(`Failed with status code: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(`Error in getCountries: ${e}`);
    }
  }

  async createOrder(orderData) {
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(orderData),
      });
    } catch (e) {
      console.log(`Error in createOrder: ${e}`);
    }
  }
  async changeAccountData(data) {
    const response = await fetch("/api/account", {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response;
  }

  async changeAccountPassword(data) {
    const response = await fetch("/api/account/password", {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response;
  }
}

export default new Api();
