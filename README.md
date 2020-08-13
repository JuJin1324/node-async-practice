# node-async-practice
## Promise
### 기존 callback 지옥 구현
callback 지옥을 위해 파라미터를 초(sec)로 받아서 대기 후 현재 시간을 로그로 출력하는 함수 delay 정의
```javascript
delay = function (sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
}
``` 

3개의 delay 함수 호출, 모두 1초 대기 후 로그 출력: delay 함수가 만약 동기함수 였다면 첫번째 delay 함수 호출 이후 두번째 delay 함수 -> 
세번째 delay 함수가 호출된다. 하지만 delay() 함수는 `setTimeout()` 함수로 인해서 비동기로 동작하는 함수이며 비동기 함수이므로 3개의 delay 함수 모두
동시에 로그를 출력한다. 
```javascript
// 로그 출력 이전에 다음 라인 실행
delay(1, (result) => {
    console.log(1, result);
});
// 로그 출력 이전에 다음 라인 실행
delay(1, (result) => {
    console.log(2, result);
});
// 로그 출력 이전에 다음 라인 실행
delay(1, (result) => {
    console.log(2, result);
});
// 1초 기다린 이후 동시 출력
```

본격적인 callback 지옥 예시: 처음 가정했던 동기적 실행 방식처럼 첫번째 함수 호출 후 1초뒤 2번째 함수 호출, 1초뒤 3번째 함수 호출로 처리하기 위한
가장 간단한 방법은 callback 안에 callback을 호출하는 것이다.
```javascript
// 함수 내부를 바로 실행하지 않고 다음 라인 실행
delay(1, (result) => {
    // 1초 뒤 로그 출력
    console.log(1, result);
    
    // 함수 내부를 바로 실행하지 않고 다음 라인 실행
    delay(1, (result) => {
        // 함수 내부를 바로 실행하지 않고 다음 라인 실행
        delay(1, (result) => {
            // 1초 뒤 로그 출력
            console.log(3, result);
        });
        // 1초 뒤 로그 출력
        /* 문제점!!! */
        console.log(2, result);
    });
});
```
위 예제에서 문제점은 2번째 delay 함수 이후 로그를 출력할 때 문제가 된다. delay 함수가 비동기이기 때문에 `console.log(2, result);` 부분을 
delay 함수의 위나 아래에 놓더라도 delay 함수보다 먼저 호출되어 어떤 함수가 먼저 실행되는지 알 수 없게 만들어버린다.
함수가 위에서 아래의 순서로 차례대로 호출되지 않으면 오해로 인한 에러 발생 여지가 충분히 생긴다.

### Promise 사용
Promise 객체를 리턴하는 delayP 함수 선언
```javascript
delayP = function (sec) {
    // 비동기 요청은 성공(resolve) 혹은 실패(reject)한다.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 비동기 작업의 성공시에 resolve(반환 값) 을 감싼다.
            resolve(new Date().toISOString());
        }, sec * 1000);
        // 실패시 reject(반환 값) 을 감싼다: 여기서는 실패할 것이 없어서 딱히 처리해주진 않았다.
    });
}
``` 

콜백 지옥에서 벗어나기
```javascript
// 대기 시간 1초를 파라미터로 넘긴 후 Promise.then() 함수를 이용하여 콜백함수 정의
delayP(1).then((result) => {
    console.log(1, result);
    // 로그 출력 이후 다음 Promise.then() 함수 호출을 위해서 Promise 호출    
    return delayP(1);
}).then((result) => {
    console.log(2, result);
    // 로그 출력 이후 다음 Promise.then() 함수 호출을 위해서 Promise 호출
    return delayP(1);
}).then((result) => {
    // 더이상 Promise.then() 호출이 없기 때문에 로그만 찍고 끝.    
    console.log(3, result);
})
```

## async & await
### function 과 async function 의 차이
* function : 동기 함수
* async function: 비동기 함수, return 시 Promise 객체로 리턴하는 값을 감싸서 리턴한다.
즉, async function 을 호출시 .then() 사용이 가능하다.

### await
await 키워드는 async function 내부에서 사용하며 글자 그대로 Promise를 리턴하는 비동기 함수에 대해서
비동기로 호출만하고 넘어가는 것이 아닌 함수 내부 실행이 완료될 때 까지 기다린다.   
이러면 동기 호출과 뭐가 다르냐고 하겠지만 await 함수 호출시에 다른 async 함수들과 동시 실행을 한다.   

먼저 기존 promise 학습시 사용했던 Promise 객체를 리턴하는 delayP 함수를 사용한다.
```javascript
delayP = function (sec) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}
```

Promise 객체가 await를 만나면 Promise가 감싼 값을 리턴한다.
```javascript

myAsync1 = async function() {
    // await delayP(1) 호출시 Promise 객체가 아닌 resolve() 안의 반환 값을 반환 한다.
    console.log(1, await delayP(1));
    console.log(1, await delayP(1));
    console.log(1, await delayP(1));
    return 'myAsync1'
}
myAsync1().then(result => {
    // nothing
});

myAsync2 = async function() {
    console.log(2, await delayP(1));
    console.log(2, await delayP(1));
    console.log(2, await delayP(1));
    return 'myAsync2'
}
myAsync2().then(result => {
    // nothing
});

myAsync3 = async function() {
    console.log(3, await delayP(1));
    console.log(3, await delayP(1));
    console.log(3, await delayP(1));
    return 'myAsync3'
}
myAsync3().then(result => {
    // nothing
});
```

## 참조사이트
* [자바스크립트 개념잡기: 콜백 함수의 동기적 실행과 비동기적 실행](https://www.youtube.com/watch?v=j0Viy3v97gY)
* [자바스크립트 promise? 나도 써보자, 기본 개념부터~](https://www.youtube.com/watch?v=CA5EDD4Hjz4)
* [자바스크립트 async / await? 나도 써보자, 기본 개념부터~](https://www.youtube.com/watch?v=JzXjB6L99N4)
* [봐도 봐도 헷갈리는 resolve, reject](https://velog.io/@rejoelve/%EB%B4%90%EB%8F%84-%EB%B4%90%EB%8F%84-%ED%97%B7%EA%B0%88%EB%A6%AC%EB%8A%94-resolve-reject)