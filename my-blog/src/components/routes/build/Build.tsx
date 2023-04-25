import { useState } from "react";
import axios from "../../../api/axios";

const BLOG = "/blog";

const Build = () => {
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !title || !content) return setErrMsg("Need to put data");
    setErrMsg("");

    try {
      await axios.post(BLOG, { name, title, content });
      setName("");
      setTitle("");
      setContent("");
    } catch (err: any) {
      setErrMsg(err.message);
    }
  };
  return (
    <div className="mt-2 bg-blue-400 p-2">
      <div className="text-red-400">{errMsg}</div>
      <form onSubmit={handleSubmit} className="build-form">
        <span className="build-row">
          <label htmlFor="title">Blog title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title..."
            className="outlines"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </span>

        <span className="build-row">
          <label htmlFor="content">Blog content</label>
          <textarea
            id="content"
            className="p-1.5 resize-none h-52 outlines"
            placeholder="Enter content..."
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
            placeholder="Enter creator..."
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </span>
        <span>
          <button>Build</button>
        </span>
      </form>
    </div>
  );
};

export default Build;

{
  /* <input type="file" id="file" />
        <label htmlFor="file">Blog Image</label>
        <em>optional</em>

        <input type="url" id="url" />
        <label htmlFor="url">Blog Reference</label>
        <em>optional</em> */
}
