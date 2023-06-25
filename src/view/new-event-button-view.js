import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createNewEventButtonTemplate({isButtonLocked}) {
  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isButtonLocked ? 'disabled' : ''}>New event</button>
  `;
}

export default class NewEventButtonView extends AbstractStatefulView{
  #onAddNewPoint = null;

  constructor({onAddNewPoint}) {
    super();
    this.#onAddNewPoint = onAddNewPoint;

    this._setState({
      isButtonLocked: true
    });
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#addNewPointHandler);
  }

  get template() {
    return createNewEventButtonTemplate(this._state);
  }

  lockNewEventButton = () => {
    if (!this._state.isButtonLocked) {
      this.updateElement({
        isButtonLocked: true
      });
    }
  };

  unlockNewEventButton = () => {
    if (this._state.isButtonLocked) {
      this.updateElement({
        isButtonLocked: false
      });
    }
  };

  #addNewPointHandler = () => {
    this.#onAddNewPoint();
    this.lockNewEventButton();
  };
}
