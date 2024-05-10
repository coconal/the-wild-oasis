import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

export function useLogin() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { mutate: login, isPending: isLoggingIn } = useMutation({
		mutationFn: loginApi,
		onSuccess: (user) => {
			queryClient.setQueryData(["user"], user.user)
			navigate("/dashboard", { replace: true })
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return {
		login,
		isLoggingIn,
	}
}
