import { autorun, observable } from '../index';

test('multi', () => {
    const apple = observable({
        type: 'apple',
        price: 2,
        amount: 0,
    });

    const costAns: number[] = [];
    const nameAns: string[] = [];
    const priceAns: number[] = [];
    const amountAns: number[] = [];
    autorun(() => {
        console.log('price', apple.price)
        priceAns.push(apple.price)
    })

    autorun(() => {
        console.log('amount', apple.amount)
        amountAns.push(apple.amount);
    })

    autorun(() => {
        console.log(apple.price * apple.amount);
        costAns.push(apple.price * apple.amount);
    });

    autorun(() => {
        console.log('fruit type is ', apple.type)
        nameAns.push(apple.type)
    })

    apple.amount++; // ans == 2 * 1 == 2

    apple.price++; // ans == 3 * 1 == 3

    apple.amount = 20; // ans == 3 * 20 == 60

    apple.type = 'banana';
    expect(costAns.length).toBe(4);
    // autoRun第一次默认执行，所以长度是4不是3
    expect(costAns).toEqual([0,  2, 3, 60]);

    expect(priceAns.length).toBe(2);
    expect(priceAns).toEqual([2, 3])

    expect(amountAns.length).toBe(3)
    expect(amountAns).toEqual([0, 1, 20])

    expect(nameAns.length).toBe(2)
})