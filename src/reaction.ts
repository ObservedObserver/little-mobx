import { ObservableCollection } from "./collection";
import { derivationMap } from "./derivation";

export class Reaction<S extends Function> {
    private subscription: S;
    constructor (subscription: S) {
        this.subscription = subscription;
    }
    public track<T extends Function>(trakFunction: T) {
        const subscription = this.subscription;
        const oc = new ObservableCollection();
        oc.startCollect();
        trakFunction();
        const collection = oc.getCollection();
        collection.forEach(ob => {
            if (!derivationMap.has(ob)) {
                derivationMap.set(ob, [])
            }
            derivationMap.get(ob)!.push(subscription);
        })
        console.log(derivationMap)
        oc.endCollect();
        oc.clear();
    }
}