import {makeObservable, observable, action} from 'mobx';

class HomeStore {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
    });
  }

  increment = () => {
    this.count++;
  };

  decrement = () => {
    this.count--;
  };
}

const homeStore = new HomeStore();
export default homeStore;
