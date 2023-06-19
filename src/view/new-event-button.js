
function createNewEventTemplate() {
  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
}

export default class NewEventView{
  constructor() {

  }

  get template() {
    return createNewEventTemplate();
  }
}
