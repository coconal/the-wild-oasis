import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"
import { updateUserData } from "../../services/apiAuth"

export function useUpdateUser() {
	const queryClient = useQueryClient()
	const { isPending: isUpdating, mutate: updateUser } = useMutation({
		mutationFn: updateUserData,
		onSuccess: ({ user }) => {
			toast.success("User successfully updated")
			queryClient.setQueryData(["user"], user)
			// queryClient.invalidateQueries({
			// 	queryKey: ["user"],
			// })
		},
		onError: (error) => {
			//toast.error(error.message)
			console.log(error)
		},
	})

	return { isUpdating, updateUser }
}
