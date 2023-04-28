import { createElement } from '../../../render';


function createDestinationPhotosTemplate() {
  return `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
    </div>
  </div>`;
}

export default class DestinationPhotosView {
  getTemplate() {
    return createDestinationPhotosTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
