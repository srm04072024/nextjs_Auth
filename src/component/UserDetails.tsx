import User from "@/models/userModels";
import toast from "react-hot-toast";

export default async function UserDetails({ id }: { id: string }) {
  try {
    const user = await User.findById(id);

    if(!user){
        
    }
    console.log(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return <div>{id}</div>;
}
