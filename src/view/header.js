import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';


function createHeaderTemplate(tripCities, tripDates, totalPrice) {
  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripCities}</h1>
      <p class="trip-info__dates">${tripDates}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
}

export default class HeaderView extends AbstractView{
  #points;
  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createHeaderTemplate(this.#getTripCities(), this.#getTripDates(), this.#getTotalPrice());
  }

  #getTripCities() {
    const cities = this.#points.map((point) => point.destination);
    if (cities.length <= 3) {
      return cities.join(' &mdash; ');
    } else {
      return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
    }
  }

  #getTripDates() {
    const firstPointDate = dayjs(this.#points[0].dateFrom);
    const lastPointDate = dayjs(this.#points[this.#points.length - 1].dateTo);
    if (firstPointDate.format('MMM') === lastPointDate.format('MMM')) {
      return `${firstPointDate.format('MMM D')}&nbsp;&mdash;&nbsp;${lastPointDate.format('D')}`;
    } else {
      return `${firstPointDate.format('MMM D')}&nbsp;&mdash;&nbsp;${lastPointDate.format('MMM D')}`;
    }
  }

  #getTotalPrice() {
    return this.#points.reduce((acc, point) => acc + point.basePrice, 0);
  }
}
