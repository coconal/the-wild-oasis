import styled from "styled-components"
import Spinner from "../../ui/Spinner"
import { useRecentBookings } from "./useRecentBookings"
import { useRecentStays } from "./useRecentStays"
import Stats from "./Stats"

import { useCabins } from "../cabins/useCabins"
import SalesChart from "./SalesChart"
import DurationChart from "./DurationChart"
import Today from "../check-in-out/TodayActivity"

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`

export default function DashboardLayout() {
	const { isLoading: isLoadingBooking, bookings } = useRecentBookings()
	const { isLoading: isLoadingStay, stays, confirmedStays, numDays } = useRecentStays()
	const { isLoading: isLoadingCabin, cabins } = useCabins()
	if (isLoadingBooking || isLoadingStay || isLoadingCabin) {
		return <Spinner />
	}

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<Today />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	)
}
