import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogProps } from "../../../blog.types";
import {
  selectAllBlogs,
  selectError,
  selectStatus,
  fetchBlogs,
  deleteBlog,
} from "../../../redux/features/blogs";

const Feeds = () => {
  const allBlogs = useAppSelector(selectAllBlogs);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status]);

  let blogs;
  switch (status) {
    case "loading":
      blogs = <div>loading...</div>;
      break;
    case "succeeded":
      blogs = (
        <ul className="flex flex-col gap-6 mt-10">
          {allBlogs.map((blog: BlogProps) => (
            <li key={blog._id} className="blog">
              <span>
                <h1>{blog.title}</h1>
                <div>
                  <button>
                    <Link to={`${blog._id}`}>edit</Link>
                  </button>
                  <button onClick={() => dispatch(deleteBlog(blog._id))}>
                    delete
                  </button>
                </div>
              </span>
              <p>{blog.content}</p>
              <h2>by {blog.name}</h2>
            </li>
          ))}
        </ul>
      );

      break;
    case "failed":
      blogs = <div>Failed: {error}</div>;
      break;
    default:
      blogs = <div>nothing happens</div>;
      break;
  }

  return <div>{blogs}</div>;
};

export default Feeds;
