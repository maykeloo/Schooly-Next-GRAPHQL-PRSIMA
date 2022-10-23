import Image from "next/image";
import { Post } from "../../types/User";
import avatar from "../../public/icons/icon-avatar.png";
import Link from "next/link";

interface PostComponentProps {
  post: Post;
}
export const PostComponent = ({ post }: PostComponentProps) => {
  console.log(post);
  return (
    <>
      <div>
        <div className="py-10 px-7 flex items-start gap-4 border-b border-gray-100">
          <div>
            <Link href={"profile/" + post.user.id}>
              <Image className="cursor-pointer" src={avatar} alt="avatar" objectFit="contain" height={45} width={45}/>
            </Link>
          </div>
          <div>
            <Link href={"profile/" + post.user.id}>
              <div className="flex flex-col cursor-pointer">
                <span className="text-xl font-bold">{post.user.name}</span>
                <span className="text-sm">{post.user.email}</span>
              </div>
            </Link>
            <div className="flex flex-col gap-4 mt-4">
              <span>{post.title}</span>
              <span>{post.content}</span>
            </div>
            <div>
              <div className="flex gap-2 justify-start">
                {post.categories.map((category, index) => (
                  <p className="px-2 p-1 min-w-[4rem] text-center bg-blue-100 rounded-full" key={index}>
                    {category.category.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-6">{post.comment.map((com) => com.content)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
