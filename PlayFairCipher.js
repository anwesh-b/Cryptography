const originalText = process.argv[2].toUpperCase() || 'hello'.toUpperCase() ;
const rawKey = process.argv[3].toUpperCase() || 'byebye'.toUpperCase();
const MAX_ROW = 5;
const MAX_COLUMN = 5; 
const TOGETHER_STRINGS = ['I','J'];
const JOINED_TOGETHER_STRINGS = TOGETHER_STRINGS.join("");

function generateKey(rawKey){
    const keyMatrix = [rawKey[0]]

    for(let i=1; i<rawKey.length; i++){
        if( !keyMatrix.includes(rawKey[i]) ){
            if (TOGETHER_STRINGS.includes(rawKey[i])){
                if( !keyMatrix.includes(JOINED_TOGETHER_STRINGS) ){
                    keyMatrix.push(JOINED_TOGETHER_STRINGS)
                }
            } else {
                keyMatrix.push(rawKey[i])
            }
        }
    }

    for(let i=65; i<=90; i++){
        const alphabet = String.fromCharCode(i);

        if( !keyMatrix.includes(alphabet) ){
            if( TOGETHER_STRINGS.includes(alphabet) ){
                if( !keyMatrix.includes(JOINED_TOGETHER_STRINGS) ){
                    keyMatrix.push(JOINED_TOGETHER_STRINGS)
                }
            } else {
                keyMatrix.push(alphabet);
            }
        }
    }

    return keyMatrix;
}


function getRowColumn(index){
    const row = Math.floor(index / MAX_COLUMN);
    const column = index % MAX_COLUMN;
    
    return {row,column};
}

function getIndex({row,column}){
    return row * MAX_COLUMN + column;
}

function groupString(text, algo){
        const groups = []
        for(let i=0; i<text.length; i++){
            if( !text[i+1] ){                   // If odd element is present at the last group
                groups.push(`${text[i]}X`)
            } 
            else if( text[i+1] !== text[i] ){   // If both element are different of the group
                groups.push(`${text[i]}${text[i+1]}`);
            } else if(algo === 'encode'){   //If both element of group are same
                groups.push(`${text[i]}X`);
                i--;
            } else{
                groups.push(`${text[i]}${text[i+1]}`);
            }
            i++;
        }
    return groups;
}

function limitedChange(value, maxValue, algo){
    if (algo == 'encode') return (value + 1) % maxValue;
    return (value + maxValue - 1) % maxValue;
}

function playFairCipher(text, keyMatrix, algo){
    groupedText = groupString(text, algo);
    const finalText = [];

    groupedText.forEach((group) => {
        const {row: row1, column: column1} = getRowColumn( TOGETHER_STRINGS.includes(group[0]) ? keyMatrix.indexOf(JOINED_TOGETHER_STRINGS) : keyMatrix.indexOf(group[0]));
        const {row: row2, column: column2} = getRowColumn( TOGETHER_STRINGS.includes(group[1]) ? keyMatrix.indexOf(JOINED_TOGETHER_STRINGS) : keyMatrix.indexOf(group[1]));

        const finalPos = [{ row: row1, column: column1}, { row:row2, column:column2 }]
        if(row1 === row2){
            finalPos[0].column = limitedChange(finalPos[0].column, MAX_ROW, algo);
            finalPos[1].column = limitedChange(finalPos[1].column, MAX_ROW, algo);
        } else if(column1 === column2){
            finalPos[0].row = limitedChange(finalPos[0].row, MAX_COLUMN, algo);
            finalPos[1].row = limitedChange(finalPos[1].row, MAX_COLUMN, algo);
        } else {
            [finalPos[0].column, finalPos[1].column] = [finalPos[1].column, finalPos[0].column];
        }

        const finalIndex = [ getIndex(finalPos[0]), getIndex(finalPos[1]) ];

        const text1 = keyMatrix[finalIndex[0]][0];
        const text2 = keyMatrix[finalIndex[1]][0] == 'X' ? '' :  keyMatrix[finalIndex[1]][0]; 

        finalText.push( `${text1}${text2}` )
    });

    return finalText.join("");
}

function main(){
    const keyMatrix = generateKey(rawKey);

    const encodedText = playFairCipher(originalText, keyMatrix, 'encode');
    console.log(`The encoded text is: ${encodedText}`);

    const decodedText = playFairCipher(encodedText, keyMatrix, 'decode');
    console.log(`The decoded text is: ${decodedText}`);
}

main();
