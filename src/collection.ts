export class ObservableCollection {
    public static collection: Set<string> = new Set();
    public static inAutoRun: boolean = false;

    public startCollect(): void {
        ObservableCollection.inAutoRun = true;
    }
    public endCollect(): void {
        ObservableCollection.inAutoRun = false;
    }
    public isCollecting (): boolean {
        return ObservableCollection.inAutoRun;
    }

    public getCollection (): string[] {
        return [...ObservableCollection.collection];
    }
    public collect (value: string) {
        ObservableCollection.collection.add(value);
    }
    public clear (): void {
        ObservableCollection.collection = new Set();
    }
}