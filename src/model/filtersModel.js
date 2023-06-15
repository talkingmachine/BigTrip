import { FILTER_TYPES } from '../consts';
import Observable from '../framework/observable';
import { everythingEvents, futureEvents, pastEvents, presentEvents } from '../utils/sort-filter-options';

class FiltersModel extends Observable{
  #filter = null;

  get filterCallback() {
    switch(this.#filter) {
      case 'future':
        return futureEvents;
      case 'present':
        return presentEvents;
      case 'past':
        return pastEvents;
    }
    return everythingEvents;
  }

  get filter() {
    switch(this.#filter) {
      case 'future':
        return FILTER_TYPES.Future;
      case 'present':
        return FILTER_TYPES.Present;
      case 'past':
        return FILTER_TYPES.Past;
    }
    return FILTER_TYPES.Everything;
  }

  set filter(newFilter) {
    this.#filter = newFilter;
    this._notify();
  }
}

export {FiltersModel};
