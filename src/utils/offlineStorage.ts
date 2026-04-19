export interface Stop {
  id: string;
  location: string;
  [key: string]: unknown;
}

export interface StoredRoute {
  routeId: string;
  date: string;
  stops: Stop[];
  completedStops: number;
  startTime: string;
}

export interface PendingSync {
  id: string;
  type: 'collection' | 'issue' | 'photo';
  data: Record<string, unknown>;
  timestamp: string;
}

class OfflineStorage {
  private static instance: OfflineStorage;

  static getInstance() {
    if (!OfflineStorage.instance) {
      OfflineStorage.instance = new OfflineStorage();
    }
    return OfflineStorage.instance;
  }

  saveRoute(route: StoredRoute) {
    localStorage.setItem(`route_${route.routeId}`, JSON.stringify(route));
  }

  getRoute(routeId: string): StoredRoute | null {
    const data = localStorage.getItem(`route_${routeId}`);
    return data ? JSON.parse(data) : null;
  }

  saveCollection(stopId: number, data: Record<string, unknown>) {
    const collections = this.getCollections();
    collections[stopId] = { ...data, timestamp: new Date().toISOString() };
    localStorage.setItem('collections', JSON.stringify(collections));
  }

  getCollections() {
    const data = localStorage.getItem('collections');
    return data ? JSON.parse(data) : {};
  }

  addToSync(data: PendingSync) {
    const pending = this.getPendingSync();
    pending.push(data);
    localStorage.setItem('pendingSync', JSON.stringify(pending));
  }

  getPendingSync(): PendingSync[] {
    const data = localStorage.getItem('pendingSync');
    return data ? JSON.parse(data) : [];
  }

  removeFromSync(id: string) {
    const pending = this.getPendingSync().filter(item => item.id !== id);
    localStorage.setItem('pendingSync', JSON.stringify(pending));
  }

  clearSync() {
    localStorage.removeItem('pendingSync');
  }

  isOnline() {
    return navigator.onLine;
  }

  getOfflineStats() {
    return {
      pendingSync: this.getPendingSync().length,
      storedRoutes: localStorage.getItem('route_Route18') ? 1 : 0,
      collections: Object.keys(this.getCollections()).length,
    };
  }
}

export default OfflineStorage.getInstance();