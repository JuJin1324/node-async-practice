const delayP = sec => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

const myAsync1 = async () => {
    console.log(1, await delayP(1));
    console.log(1, await delayP(1));
    console.log(1, await delayP(1));

    return 'myAsync1';
}
myAsync1().then(result => {
    // nothing
    console.log(result);
});

const myAsync2 = async () => {
    console.log(2, await delayP(1));
    console.log(2, await delayP(1));
    console.log(2, await delayP(1));
    return 'myAsync2'
}
myAsync2().then(result => {
    // nothing
    console.log(result);
});

const myAsync3 = async () => {
    console.log(3, await delayP(1));
    console.log(3, await delayP(1));
    console.log(3, await delayP(1));
    return 'myAsync3'
}
myAsync3().then(result => {
    // nothing
    console.log(result);
});
