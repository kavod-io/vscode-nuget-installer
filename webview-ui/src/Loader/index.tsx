import "./Loader.scss"

interface LoaderProps {
  className: string
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={className}>
      <img src="https://media.giphy.com/media/fAhcc26mNg3vp5jrWt/giphy.gif" />
    </div>
  )
}

export default Loader
