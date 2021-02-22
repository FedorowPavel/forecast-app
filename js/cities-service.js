import requestService from "./request-service.js";

class CitiesService {
  constructor(requestService) {
    this.requestService = requestService;
  }

  async getCities() {
    const cities = await this.requestService.get('../json/cities.json');

    return cities;
  }
}

const citiesService = new CitiesService(requestService);

export default citiesService;