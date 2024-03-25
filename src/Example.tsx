import { useRef, useState, useCallback } from "react"
import usePosts from "./hooks/usePosts"
import Post from "./Post"


const Example = () => {
  const [pageNum, setPageNum] = useState<number>(1)
  const {
    isLoading,
    isError,
    error,
    results,
    hasNextPage
  } = usePosts({pageNum});

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback((item: HTMLDivElement | null) => {
    if (isLoading || !item) return;

    if (intObserver.current) {intObserver.current.disconnect();}
      
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('we are near ');
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });
    
    if(item) {intObserver.current.observe(item);}
  }, [isLoading, hasNextPage]);
  if(isError) return <p>Error: {error.message}</p>

  const content = results.map((post, i) => {
    if(results.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />
    }
    return <Post key={post.id} post={post} />
  })

  return (
    <>
      <h1> &infin; Infinite Query &amp; Scroll <br />&inFin;
      Ex. 1 - React only </h1>
      <p><a href="#top">Back to Top</a></p>
    </>
  )
}

export default Example