import { autorun, observable } from '../index';


test('basic', () => {
    const apple = observable({
        type: "apple",
        price: 2,
        amount: 0,
    });

    const ansCollection: number[] = [];

    autorun(() => {
        // console.log(apple.price * apple.amount);
        ansCollection.push(apple.price * apple.amount);
    });

    apple.amount++; // ans == 2 * 1 == 2

    apple.price++; // ans == 3 * 1 == 3

    apple.amount = 20; // ans == 3 * 20 == 60

    apple.type = "apple";
    expect(ansCollection.length).toBe(4)
    // autoRun第一次默认执行，所以长度是4不是3
    expect(ansCollection).toEqual([0, 2, 3, 60]);
})

test('autorun context', () => {
    const apple = observable({
        type: 'apple',
        price: 2,
        amount: 0,
    });

    const ans: number[] = [];

    // console.log(apple.amount * apple.price);

    autorun(() => {
        // console.log('only get price', apple.price);
        ans.push(apple.price)
    })
    // 不会被触发
    apple.amount++;
    // 会触发
    apple.price++;

    // 初始化触发一次 + 手动触发一次，共两次
    expect(ans.length).toBe(2)
})