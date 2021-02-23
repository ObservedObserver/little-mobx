import { autorun, observable, ComputedValue } from '../index';

// test('basic', () => {
//     const apple = observable({
//         type: 'apple',
//         price: 2,
//         amount: 0,
//     });
//     // 统计computed计算的次数（检查缓存是否工作）
//     let computedCount = 0;
//     let autorunCount = 0;

//     const cost = computed(() => {
//         computedCount++;
//         return apple.price * apple.amount;
//     });

//     const ansCollection: number[] = [];

//     autorun(() => {
//         autorunCount++;
//         console.log(apple.type, apple.price * apple.amount);
//     });

//     apple.amount++; // ans == 2 * 1 == 2
//     ansCollection.push(cost())

//     apple.price++; // ans == 3 * 1 == 3
//     ansCollection.push(cost());

//     apple.price++; // ans == 4 * 1 == 4
//     ansCollection.push(cost());

//     apple.amount = 20; // ans == 4 * 20 == 80
//     apple.amount = 20;
//     apple.amount = 20;
//     ansCollection.push(cost());

//     apple.type = 'orange';
//     apple.type = 'banana';
//     ansCollection.push(cost());
//     expect(ansCollection.length).toBe(5);
//     // autoRun第一次默认执行，所以长度是4不是3
//     expect(ansCollection).toEqual([2, 3, 4, 80, 80]);

//     expect(computedCount).toBe(4 + 1);
//     expect(autorunCount).toBe(6 + 1)
// });

test('computed as deps', () => {
    const apple = observable({
        type: 'apple',
        price: 2,
        amount: 0,
    });
    let computedCount = 0;

    const cost = new ComputedValue(() => {
        // computedCount++;
        return apple.price * apple.amount;
    });

    const tooExpenssive = new ComputedValue(() => {
        return cost.value > 10;
    })

    console.log(tooExpenssive, cost)

    autorun(() => {
        console.log(cost.value, apple.price)
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

    expect(computedCount).toBe(1)
})