import { ObservableCollection } from './collection';
import { derivationMap } from './derivation';
let cnt = 0;

function getId () {
    return `ob-id-${cnt++}`;
}

export function observable <T extends object>(targetObj: T): T {
    const obId = getId();
    return new Proxy<T>(targetObj, {
        get (target, propKey) {
            // TODO: 必须在autoRun的环境下才收集依赖
            const oc = new ObservableCollection();
            const collection = oc.getCollection();
            collection.push(target);
            return target[propKey as keyof T];
        },
        set (target, propKey, value) {
            if (propKey in target) {
                if (target[propKey as keyof T] !== value) {
                    target[propKey as keyof T] = value;
                        if (derivationMap.has(target)) {
                        const runner = derivationMap.get(target)!;
                        runner();
                    }
                }
                return true;
            }
            return false;
        }
    })
}
