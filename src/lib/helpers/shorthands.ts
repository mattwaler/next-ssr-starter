export function props(obj) {
  return {
    props: {
      ...obj,
    },
  }
}

export function redirect(destination = '/', permanent = false) {
  return {
    redirect: {
      destination,
      permanent,
    },
  }
}

export function serialize(data: any) {
  return JSON.parse(JSON.stringify(data))
}
