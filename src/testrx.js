
//tutorial
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

map(x => x * x)(of(1,2,3)).subscribe((v)=>console.log(`output is : ${v}`));
console.log('===========================================================');


//1. Observable : subscribe 시 실행된다. 
import { Observable } from 'rxjs';

var observable = new Observable(
    function subscribe(subscriber){
        subscriber.next('my first observable');
    }
);


observable.subscribe(x=>console.log(x));
console.log('===========================================================');

/**
 * observer : 1. next() - 숫자, 문자열, 객체 등과 같은 값을 보냄.
 *            2. error() - 오류가 있을 시 전송
 *            3. complete() - 어떠한 값도 보내지 않고,
 */

var observer = new Observable(
    function subscribe(subscriber){
        try {
            subscriber.next('!!my first observable');
            subscriber.next('!!testing observable');
            subscriber.complete();
        } catch(err) {
            subscriber.error(e);
        }
    }
)

observer.subscribe((x)=>console.log(x), (e) => console.log(e),()=>console.log('observable is complete'));
console.log('===========================================================');

//2. Operator : Obervable을 입력으로 받아들이는 순수 함수이며 출력도 Observable이다.
//              Operator 작업을 하려면 pipe메소드가 필요함!

//let obs = of(1,2,3);
// obs.pipe(
//     operator1(),
//     operator2(),
//     opertator3(),
// );

import { reduce, filter } from 'rxjs/operators';

let test1 = of(1,2,3,4,5,6,7,8,9,10);
let case1 = test1.pipe(
    filter(x => x %2 === 0), //even 
    reduce((acc, current)=> acc + current, 0)
);

case1.subscribe(x=>console.log(x));
console.log('===========================================================');

//Observable 
//1. Creatation Operators

//1) ajax - 주어진 url에 대해 ajax 요청을 한다.
import { ajax } from 'rxjs/ajax';

let ajaxObservable = ajax('https://jsonplaceholder.typicode.com/todos/1').pipe(map(e => e.response));
//ajaxObservable.subscribe(x=> console.log(x));
console.log('===========================================================');

//2) from - 배열, 배열 유사 객체, promise, iterable 객체, 또는 Observable 유사 객체에 Observable 객체를 생성한다. 

import { from } from 'rxjs';

let arr = [2,4,6,8,10];
let test = from(arr);
test.subscribe(x=>console.log(x));
console.log('===========================================================');

//3) fromEvent(target: eventtarget, eventName: string): Observable - 버튼, 클릭 같은 이벤트를 발생시키는 요소에 사용할 Observable을 출력한다.

import { fromEvent, interval } from 'rxjs';
import { buffer } from 'rxjs/operators';

//let btn = document.getElementById('btnclick'); //btn element
//let btn_click = fromEvent(btn,'click'); //event Observable;
//let interval_events = interval(1000); //event interval Observable; 
//let buffered_array = interval_events.pipe(buffer(btn_click));
//buffered_array.subscribe(arr => console.log(arr));
console.log('===========================================================');

//4) fromEventPattern(addHandler_func: Function) :Observable - 이벤트 핸들러를 등록하는데 사용되는 입력 함수에서 옵저버블을 생성함.
import { fromEventPattern } from 'rxjs';

// function addBtnClickHandler(handler){
//     document.getElementById("btnclick")
//         .addEventListener("click", handler);
// }

// const button_click = fromEventPattern(addBtnClickHandler);
// button_click.subscribe(x=>console.log(
//     `clientX = ${x.clientX} and ClientY = ${x.clientY}`
// ));
console.log('===========================================================');

//5) interval(time) : Observable - 매 시간을 생성하는 Observable

import { take } from 'rxjs/operators'; //take(number) - number까지 count

//let test2 = interval(2000); //every 2 sec output Observable
//let case2 = test2.pipe(take(5)); 
//case2.subscribe(x=>console.log(x));
console.log('===========================================================');

//6) of(input: array[]) : Observable - 전달된 인수를 가져와서 Observable으로 변환 

let ints = of(2,4,6,8,10,12);
ints.subscribe(x=>console.log(x));
console.log('===========================================================');

//7) range(start: number, count: number) : Observable - 숫자 범위 Observable으로 변환
import { range } from 'rxjs';

let ints2 = range(1,10);

ints2.subscribe(x=>console.log(x));

//8) throwError(error: any) : Observable - error Observable을 생성함.
import { throwError } from 'rxjs';
const result = throwError(new Error('error occurred'));
result.subscribe(x=>console.log(`success :${x}`), e=> console.error(e));
console.log('===========================================================');

//9) timer(dueTime: number | Date): Observable - dueTime후에 시작 args2 간격으로(miliseconds)
import { timer } from 'rxjs';

//let all_numbers = timer(1000,10);
//all_numbers.subscribe(x=>console.log('the number is : ', x));

//10) iif(condition: Function, true execute, false execute) : Observable - subscribe할 Observable을 결정한다.
import { iif } from 'rxjs';

let task1 = iif(
    () => (Math.random() + 1) % 2 === 0, //condition 
    of("Even Case"), //true execute
    of("Odd case") //false execute
);

task1.subscribe(x=>console.log(x));
console.log('===========================================================');


//2. Mathematical Operators
//1) Count - 관찰 가능한 Observable의 주어진 숫자의 개ㅔ수를 반환한다.
import { count } from 'rxjs/operators';

let all_nums = of(1,7,5,10,10,20);
let final_val = all_nums.pipe(count());
final_val.subscribe(x=>console.log(`the number count is ${x}`));

final_val = all_nums.pipe(count(a => a %2 ===0));
final_val.subscribe(x=>console.log(`the even number count is ${x}`));
console.log('===========================================================');

//2) Max(Comparer_func), Min  

import { max, min} from 'rxjs/operators';
let numbers = of(1,2,3,4,5,6,7,8,9,10);
let max_val = numbers.pipe(max());
let min_val = numbers.pipe(min());

max_val.subscribe(x=>console.log(`the max number is ${x}`));
min_val.subscribe(x=>console.log(`the min number is ${x}`));
 
let list = [1,3,55,7,9,11];
let fin_val = from(list).pipe(max());
fin_val.subscribe(x=>console.log(x));
console.log('===========================================================');

//3) reduce((acc, current) => acc+ current, acc초기값) : 누산기 
let items = [
    {item1 : 'A', price : 1000.00},
    {item2 : 'B', price : 850.00},
    {item3 : 'C', price : 200.00},
    {item2 : 'D', price : 150.00},
];

let items_val = from(items).pipe(reduce((acc, itemsdet)=> acc +itemsdet.price,0));
items_val.subscribe(x=>console.log(`items total value : ${x}`))
console.log('===========================================================');

//3. Join Operators 
//1) concat - 두개의 Observable을 하나로 합침 deprecate 됨 
import { concat } from 'rxjs/operators';

let list1 = of(2,3,4,5,6);
let list2 = of(4,9,16,25,36);
let result_concat = list1.pipe(concat(list2));
result_concat.subscribe(x=>console.log(`concat result : ${x}`));
console.log('===========================================================');

//2) forkJoin - Observable에서 마지막으로 방ㅊ풀된 값과 함께 반환한다. 
import { forkJoin } from 'rxjs';

let result_forkJoin = forkJoin([list1, list2]);
result_forkJoin.subscribe(x=>console.log(`forkJoin result : ${x}`));
console.log('===========================================================');

//3) merge(Observable: array[]) - Observable을 입력받고 Observable에서 모든 값을 방출하고 하나의 Observable을 출력한다.
import { merge } from 'rxjs';
let result_merge = merge(list1, list2);
result_merge.subscribe(x=>console.log(`merge result : ${x}`));
console.log('===========================================================');

//4) race(Observable: array[]) - 첫번째 파라미터의 Observable의 미러 복사본을 반환한다.
import { race } from 'rxjs';
let result_race = race(list1, list2);
result_race.subscribe(x=>console.log(`race result : ${x}`)); 
console.log('===========================================================');

//3. Transformation Operators 
//1) buffer(input_observable: Observable) : Observable 
// input_observable : 버퍼가 값을 방출하도록 만드는 Observable (ex) 버튼 클릭) 
// 관찰가능한 Observable이 방출할 때 동일한 값을 방출한다. 방출한 후 다시 원본을 버퍼링한다. (약간 어려움 이해하기.. ㅎㅎ)
// => 버퍼의 input_observable인 이벤트 Observable이 호출되는 경우 buffer는 관찰중인 Observable을 이 방출하는 값을 방출한다
let btn = document.getElementById("btnclick");

let btn_clicks = fromEvent(btn, 'click');
let interval_events = interval(1000);
let buffered_array = interval_events.pipe(buffer(btn_clicks));
buffered_array.subscribe(arr => console.log(arr));
console.log('===========================================================');

//2) bufferCount(bufferSize: number, startBufferEvery: number = null): Observable 

console.log('===========================================================');
console.log('===========================================================');
console.log('===========================================================');
console.log('===========================================================');
console.log('===========================================================');
