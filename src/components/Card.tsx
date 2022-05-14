interface Props {
  heading: String
  subheading: String
  children: React.ReactNode
}

export default function Card(props: Props) {
  return (
    <div className="rounded-lg bg-white p-6">
      <h3 className="text-lg font-bold leading-6 text-gray-900">
        {props.heading}
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>{props.subheading}</p>
      </div>
      <div className="mt-5">{props.children}</div>
    </div>
  )
}
