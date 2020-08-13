delay = function (sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
}

delay(1, (result) => {
    console.log(1, result);

    delay(1, (result) => {
        delay(1, (result) => {
            console.log(3, result);
        });

        console.log(2, result);
    });
});