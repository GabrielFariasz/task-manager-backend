import { AddTask } from '../../../domain/usecases/task/add-task'
import { RequiredFieldError } from '../../errors/required-field-error'
import { ok, requestError } from '../../helpers/http-response'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddTaskController implements Controller {
  constructor(private readonly dbAddTask: AddTask) {
    this.dbAddTask = dbAddTask
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // here I can use a validator!
      const requiredFields = ['name', 'owner', 'visibility', 'limitDate']
      for (const i of requiredFields) {
        if (!httpRequest.body[i]) throw new RequiredFieldError(i)
      }

      const account = await this.dbAddTask.add(httpRequest.body)
      return ok(account)
    } catch (error) {
      return requestError(error)
    }
  }
}
