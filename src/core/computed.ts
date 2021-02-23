import { ObservableCollection } from "./collection";
import { derivationMap } from "./derivation";
import { Reaction } from "./reaction";

let cnt = 0;

function getId() {
    return `computed-id-${cnt++}`;
}

// const cache: Map<string, any> = new Map();

export class ComputedValue<T> {
    private cacheValue: T;
    public nodeId: string;
    public links: string[];
    constructor (expression: () => T) {
        const computedId = getId();
        this.nodeId = computedId;
        const reaction = new Reaction(() => {
            const newResult = expression();
            // console.log('update cache', this.nodeId);
            this.cacheValue = newResult;
            this.notify();
        });
        const oc = new ObservableCollection();
        // 讨论, oc.clear()是否要在track里实现
        oc.clear();
        this.cacheValue = reaction.track(expression);
        const collection = oc.getCollection();
        this.links = collection;      
    }

    public get value () {
        const oc = new ObservableCollection();
        if (oc.isCollecting()) {
            const _key = this.nodeId;
            oc.collect(_key)
        }
        return this.cacheValue;
    }

    public notify () {
        const nodeId = this.nodeId;
        if (derivationMap.has(nodeId)) {
            const runners = derivationMap.get(nodeId);
            runners!.forEach(runner => runner());
        }
    }
}

// export function computed

// export function computed<T = any>(expression: () => T): () => T {
//     const computedId = getId();

//     const reaction = new Reaction(() => {
//         const newResult = expression();
//         console.log('update cache')
//         cache.set(computedId, newResult);
//     });

//     const initResult = reaction.track(expression);
//     cache.set(computedId, initResult);

//     const cacheExpression = function () {
//         return cache.get(computedId);
//     };
//     return cacheExpression;
// }