
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
//1. Creatation Observable

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
import { throwError, concat } from 'rxjs';
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
