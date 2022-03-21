#include <stdio.h>
#include <string.h>

void main(){
  char plainText[50], resultText[50], cipherText[50];
  int shift, textLen;
  printf("Enter your plainitext: ");
  scanf("%s", plainText);
  printf("Enter value of shift: ");
  scanf("%d", &shift);
  textLen = strlen(plainText);
  for (int i=0; i<textLen; i++){
    if (plainText[i] >= 'a' && plainText[i] <= 'z'){
      cipherText[i] = (plainText[i] - 'a' + shift) % 26 + 'a';
    }
    else if (plainText[i] >= 'A' && plainText[i] <= 'Z'){
      cipherText[i] = (plainText[i] - 'A' + shift) % 26 + 'A';
    }
    else{
      cipherText[i] = plainText[i];
    }
  }

  printf("The ciphertext is: %s\n",cipherText);

  for (int i=0; i<textLen; i++){
    if (cipherText[i] >= 'a' && cipherText[i] <= 'z'){
      resultText[i] = (cipherText[i] - 'a' - shift) % 26 + 'a';
    }
    else if (cipherText[i] >= 'A' && cipherText[i] <= 'Z'){
      resultText[i] = (cipherText[i] - 'A' - shift) % 26 + 'A';
    }
    else{
      resultText[i] = cipherText[i];
    }
  }

  printf("Decrypted plaintext is: %s\n",resultText);
}
