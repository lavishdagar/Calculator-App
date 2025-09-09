function decode(message, shift) {
    message = message.split("").map(ch => {
        if (ch.charCodeAt(0) > 96 && ch.charCodeAt(0) < 123 && ch.charCodeAt(0) + shift > 122) {
            return String.fromCharCode(((ch.charCodeAt(0) + shift) % 122) + 97);
        } else if (ch.charCodeAt(0) > 66 && ch.charCodeAt(0) < 91 && ch.charCodeAt(0) + shift > 90) {
            return String.fromCharCode(((ch.charCodeAt(0) + shift) % 91) + 66);
        } else
            return String.fromCharCode(ch.charCodeAt(0) + shift);
    }).join("");

    return message;
}
console.log(decode("Xlmw mw e wigvix qiwweki.", 4));