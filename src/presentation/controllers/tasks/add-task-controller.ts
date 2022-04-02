import { RequiredFieldError } from '../../errors/required-field-error'
import { requestError } from '../../helpers/http-response'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddTaskController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'owner', 'visibility', 'limitDate']
      for (const i of requiredFields) {
        if (!httpRequest.body[i]) throw new RequiredFieldError(i)
      }
      return null
    } catch (error) {
      return requestError(error)
    }
  }
}
