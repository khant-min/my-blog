import { useParams, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectAllBlogs, editBlog } from "../../../redux/features/blogs";
import { useState } from "react";

const Feed = () => {
  const [err, setErr] = useState("");
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector(selectAllBlogs);

  const curBlog = allBlogs.find((blog) => blog._id === id)!;

  if (curBlog === undefined) {
    return <Navigate to="/feeds" />;
  }

  const [name, setName] = useState(curBlog.name);
  const [title, setTitle] = useState(curBlog.title);
  const [content, setContent] = useState(curBlog.content);

  const handleEdit = async () => {
    try {
      dispatch(editBlog({ name, title, content, id: curBlog._id }));
    } catch (err: any) {
      setErr(err.message);
    }
  };

  return (
    <div className="mt-2 bg-blue-400 p-2">
      <div>{err}</div>
      <form onSubmit={(e) => e.preventDefault()} className="build-form">
        <span className="build-row">
          <label htmlFor="title">Blog title</label>
          <input
            type="text"
            id="title"
            className="outlines"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setTitle(e.target.value)
            }
          />
        </span>

        <span className="build-row">
          <label htmlFor="content">Blog content</label>
          <textarea
            id="content"
            className="p-1.5 resize-none h-52 outlines"
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setContent(e.target.value)
            }
          ></textarea>
        </span>

        <span>
          <label htmlFor="name">
            <p>Blog creator</p>
            <em>(e.g. name, organization)</em>
          </label>
          <input
            type="text"
            id="name"
            className="md:w-[30%] p-2 outlines"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setName(e.target.value)
            }
          />
        </span>
        <span>
          <button onClick={() => handleEdit()}>Save</button>
        </span>
      </form>
    </div>
  );
};

export default Feed;
