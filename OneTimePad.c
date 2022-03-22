#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

char* encode(char*, char*);
char* decode(char*, char*);
char* randKeyGen(int);

void main(){
  char plainText[50];
  char *cipherText, *decryptedText, *key;

  printf("Enter plaintext: ");
  scanf("%s", plainText);

  int plainTextLen = strlen(plainText);

  // Converting to Lowercase
  for (int i = 0; i < plainTextLen; i++){
    plainText[i] = tolower(plainText[i]);
  }

  key = randKeyGen(plainTextLen);
  printf("\nRandomly Generated Key: %s\n", key);

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
    finalText[i] = ((cipherText[i]-key[i]+26)%26)+97;
  }

  return finalText;
}

char* randKeyGen(int len){
  char *key = malloc(len*sizeof(char));

  for (int i = 0; i < len; i++){
    key[i] = rand() % 26 + 97;
  }

  return key;
}
