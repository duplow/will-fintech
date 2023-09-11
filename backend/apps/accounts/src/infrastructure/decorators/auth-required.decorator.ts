export const AuthRequired = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    target: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    propertyKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    propertyDescriptor: PropertyDescriptor,
  ) => {
    console.log('Rest auth required')
  }
}
