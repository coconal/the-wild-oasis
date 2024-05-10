/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateBooking } from "../../services/apiBookings"

import toast from "react-hot-toast"

export function useCheckout() {
	const queryClient = useQueryClient()

	const { mutate: checkout, isPadding: isCheckinOut } = useMutation({
		mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out" }),
		onSuccess: () => {
			toast.success("Booking checked out successfully")
			queryClient.invalidateQueries({ active: true })
		},
		onError: (error) => {
			toast.error("Error checking out booking")
			console.error(error)
		},
	})

	return { checkout, isCheckinOut }
}
