import ApiService from '../framework/api-service';


const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {

  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptClientToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptClientToServer(point) {
    const serverPoint = {
      ...point,
      'base_price': Number(point.basePrice),
      'date_to': point.dateTo,
      'date_from': point.dateFrom,
      'is_favorite': point.isFavorite,
    };

    delete serverPoint.basePrice;
    delete serverPoint.dateFrom;
    delete serverPoint.dateTo;
    delete serverPoint.isFavorite;

    return serverPoint;
  }
}
