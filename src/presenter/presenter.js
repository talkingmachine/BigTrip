import {render} from '../render.js';
import EventView from '../view/event.js';
import PointView from '../view/point/point.js';

export default class BoardPresenter {


  constructor({mainElement}) {
    this.mainElement = mainElement;
  }

  init() {
    const siteTripEventsElement = this.mainElement.querySelector('.trip-events__list');

    render(new PointView(), siteTripEventsElement);
    for (let i = 0; i < 3; i++) {
      render(new EventView(), siteTripEventsElement);
    }

  }
}
