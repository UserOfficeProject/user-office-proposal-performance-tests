export function validate<Type>(arg: Type, argName?: string): Type {
  if (!arg) {
    throw new Error(`Invalid value provided ${argName} value ${arg}`);
  }
  return arg;
}
