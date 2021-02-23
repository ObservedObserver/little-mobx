// 封装的有点啰嗦，俄日什么不直接export一个set直接使用呢，
// 这里的目的是要一个全局唯一的collection，
// 但有希望collection相关的操作是有含义的，而不是原生的数据结构的操作。
// 这个会在各个不同的地方被操作，所以希望能统一管理这些操作，也方便未来能捕获到对所有的collection的操作
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