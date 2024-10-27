import user1 from "@/assets/users/user-1.png";
import user2 from "@/assets/users/user-2.jpg";
import user3 from "@/assets/users/user-3.jpg";
import user4 from "@/assets/users/user-4.jpg";
import user5 from "@/assets/users/user-5.jpg";
import Image from "next/image";
import { Star } from "lucide-react";
import FiveStars from "../FiveStars";
const users = [user1, user2, user3, user4, user5];
function UsersIcons() {
  return (
    <div className="mt-12 flex flex-col sm:flex-col items-center sm:items-start">
      <div className="flex -space-x-4">
        {users.map((user) => {
          return (
            <Image
              className="inline-block h-10 w-10 rounded-full right-2 ring-slate-100 object-cover object-center"
              src={user.src}
              width={40}
              height={40}
              alt="user image"
              key={user.blurDataURL}
            />
          );
        })}
      </div>
      <div className="flex flex-col justify-between items-center sm:items-start mt-4">
        <FiveStars />
        <p className="text-muted-foreground">
          <span className="font-semibold">1.250</span> happy customers
        </p>
      </div>
    </div>
  );
}

export default UsersIcons;
