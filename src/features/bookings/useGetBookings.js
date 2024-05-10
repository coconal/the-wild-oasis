import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants"

export function useGetBookings() {
	const [searchParams] = useSearchParams()
	const queryClient = useQueryClient()
	const filterValue = searchParams.get("status")
	const filter =
		!filterValue || filterValue === "all" ? null : { field: "status", value: filterValue }
	// : { field: "status", value: filterValue, method: "gte" }

	const sortValue = searchParams.get("sortBy")
	const [field, direction] = sortValue ? sortValue.split("-") : "startDate-desc".split("-")
	const sortBy = { field, direction }

	const currentPage = Number(searchParams.get("page")) || 1

	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, currentPage],
		queryFn: () => getBookings({ filter, sortBy, currentPage }),
	})

	const pageCount = Math.ceil(count / PAGE_SIZE)

	//PRE-FETCHING
	if (currentPage > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, currentPage - 1],
			queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
		})
	if (currentPage < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, currentPage + 1],
			queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
		})
	return { isLoading, bookings, error, count }
}
