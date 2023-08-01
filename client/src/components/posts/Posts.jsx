import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from '@tanstack/react-query'

const Posts = () => {

  const { isLoading, error, data } = useQuery(["posts"], () =>
      makeRequest.get("/posts").then((res) => {
        return res.data
      })
  )
  

  return <div className="posts">
    {isLoading ? "loading" : data.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
