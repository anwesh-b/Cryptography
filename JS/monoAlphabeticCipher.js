const codes = {
    a: 's',
    b: 'g',
    c: 'e',
    d: 'r',
    e: 'x',
    f: 'f',
    g: 'q',
    h: 'y',
    i: 'b',
    j: 'p',
    k: 't',
    l: 'h',
    m: 'a',
    n: 'o',
    o: 'i',
    p: 'j',
    q: 'd',
    r: 'c',
    s: 'u',
    t: 'k',
    u: 'w',
    v: 'n',
    w: 'z',
    x: 'v',
    y: 'l',
    z: 'm',
    A: 'T',
    B: 'C',
    C: 'O',
    D: 'V',
    E: 'B',
    F: 'Y',
    G: 'N',
    H: 'J',
    I: 'A',
    J: 'U',
    K: 'H',
    L: 'D',
    M: 'P',
    N: 'I',
    O: 'W',
    P: 'G',
    Q: 'M',
    R: 'Q',
    S: 'K',
    T: 'Z',
    U: 'X',
    V: 'R',
    W: 'E',
    X: 'S',
    Y: 'L',
    Z: 'F',
}

const text = process.argv[2] || "My code here";

 
const algorithms = [
    encryptText,
    decryptText
]

function encryptText(text){
    return codes[text];
}

function decryptText(text){
    return Object.keys(codes).find(pos=>codes[pos]==text);
}

function algorithmHandle(text, method){
    return !codes[text] ? text :  method === "encryption" ? algorithms[0](text) : algorithms[1](text);
}

function monoalphabeticCipher(text,method){
    const asciiValues = [];
    for(let i=0; i<text.length; i++){
        const encodedChar = algorithmHandle(text[i], method);
        asciiValues.push(encodedChar);
    }

    return asciiValues.join("");
}


const encryptedText = monoalphabeticCipher(text,"encryption");
console.log(`Encrypted text: ${encryptedText}`);
const decryptedText = monoalphabeticCipher(encryptedText,"decryption");
console.log(`Decrypted text: ${decryptedText}`);
