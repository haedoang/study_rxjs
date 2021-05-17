
//tutorial
import { fromEvent, interval, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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

//import { fromEvent, interval } from 'rxjs';
//import { buffer } from 'rxjs/operators';

//let btn = document.getElementById('btnclick'); //btn element
//let btn_click = fromEvent(btn,'click'); //event Observable;
//let interval_events = interval(1000); //event interval Observable; 
//let buffered_array = interval_events.pipe(buffer(btn_click));
//buffered_array.subscribe(arr => console.log(arr));
//console.log('===========================================================');

//4) fromEventPattern(addHandler_func: Function) :Observable - 이벤트 핸들러를 등록하는데 사용되는 입력 함수에서 옵저버블을 생성함.
//import { fromEventPattern } from 'rxjs';

// function addBtnClickHandler(handler){
//     document.getElementById("btnclick")
//         .addEventListener("click", handler);
// }

// const button_click = fromEventPattern(addBtnClickHandler);
// button_click.subscribe(x=>console.log(
//     `clientX = ${x.clientX} and ClientY = ${x.clientY}`
// ));
//console.log('===========================================================');

//5) interval(time) : Observable - 매 시간을 생성하는 Observable
//import { take } from 'rxjs/operators'; //take(number) - number까지 count

//let test2 = interval(2000); //every 2 sec output Observable
//let case2 = test2.pipe(take(5)); 
//case2.subscribe(x=>console.log(x));
//console.log('===========================================================');

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
//let btn = document.getElementById("btnclick");

//let btn_clicks = fromEvent(btn, 'click');
//let interval_events = interval(1000);
//let buffered_array = interval_events.pipe(buffer(btn_clicks));
//buffered_array.subscribe(arr => console.log(arr));
//console.log('===========================================================');

//2) bufferCount(bufferSize: number, startBufferEvery: number = null): Observable 
//bufferSize 만큼 이벤트 발생 후 이벤트 배열이 배열에 수집됨, 
//startBufferEvery가없으면 값은 처음부터 계산된다.

//import { bufferCount } from 'rxjs/operators';

//let btn = document.getElementById("btnclick");
//let btn_clicks = fromEvent(btn, 'click');
//let buffered_array = btn_clicks.pipe(bufferCount(4)); //ex1)
//let buffered_array = btn_clicks.pipe(bufferCount(2,4)); //ex2) startBufferEvery : 2  2번 클릭할 때마다 4번 이클릭 이벤트 버퍼 수를 표시시 
//buffered_array.subscribe(arr => console.log(`buffercount result :  ${arr} `))
//console.log('===========================================================');

//3) bufferTime(bufferTimeSpan: number): Observable - bufferTime 만큼동안 발생한 Observable을 방출한다.(bufferCount랑 유사함)
import { bufferTime } from 'rxjs/operators';

//let btn = document.getElementById("btnclick");
//let btn_clicks = fromEvent(btn, 'click');
//let buffered_array = btn_clicks.pipe(bufferTime(4000)); //4초 
//buffered_array.subscribe(arr => console.log(`bufferTime result : ${arr}`));
//console.log('===========================================================');

//4) bufferToggle
import { bufferToggle } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

//bufferToggle(openings: SubscribableOrPromise, closingSelector: SubscribableOrPromise): Observable
// openings - 새 버퍼를 시작하는 약속 또는 알림, closedSelector - opening Observable에서 값을 취하고 
// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn, 'click');
// let start = interval(2000);
// let buffered_array = btn_clicks.pipe(
//     bufferToggle(start, a => a%2 == 0 ? interval(1000) : EMPTY)
// );
//buffered_array.subscribe(arr => console.log(arr));
//2초후에 시작 후 수신된 값이 짝수인 경우 1초간격으로 끝난다. 그렇지 않은경우 빈값 방출(EMPTY)
//console.log('===========================================================');

//5) bufferWhen(Closing_func: Observable): Observable - 배열형식으로 값을 제공하며 버퍼를 닫고 내보내고 재설정할 시기를 결정함.
// closing_func - 버퍼 종료를 나타내는 Observable을 반환 
import { bufferWhen } from 'rxjs/operators';

//let btn = document.getElementById("btnclick");
//let btn_clicks = fromEvent(btn,'click');
//let buffered_array = btn_clicks.pipe(bufferWhen(()=> interval(5000)));
//buffered_array.subscribe(arr => console.log(`bufferWhen result : ${arr}`));
//console.log('===========================================================');

//6) expand(recursive_func: Observable) : Observable
// 확장 연산자는 관찰 가능한 소스와 관찰 가능한 출력에 적용되는 인수로 함수를 받는다. 
// 소스에서 오는 모든 값에 함수가 적용되고 Observable을 반환한다. 
import { expand } from 'rxjs/operators';

//let buffered_array = of(2).pipe(expand(x => of(2 * x )));
//buffered_array.subscribe(arr => console.log(arr));
//console.log('===========================================================');

//7) groupBy(keySelector_func: (value: T) => K): GroupdObservables : 특정조건에 따라 그룹하되며 그룹항목은 groupedObservable로 내보내진다.
import { groupBy } from 'rxjs/operators';

const data = [
    { groupId : 'QA', value : 1},
    { groupId : 'Development', value : 3},
    { groupId : 'QA', value : 5},
    { groupId : 'Development', value : 6},
    { groupId : 'QA', value : 2}
];

from(data).pipe(
   groupBy(item => item.groupId)
).subscribe(x => console.log(x));
console.log('===========================================================');

//8) map(project_func: function): Observable 
// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn,"click");

// let postiions = btn_clicks.pipe(map(ev => ev));
//postiions.subscribe(x => console.log(`x: ${x.clientX} y: ${x.clientY}`));
//console.log('===========================================================');

//9) mapTo(value : any): Observable - Observable이 값을 내보낼때마다 Observable과 함께 상수 값이 출력으로 제공된다.
import { mapTo } from 'rxjs/operators';

//let btn = document.getElementById("btnclick");
//let btn_clicks = fromEvent(btn, 'click');
//let positions = btn_clicks.pipe(mapTo("Testing MapTo"));
//positions.subscribe(x=> console.log(x));
//console.log('===========================================================');

//10) mergeMap(project_func: function): Observable  - 프로젝트 함수가 각 소스 값에 적용되고
//                                                    그 출력이 Observable 출력과 병합된다. 
import { mergeMap } from 'rxjs/operators';

let text = of('Welcome To');
let case2 = text.pipe(mergeMap((value)=> of(value + ' Tutorialspoint!')));
case2.subscribe((value) => { console.log(value); });
console.log('===========================================================');

//11) switchMap(project_func: function): Observable 
import { switchMap } from 'rxjs/operators';
//프로젝트 함수가 각 소스 값에 적용되고 출력은 Observable 출력과 병합되며,
// 주어진 값은 가장 최근에 투영된 Observable이다.
// 진행중인 작업을 취소하는 경우 적합.. 이전의 Observable의 subscribe를 중단하고 시작한다. 
let text3 = of('!! welcome to');
let case3 = text3.pipe(switchMap((value) => of(value + ' Tutorialspoint!')));
case3.subscribe((value) => { console.log(value); });
console.log('===========================================================');

//12) window(windowBoundaries: Observable): Observable - windowboundaries를 취하고 주어진 windowboundaries가 방출될 때마다
// 중첩된 observable을 돌려준다. 
import { window } from 'rxjs/operators';

// let btnclick = fromEvent(document, 'click');
// let sec = interval(5000);
// let result2 = btnclick.pipe(window(sec));
//result2.subscribe(x=>console.log(x));
//console.log('===========================================================');

//4. Filtering Operators
//1) debounce(durationSelector: Observable or promise): Observable - 방출 지연시간 durationSelector 동안 기다렸다가 방출한다.
import { debounce } from 'rxjs/operators';
// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn, 'click');
// let case5 = btn_clicks.pipe(debounce(()=> interval(2000)));
// case5.subscribe(x => console.log(x));
//console.log('===========================================================');

//2) debounceTime(dueTime : number): Observable = 시간 범위 완료 후에만 Observable을 방출함( debounce랑 비슷 )

//let btn = document.getElementById("btnclick");
//let btn_clicks = fromEvent(btn, 'click');
//let case6 = btn_clicks.pipe(debounceTime(2000));
//case6.subscribe(x => console.log(x));
//console.log('===========================================================');

//3) distinct() - 
import { distinct } from 'rxjs/operators';

let all_numbers = of(1,6,15,1,10,6,40,10,58,20,40);
let distinct_result = all_numbers.pipe(distinct());
distinct_result.subscribe(x=> console.log(`distinct value are ${x}`));
console.log('===========================================================');

//4) elementAt(index: number) - 주어진 인덱스를 기반으로 한값과 함꼐 Observable 이 반환됨
// import { elementAt } from 'rxjs/operators';

// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn,'click');
// let case6 = btn_clicks.pipe(elementAt(4)); //5번의 이벤트 발생 시 방출된다.
// case6.subscribe(x => console.log(x));
// console.log('===========================================================');

//5) filter(predicate_func: function) : Observable - 

let num_ = of (1,6,5,10,9,20,40);
let even_list = num_.pipe(filter((a) => a %2 === 0));
even_list.subscribe( x=> console.log(`the filtered elements are ${x}`));
console.log('===========================================================');

//6) first/last 
import { first, last } from 'rxjs/operators';

let num_2 = of(99,1,2,3,9,777);
let num_2_result1 = num_2.pipe(first());
let num_2_result2 = num_2.pipe(last());

num_2_result1.subscribe(x=> console.log(`first result : ${x}`));
num_2_result2.subscribe(x=> console.log(`last result : ${x}`));
console.log('===========================================================');

//7) ignoreElements() : 소스의 Observable을 다 무시하고 완료 또는 오류 콜백만 호출한다.
import { ignoreElements } from 'rxjs/operators';

let num5 = of(1,6,5,10,9,20,40);
let ignore_val = num5.pipe(ignoreElements());
ignore_val.subscribe(
    x => console.log(`the last val is ${x}`), //안나옴;;
    e => console.log(`error : ${e}`),
    () => console.log(`the task is complete`)
);
console.log('===========================================================');

//8) sample() : 소스 Observable에서 가장 최근값을 제공한다. 
// import { interval } from 'rxjs';
// import { sample } from 'rxjs/operators'; 

// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn,'click');
// let case6 = btn_clicks.pipe(sample(interval(4000)));
// case6.subscribe(x => console.log(x));
//console.log('===========================================================');

//9) skip(count: number): Observable - count만큼 건너뛰고 Observable을 반환한다. 
//import { skip } from 'rxjs/operators'; 

// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn,'click');
// let case7 = btn_clicks.pipe(skip(2));
// case7.subscribe(x => console.log(x));
// console.log('===========================================================');


//10) throttle(durationSelector: Observable or Promise): Observable - Observable 을 방출 후 durationSelector 동안 방출된 값을 무시함
// import { throttle } from 'rxjs/operators'; 

// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn,'click');
// let case8 = btn_clicks.pipe(throttle(ev => interval(2000)));
// case8.subscribe(x=> console.log(x));
// console.log('===========================================================');

//5. Utility Operators
//1) tap(observer, error, complete)  

import { tap } from 'rxjs/operators';
let tap_list = of(1,2,3,4,5,6);
let tap_list_val = tap_list.pipe(
    tap( x => console.log(`from tap() = ${x}`), //observer
         e => console.error(e),                 //error
         () => console.log(`task complete!!`)   //complete
    ),
    filter(a => a % 2 === 0)
);
tap_list_val.subscribe(x => console.log(`only even numbers = ${x}`));
console.log('===========================================================');


//2) delay(timeout: number): Observable - 방출되는 값을 지연시킨다(timeout만큼) 
import { delay } from 'rxjs/operators';

// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn, "click");
// let case8 = btn_clicks.pipe(delay(2000));
// case8.subscribe(x=> console.log(`delay result : ${x}`))
// console.log('===========================================================');


//3) delayWhen(timeoutSelector_func: Observable): Observable - 방출되는 값을 지연시킴(timeoutSelector 만큼)
// import { delayWhen } from 'rxjs/operators';
// let btn = document.getElementById("btnclick");
// let btn_clicks = fromEvent(btn, 'click');
// let case9 = btn_clicks.pipe(delayWhen(()=> timer(1000)));
// case9.subscribe(x=>console.log(`delay when result : ${x}`));
//console.log('===========================================================');

//4) observeOn(schedular) : Observable - Observable에서 알림을 내보냄
import { observeOn } from 'rxjs/operators';
import { animationFrameScheduler }  from 'rxjs';
           
// let testDiv = document.getElementById("test");
// const intervals = interval(100);
// let case10 = intervals.pipe(
//     observeOn(animationFrameScheduler)
// );
// let sub1 = case10.subscribe(
//     val => {
//         console.log(val);
//         testDiv.style.height = val + 'px';
//         testDiv.style.width = val + 'px';
//     }
// );
//console.log('===========================================================');

//5) subscribeOn(schedular): Observable - 비동기 방출 
// import { asyncScheduler } from 'rxjs';
// import { subscribeOn } from 'rxjs/operators'; 

// let test5 = of(2,4,6,8).pipe(subscribeOn(asyncScheduler));
// let test6 = of(3,6,9,12,15)
// let sub1 = merge(test5,test6).subscribe(console.log);
// console.log('===========================================================');

//6) timeInterval(schedular): Observable - 방출 시 현재 및 이전값사이의 경과시간을 계산한다.
import { timeInterval } from 'rxjs/operators';

let list5 = of(2,3,4,5,6);
let list5_val = list5.pipe(timeInterval());
list5_val.subscribe(x => console.log(x));
console.log('===========================================================');

//7) timestamp() : 방출된 시간의 timestamp를 출력한다. 
import { timestamp } from 'rxjs/operators';

let list6 = of(2,3,4,5,6);
let list6_val = list6.pipe(timestamp());
list6_val.subscribe(x => console.log(x));
console.log('===========================================================');

//8) timeout(timeout: number | Date): Observable  - timeout 초과전까지 방출하며 초과할 경우 timeoutError exception을 발생시킴. 
import { timeout } from 'rxjs/operators';

let list7 = interval(1000);
let list7_val = list7.pipe(timeout(new Date("May 17, 2021 18:04:00")));
list7_val.subscribe(
    x => console.log(x),
    e => console.error(e),
    ()=> console.log('task complete')
);
console.log('===========================================================');

//9) toArray(): Observable 
import { toArray } from 'rxjs/operators';

let list8 = of(2,3,4,5,6);
let list8_val = list8.pipe(toArray());
list8_val.subscribe(arr => console.log(arr));
console.log('===========================================================');

//조건부연산자 gogo~