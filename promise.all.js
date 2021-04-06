const delayP = (idx, sec) => {
    return new Promise((resolve, reject) => {
        console.log(`${idx}: ${sec}초 걸리는 작업 실행 시작`);
        setTimeout(() => {
            resolve({
                idx: idx,
                msg: `${idx}: 작업 종료`
            });
        }, sec * 1000);
    });
}

let promiseArr = [];
for (let i = 0; i < 10; i++) {
    promiseArr.push(delayP(i, 5));
}

async function main() {
    Promise.all(promiseArr)
        .then(resList => {
            console.log('작업 모두 종료:', resList);
        });
}

main();
