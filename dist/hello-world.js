export var log = function (message) {
    if (message === "") {
        throw new Error("Message is empty");
    }
    if (message !== "HELLO WORLD") {
        throw new Error("Message different to Hello world or empty");
    }
    console.log("HELLO WORLD");
};
log("HELLO WORLD");
