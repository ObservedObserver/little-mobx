

export class ObservableCollection {
    public static collection: any[];

    public getCollection () {
        if (!ObservableCollection.collection) {
          ObservableCollection.collection = [];
        }
        return ObservableCollection.collection;
    }
    public clear () {
        if (ObservableCollection.collection) {
            ObservableCollection.collection = [];
        }
    }
}