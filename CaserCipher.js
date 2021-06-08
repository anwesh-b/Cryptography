const text = process.argv[2] || "My code here";
const cipherCode = 4;
const baseValues = {lowerCase: 'a'.charCodeAt(),upperCase: 'A'.charCodeAt() }
const limits = {
    lowerCase: {
        upper: 'z'.charCodeAt(),
        lower: 'a'.charCodeAt()
    },
    upperCase: {
        upper: 'Z'.charCodeAt(), 
        lower: 'A'.charCodeAt()
    }}

const algorithms = [
    encryptText,
    decryptText
]

function encryptText(asciiPos,baseCipher){
    return ((asciiPos-baseCipher+cipherCode+26)%26)+baseCipher;
}

function decryptText(asciiPos,baseCipher){
    return ((asciiPos-baseCipher-cipherCode+26)%26)+baseCipher;
}

function getBaseCipher(asciiPos){
    if (asciiPos <= limits.lowerCase.upper && asciiPos >= limits.lowerCase.lower)   return baseValues.lowerCase;
    else if (asciiPos <= limits.upperCase.upper && asciiPos >= limits.upperCase.lower)  return baseValues.upperCase;
    else return -1;
}

function algorithmHandle(text, method){
    const asciiPos = text.charCodeAt(0);
    const baseCipher = getBaseCipher(asciiPos);

    return baseCipher === -1 ? asciiPos : method === "encryption" ? algorithms[0](asciiPos,baseCipher) : algorithms[1](asciiPos,baseCipher) ;
}

function caserCipher(text,method){
    const asciiValues = [];
    for(let i=0; i<text.length; i++){
        const encodedChar = algorithmHandle(text[i], method);
        asciiValues.push(encodedChar);
    }
    
    return String.fromCharCode(...asciiValues);
}


const encryptedText = caserCipher(text,"encryption");
console.log(`Encrypted text: ${encryptedText}`);
const decryptedText = caserCipher(encryptedText,"decryption");
console.log(`Decrypted text: ${decryptedText}`);
