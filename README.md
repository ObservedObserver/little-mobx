# little-mobx :lollipop:

目前 这是一个mobx实现原理的学习repo，尝试实现一个简易的mobx，理解其基本设计。梳理一些总结与思考。

## 基本组成

### observable
负责把一个对象转化成`observable`，使用`proxy`劫持这个对象的`get`和`set`。
+ 在get触发时我们可以判断是否在`trackFunction`中，如果在，则收集对应的`observable`。
+ 在set触发时要根据此前收集依赖是构建的`derivationGraph`判断要更新哪些计算或者触发哪些函数。

### autorun
+ `autorun`用来接受一个函数，并能收集这个函数中使用到的observable，在这些observable的值发生变化时，能够自动触发autorun接受的函数去执行。
+`autorun`在第一次使用时会默认执行一次，通过第一次的执行来检查哪些observable的get被调用了，并记收集这些属性。

### ComputedValue (TODO:computed)
```ts
const computed = new ComputedValue(expression: () => any);
console.log(computed.value)
```
+ `ComputedValue`具备observable和autorun的性质
    + computed会在定义时进行一次初始计算，并把计算值缓存，同时收集它自己调用的observable或者computed。并把自己作为订阅交给这些依赖。使得这些依赖更新的时候会触发当前computed值的重新计算。
    + 当前的computed值更新后，会通知订阅当前computed的computed或者autorun更新。
```ts
const apple = observable({
    type: 'apple',
    price: 2,
    amount: 0,
});
let computedCount = 0;
const cost = new ComputedValue(() => {
    return apple.price * apple.amount;
});
const tooExpenssive = new ComputedValue(() => {
    return cost.value > 10;
})

autorun(() => {
    if (tooExpenssive.value) {
        console.log('too expenssive', tooExpenssive.value);
        computedCount++;
    }
})
for (let i = 0; i < 10; i++) {
    apple.amount++;
}
expect(computedCount).toBe(5)
```

### Reaction
+ `Reaction` 用来复杂依赖的收集，并构建一个计算关系推演图。这张图用于在这些observable变化时，触发相应的订阅行为。
+ `Reaction`创建时需要一个`subscription`参数，表示在依赖发生变化时，会自动触发执行的函数。
+ `Reaction.track(trackFunction)`中的`trackFunction`表示用于执行并收集依赖的函数。在`autorun`中，trackFunction和subscription是相同的。

#### trackFunction和subscription不同的情况
比如要设计一个连接little-mobx和react的`observer`。此时`trackFunction`是一个组件(里面调用了observable变量)，而`subscription`则是触发组件的渲染（可以实现一个`forceUpdate`）

### derivationGraph
一个关系图，节点由observable，subscription，（以及computed，TODO）构成。当一个节点的值发生变化时，可以查找出需要更新的节点。（还未完全实现TODO）



## 使用
一个例子:chestnut:
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