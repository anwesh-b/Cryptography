#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

char* encode(char*, char*);
char* decode(char*, char*);

void main(){
  char plainText[50], key[50];
  char *cipherText, *decryptedText;

  printf("Enter plaintext: ");
  scanf("%s", plainText);
  printf("Enter the key: ");
  scanf("%s", key);

  int plainTextLen = strlen(plainText);
  int keyLen = strlen(key);

  // Converting to Lowercase
  for (int i = 0; i < plainTextLen; i++){
    plainText[i] = tolower(plainText[i]);
  }

  for (int i = 0; i < keyLen; i++){
    key[i] = tolower(key[i]);
  }

  if(plainTextLen > keyLen){
    for (int i=keyLen-1; i<plainTextLen; i++){
      key[i] = key[i % keyLen];
    }
  }

  cipherText = encode(plainText, key);
  decryptedText = decode(cipherText, key);

  printf("\nCipher Text: %s\n", cipherText);
  printf("\nOriginal Text: %s\n", decryptedText);

  return;
}

char* encode(char* plainText, char* key){
  int plainTextLen = strlen(plainText);
  int keyLen = strlen(key);

  char *finalText= malloc(50*sizeof(char));

  for (int i = 0; i < plainTextLen; i++){
    finalText[i] = ((plainText[i]-97+key[i]-97+26)%26)+97;
  }

  return finalText;
}

char* decode(char* cipherText, char* key){
  int cipherTextLen = strlen(cipherText);
  int keyLen = strlen(key);

  char *finalText= malloc(50*sizeof(char));

  for (int i = 0; i < cipherTextLen; i++){
    printf("ASCII: %d %c\n", cipherText[i], cipherText[i]);
    finalText[i] = ((cipherText[i]-key[i]+26)%26)+97;
  }

  return finalText;
}