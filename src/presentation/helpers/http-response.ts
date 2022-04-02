import { HttpResponse } from '../protocols/http'

export const requestError = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})
