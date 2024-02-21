import { useInView } from "react-intersection-observer"
import Loader from "../../Loader"

type LoadMoreProps = {
  isFetching: boolean
  fetchNextPage: () => void
}

const LoadMore = ({ isFetching, fetchNextPage }: LoadMoreProps) => {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isFetching) {
        fetchNextPage()
      }
    },
  })

  const inner = isFetching ? (
    <Loader className="flex items-center justify-center" />
  ) : (
    <h4>No more items</h4>
  )

  return <div ref={ref}>{inner}</div>
}

export { LoadMore }
