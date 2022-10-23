import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface ProfileHeaderProps {
  name: string;
  postsLength: number;
}

export const ProfileHeader = ({ name, postsLength }: ProfileHeaderProps) => {
  return (
    <>
      <Link href="/">
        <div className=" hover:bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
          <ArrowSmallLeftIcon width={20} />
        </div>
      </Link>
      <span className="flex flex-col">
        <span className="font-bold text-lg leading-4">{name}</span>
        <span>{postsLength} posts</span>
      </span>
    </>
  );
};
