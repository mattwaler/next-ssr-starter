export default function redirect(location: String) {
  return {
    redirect: {
      destination: location,
      permanent: false
    },
  }
}
