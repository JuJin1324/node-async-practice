const delayP = (idx, sec) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                idx: idx,
                date: new Date().toISOString(),
            });
        }, sec * 1000);
    });
}

let promiseArr = [];
for (let i = 0; i < 10; i++) {
    promiseArr.push(delayP(i, 1));
}

async function main() {
    for await (let promise of promiseArr) {
        let {idx, date} = promise;
        console.log(`${idx}: ${date}`);
    }
}

main().then();
