import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isLoading } = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`/api/users/follow/${userId}`, {
        method: "PUT",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
      toast.success("Followed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { follow, isLoading };
};
export default useFollow;
