import Image from "next/image";
import avatar from "../../public/icons/icon-avatar.png";
import { KeyboardEvent, SyntheticEvent, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_CREATE } from "../../resolvers/mutations";
import { GET_POSTS } from "../../resolvers/queries";
import { Loader } from "../Loader";

interface PostCreateComponentProps {}

export const PostCreateComponent = ({}: PostCreateComponentProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [ addPost, { loading } ] = useMutation(POST_CREATE);

  const addPostHandler = () => {
    console.log(titleRef.current?.value, contentRef.current?.value)
    if(titleRef.current?.value && contentRef.current?.value) {
      addPost({
        variables: {
          post: {
            title: titleRef.current.value,
            content: contentRef.current.value,
            categories: tags
          },
        },
        refetchQueries: [
          {
            query: GET_POSTS,
          }
        ],
      })
    }
  }

  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const enterPress = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const key = e as KeyboardEvent<HTMLInputElement>;

    if (key.code === "Enter" && target.value) {
      setTags([...tags, target.value]);
      target.value = "";
    }
  };

  return (
    <>
      {loading ? <Loader fixed={true}/> : null}
      <div className="px-7 mt-10">
        <div className="bg-blue-500 w-full items-start mx-auto rounded-md gap-8 p-6 flex">
          <Image
            src={avatar}
            width={45}
            height={45}
            objectFit="contain"
            alt="avatar"
          />
          <div className="flex items-start w-full flex-col">
            <div className="flex items-center w-full">
              <input
                type="text"
                ref={titleRef}
                placeholder="What's the title of your mind?"
                className="text-white font-bold placeholder:text-white bg-blue-500 p-2 flex-grow outline-none"
              />
            </div>
            <div className="w-full mt-4">
              <textarea
                ref={contentRef}
                className="font-bold rounded-md p-4 min-h-[5rem] max-h-[10rem] placeholder:text-whiteflex-grow outline-none w-full flex-grow"
                placeholder="What's your mind?"
              />
            </div>
            <div className="mt-4 inline-flex gap-1 flex-wrap">
              {tags.map((tag, index) => (
                <span
                  className="bg-white cursor-pointer hover:bg-gray-100 hover:text-gray-300 transition-all text-blue-500 px-4 py-2 rounded-md"
                  key={tag}
                  onClick={() => handleDelete(index)}
                >
                  {tag}
                </span>
              ))}
              <input
                className="outline-none font-bold bg-blue-500 text-white placeholder:text-white"
                placeholder="My tags..."
                type="text"
                onKeyDown={enterPress}
              />
            </div>
            <button className="bg-white mt-5 px-10 font-bold cursor-pointer hover: py-2 rounded-full" onClick={addPostHandler}>
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
