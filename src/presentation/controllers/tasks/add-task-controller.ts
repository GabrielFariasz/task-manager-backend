import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddTaskController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'owner', 'visibility', 'limitDate']
      for (const i of requiredFields) {
        if (!httpRequest.body[i]) throw new Error(`MissingField: ${i}`)
      }
      return null
    } catch (error) {
      return {
        statusCode: 400,
        body: error
      }
    }
  }
}
