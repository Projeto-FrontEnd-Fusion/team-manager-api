function ResponseSend(data: any = null, message?: string, statusCode: number = 200) {
  return {
    data: data,
    message: message,
    statusCode: statusCode
  }
}

export { ResponseSend };
