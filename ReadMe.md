'What is RxJS ? 
  => 관찰 가능한 시퀀스를 사용하여 비동기 및 이벤트 기반 프로그램을 컴파일 하기 위한 라이브러리

'Features of RxJS
  -. Observable : 관찰자를 생성하고 값이 예상되는 소스에 연결. (ex : click, dom요소의 마우스이벤트 또는 http요청)

  -. Observer : next(), error(), complete() 메서드가 있는 객체로 Observable과 상호작용할 때 호출. 

  -. Subscription : Observable이 생성되고, Observable을 실행해야할 때 subscribe가 필요하다. 또한 실행을 취소할 때도 사용된다. 

  -. Operators : Operators는 Observable을 입력으로 받아들이는 함수이다. 출력도 Observable이다.  

  -. Subject : 많은 Observer들과 대화할 수 있는 Observable이다. 

  -. Schedulars : Subscribe가 시작되고 알림을 받아야하는 시기의 실행을 제어한다. 

'When to use RxJS 
  => 비동기 작업이 많은 프로젝트. Angular 프로젝트에서는 기본으로 로드된다. 

'Advatanges of using RxJS 
  -. 다른 javascript 라이브러리 및 프레임워크와 함께 사용할 수 있다. javascript or typescript로 지원됨(Angular, ReactJS, VueJS, nodejs)
  -. 비동기 작업을 처리하기 아주 멋진 라이브러리이다. 비동기 데이터 호출, 콜백, 이벤트 기반 프로그램을 처리하는 반응형 프로그래밍 작업을 수행함.
  -. 많은 연산자(수학적인, 변환, 필터링, 유틸리티, 조건부, 오류처리, 조인 등)을 제공한다. 

'Disadvantages of using RxJS :( 
  -. 디버깅이 어려움
  -. Observable을 사용하면, observable로 모든 코드를 wrapping해야 함. 


'Install
  => npm init --save-dev rxjs 


'Observable Lists
  -. Creration 
  -. Mathmatical
  -. Join
  -. Transformation
  -. Filtering
  -. Utility
  -. Conditional
  -. Multicasting
  -. Error Handling

