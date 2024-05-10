import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

export function useDeleteBooking() {
	const queryClient = useQueryClient()
	const { isPending: isDeleting, mutate: deletBooking } = useMutation({
		mutationFn: deleteBooking,
		onSuccess: () => {
			toast.success("Booking deleted")
			queryClient.invalidateQueries({ queryKey: ["bookings"] })
		},
		onError: (error) => {
			toast.error("Could not delete booking")
			console.error(error)
		},
	})

	return { isDeleting, deletBooking }
}
