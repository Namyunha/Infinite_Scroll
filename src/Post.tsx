import React from 'react'

interface PostProps {
    title: string;
    body: string;
    id: number
}

const Post =  React.forwardRef(( post:any, ref:any)=> {
    console.log("Post: post + ", post)
    const postBody = (
        <>
            <h2>{post.post.title}</h2>
            <p>{post.post.body}</p>
            <p>Post ID: {post.post.id}</p>
        </>
    )

    const content = ref
        ? <article ref={ref}>{postBody}</article>
        : <article>{postBody}</article>
    return content
  }) 

export default Post