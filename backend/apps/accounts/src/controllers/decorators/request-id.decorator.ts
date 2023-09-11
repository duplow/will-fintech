export const RequestId = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    target: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    propertyKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parameterIndex: number,
  ): string => {
    console.log('Return req.requestId or X-Request-Id header')
    return 'FAKE-X-REQUEST-ID'
  }
}
