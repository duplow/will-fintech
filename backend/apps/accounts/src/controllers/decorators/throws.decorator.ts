export function Throws(_value: any) {
  return function (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    console.log(key, { descriptor })
    return descriptor
  }
}
