export function createFormObject(form: HTMLFormElement) {
  const data = new FormData(form)
  return Object.fromEntries(data.entries())
}
