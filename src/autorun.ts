import { ObservableCollection } from './collection';
import { derivationMap } from './derivation';
import { IRunner } from './interfaces';

export function autorun(runner: IRunner): void {
    const oc = new ObservableCollection();
    oc.startCollect();
    runner();
    const collection = oc.getCollection();
    console.log('collection', collection)
    collection.forEach(ob => {
        // 每个ob调用set的时候都要能执行runner.
        if (!derivationMap.has(ob)) {
            derivationMap.set(ob, runner);
        }
    })
    oc.endCollect()
    oc.clear();
}