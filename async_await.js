delayP = function (sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

myAsync1 = async function() {
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
