import { ObservableCollection } from './collection';
import { derivationMap } from './derivation';
import { IRunner } from './interfaces';

export function autorun(runner: IRunner): void {
    const oc = new ObservableCollection();
    runner();
    const collection = oc.getCollection();
    collection.forEach(ob => {
        // 每个ob调用set的时候都要能执行runner.
        if (!derivationMap.has(ob)) {
            derivationMap.set(ob, runner);
        }
    })
    // console.log('collection', collection);
    // console.log('map', derivationMap)
}