import { ObservableCollection } from './collection';
import { derivationMap } from './derivation';
let cnt = 0;

const __INDEX_KEY__ = Symbol('little-mobx-id');

export function getObservableId<T extends object>(target: T) {
    return target[__INDEX_KEY__ as keyof T];
}

function getId () {
    return `ob-id-${cnt++}`;
}

export function observable <T extends object>(targetObj: T): T {
    const obId = getId();
    Object.defineProperty(targetObj, __INDEX_KEY__, {
        value: obId,
        writable: false
    })
    return new Proxy<T>(targetObj, {
        get (target, propKey) {
            const oc = new ObservableCollection();
            if (oc.isCollecting()) {
                const obkey = `${target[__INDEX_KEY__ as keyof T]}_${propKey.toString()}_${obId}`
                oc.collect(obkey)
            }
            return target[propKey as keyof T];
        },
        set (target, propKey, value) {
            if (propKey in target) {
                if (target[propKey as keyof T] !== value) {
                    target[propKey as keyof T] = value;
                    const obkey = `${target[__INDEX_KEY__ as keyof T]}_${propKey.toString()}_${obId}`
                        if (derivationMap.has(obkey)) {
                            const runners = derivationMap.get(obkey)!;
                            runners.forEach(runner => runner());
                        }
                }
                return true;
            }
            return false;
        }
    })
}
