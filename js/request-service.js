class RequestService {
  async get(url) {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw Error(response.status);
    }

    const json = await response.json();

    return json;
  }
}

const requestService = new RequestService();

export default requestService;