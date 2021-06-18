const text = process.argv[2] || "My code here";
const key = process.argv[3] || "Covid";
const vigeneKey = (key.length < text.length) ? key.repeat(Math.ceil(text.length/key.length)) : key;
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

function generateOriginalPos(vPos, keyObject){
    return Object.keys(keyObject).find(key => keyObject[key] === vPos);
}

function encryptText(textPos, keyPos, keyObject){
    const totalLength = Object.keys(keyObject).length;
    const vPos = (keyObject[textPos] + keyObject[keyPos] + totalLength) % totalLength;
    return generateOriginalPos(vPos, keyObject);
}

function decryptText(textPos, keyPos, keyObject){
    const totalLength = Object.keys(keyObject).length;
    const vPos = (keyObject[textPos] - keyObject[keyPos] + totalLength) % totalLength;
    return generateOriginalPos(vPos, keyObject);
}

function getBaseCipher(asciiPos){
    if (asciiPos <= limits.lowerCase.upper && asciiPos >= limits.lowerCase.lower)   return baseValues.lowerCase;
    else if (asciiPos <= limits.upperCase.upper && asciiPos >= limits.upperCase.lower)  return baseValues.upperCase;
    return -1;
}

function algorithmHandle(text, keyText, method, keyObject){
    const textPos = text.charCodeAt(0);
    const keyPos = keyText.charCodeAt(0);
    const baseCipher = getBaseCipher(textPos);
    
    return baseCipher === -1 ? textPos : method === "encryption" ? algorithms[0](textPos, keyPos, keyObject) : algorithms[1](textPos, keyPos, keyObject);
}

function generateKeyObject(){
    let virtualIndex = 0;
    const tempArray = {};
    
    for ( i=limits.lowerCase.lower; i<=limits.lowerCase.upper; i++){
        tempArray[i]=virtualIndex++;
    }
    for ( i=limits.upperCase.lower; i<=limits.upperCase.upper; i++){
        tempArray[i]=virtualIndex++;
    }

    return tempArray;
}

function vegnereCipher(text,method){
    const keyObject = generateKeyObject();
    const asciiValues = [];

    for(let i=0; i<text.length; i++){
        const encodedChar = algorithmHandle(text[i], vigeneKey[i], method, keyObject);
        asciiValues.push(encodedChar);
    }
    
    return String.fromCharCode(...asciiValues);
}


const encryptedText = vegnereCipher(text,"encryption");
console.log(`Encrypted text: ${encryptedText}`);
const decryptedText = vegnereCipher(encryptedText,"decryption");
console.log(`Decrypted text: ${decryptedText}`);
