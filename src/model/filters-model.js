import { FilterTypes } from '../consts';
import Observable from '../framework/observable';
import { filterByEverythingEvents, filterByFutureEvents, filterByPastEvents, filterByPresentEvents } from '../utils/sort-filter-options';

class FiltersModel extends Observable{
  #filter = null;

  get filterCallback() {
    switch(this.#filter) {
      case 'future':
        return filterByFutureEvents;
      case 'present':
        return filterByPresentEvents;
      case 'past':
        return filterByPastEvents;
    }
    return filterByEverythingEvents;
  }

  get filter() {
    switch(this.#filter) {
      case 'future':
        return FilterTypes.Future;
      case 'present':
        return FilterTypes.Present;
      case 'past':
        return FilterTypes.Past;
    }
    return FilterTypes.Everything;
  }

  set filter(newFilter) {
    this.#filter = newFilter;
    this._notify();
  }
}

export {FiltersModel};
