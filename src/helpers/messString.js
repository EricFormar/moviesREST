module.exports =  (text) => {

    let messyString = "";
    for (let i = 0; i < text.length; i++) {
        // Lee más sobre la elección del índice aleatorio en:
        // https://parzibyte.me/blog/2021/11/30/elemento-aleatorio-arreglo-javascript/
        messyString += text.charAt(Math.floor(Math.random() * text.length));
    }
    return messyString;
};