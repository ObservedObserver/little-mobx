# little-mobx

目前 这是一个mobx实现原理的学习repo，尝试实现一个简易的mobx，理解其基本设计。梳理一些总结与思考。


## 使用
```ts
import { autorun, observable } from 'little-mobx';

const apple = observable({
        type: "apple",
        price: 2,
        mount: 0,
    });

const ansCollection: number[] = [];

autorun(() => {
    console.log(apple.price * apple.mount);
    ansCollection.push(apple.price * apple.mount);
});

apple.mount++; // ans == 2 * 1 == 2

apple.mount++; // ans == 2 * 2 == 4

apple.mount = 20; // ans == 2 * 20 == 40

apple.type = "apple";
expect(ansCollection.length).toBe(4)
// autoRun第一次默认执行，所以长度是4不是3
expect(ansCollection).toEqual([0, 2, 4, 40]);
```