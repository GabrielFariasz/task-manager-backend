export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`RequiredField not provided: ${fieldName}`)
    this.name = 'RequiredFieldError'
  }
}
