import User from "@/models/userModels";

export default async function ProfileDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await User.findById(id);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3">
      {user && (
        <div className="h-1/2 w-2/4 bg-amber-50 text-neutral-500 text-center p-4 flex flex-col gap-4 justify-center">
          <p className="text-3xl">Hello,{user.username}</p>
          <p className="text-2xl">userId: {user.id}</p>
          <p className="text-2xl">Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
