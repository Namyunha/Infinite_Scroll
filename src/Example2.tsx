import { useRef, useState, useCallback } from "react"
import usePosts from "./hooks/usePosts"
import Post from "./Post"
import { useInfiniteQuery, QueryStatus } from "react-query"
import { getPostsPage } from "./api/axios"


const Example2 = () => {
  const [pageNum, setPageNum] = useState<number>(1)
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery('/posts', ({ pageParam = 1 }) => 
  getPostsPage(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
        }
  })

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback((item: HTMLDivElement | null) => {
    if (isFetchingNextPage || !item) return;

    if (intObserver.current) {intObserver.current.disconnect();}
      
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('we are near the last post!');
          fetchNextPage()
        }
      });
    
    if(item) {intObserver.current.observe(item);}
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);
  if(status === 'error') return <p>Error: {(error as Error).message}</p>

  const content = data?.pages.map(pg => {
    
    return pg.map((post: any, i:number) => {
      
    
      if(pg.length === i + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post} />
      }
      return <Post key={post.id} post={post} />
    })
  })


  return (
    <>
      <h1> &infin; Infinite Query &amp; Scroll <br />&inFin;
      Ex. 2 - React Query </h1>
      {content}
      {isFetchingNextPage && <p>Loading More Posts...</p> }
      <p><a href="#top">Back to Top</a></p>
    </>
  )
}

export default Example2