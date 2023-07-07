import { useUsers } from "@/hooks/useUsers";
import Avatar from "../Avatar";
import { useCurrentsUser } from "@/hooks/useCurrentsUser";

const FollowBar = () => {
    const { loggedIn } = useCurrentsUser()
    const { users } = useUsers()

    if (users?.length === 0 || !users || !loggedIn) {
      return null
    }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
        {users.map((user) => (
            <div className="flex flex-row gap-4" key={user._id}>
              <Avatar user={user} isLarge={false}></Avatar>
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-neutral-400 text-sm">@{user.username}</p>
                </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;