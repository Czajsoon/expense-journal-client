export function ParseJavaDate(javaDateArray: number[]) {
  return new Date(javaDateArray[0], javaDateArray[1]-1, javaDateArray[2], javaDateArray[3], javaDateArray[4])
}
