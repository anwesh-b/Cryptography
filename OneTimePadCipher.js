const originalText = process.argv[2]?.toUpperCase() || 'hello okay'.toUpperCase() ;
const UPPER_BOUND = 'Z'.charCodeAt();
const LOWER_BOUND = 'A'.charCodeAt();
const cryptoMethods = {
    encode: encryption,
    decode: decryption
}

function keyGenerator(length){
    const keyAscii = [...Array(length)].map(e=>Math.random()*25+LOWER_BOUND);
       
    return String.fromCharCode(...keyAscii);
}

function encryption(text, key){
    const textPos = text.charCodeAt();
    const keyPos = key.charCodeAt();

    return (textPos >= LOWER_BOUND && textPos <= UPPER_BOUND) ? ((textPos - LOWER_BOUND + keyPos - LOWER_BOUND + 25)%25)+LOWER_BOUND : textPos;
}

function decryption(text, key){
    const textPos = text.charCodeAt();
    const keyPos = key.charCodeAt();

    return (textPos >= LOWER_BOUND && textPos <= UPPER_BOUND) ? ((textPos - LOWER_BOUND - keyPos + LOWER_BOUND + 25)%25)+LOWER_BOUND : textPos;
}

function oneTimePadCipher(text, key, method){
    const finalTextAscii = [];
    for(let i=0; i<text.length; i++){
        finalTextAscii.push(cryptoMethods[method](text[i], key[i]));
    }

    return String.fromCharCode(...finalTextAscii);
}

function main(){
    const key = keyGenerator(originalText.length);
    console.log(`The key generated is: ${key}`);

    const encodedText = oneTimePadCipher(originalText, key, 'encode');
    console.log(`The encoded text is: ${encodedText}`);

    const decodedText = oneTimePadCipher(encodedText, key, 'decode');
    console.log(`The decoded text is: ${decodedText}`);
}

main();
