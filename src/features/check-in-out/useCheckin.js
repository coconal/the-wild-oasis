/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { updateBooking } from "../../services/apiBookings"
import { is } from "date-fns/locale"
import toast from "react-hot-toast"

export function useCheckin() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: checkin, isPadding: isCheckin } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast }),
		onSuccess: () => {
			toast.success("Booking checked in successfully")
			queryClient.invalidateQueries({ active: true })
			navigate("/")
		},
		onError: (error) => {
			toast.error("Error checking in booking")
			console.error(error)
		},
	})

	return { checkin, isCheckin }
}
