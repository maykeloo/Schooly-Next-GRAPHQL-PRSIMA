import { Profile } from "../../types/User";
import avatar from '../../public/icons/icon-avatar.png'
import Image from "next/image";
import timeSince from "../../utils/timeSince";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

interface ProfileDetailsProps {
      profile: Profile
}

export const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  return (
    <>
      <div className="mt-36 px-4">
            <div>
                  <Image src={avatar} width={150} height={150} alt="avatar"/>
            </div>
            <div>
                  <p className="text-2xl mt-10 font-extrabold">{profile.user.name}</p>
                  <p className="">{profile.user.email}</p>
                  <p className="flex gap-2"><CalendarDaysIcon width={20}/><span>Joined {timeSince(profile.user.createdAt)}</span></p>
                  <p className="mt-2 text-gray-500">{profile.bio}</p>
            </div>
      </div>
    </>
  );
}