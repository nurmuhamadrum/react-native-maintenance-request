import {makeObservable, observable, action} from 'mobx';
import {MaintenanceRequest} from '@/modules/home/Types';
class HomeStore {
  maintenanceData: MaintenanceRequest[] = []; // Add an observable array

  constructor() {
    makeObservable(this, {
      maintenanceData: observable, // Make the array observable
      setMaintenanceData: action, // Add an action to update data
    });
  }

  setMaintenanceData = (data: MaintenanceRequest[]) => {
    this.maintenanceData = data; // Update observable array
  };
}

const homeStore = new HomeStore();
export default homeStore;
