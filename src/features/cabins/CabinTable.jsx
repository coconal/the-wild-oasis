import Spinner from "../../ui/Spinner"
import CabinRow from "./CabinRow"
import Table from "../../ui/Table"
import Menus from "../../ui/Menus"
import Empty from "../../ui/Empty"
import { useSearchParams } from "react-router-dom"
import { useCabins } from "./useCabins"

export default function CabinTable() {
	const { isLoading, cabins } = useCabins()

	const [searchParams] = useSearchParams()
	const discount = searchParams.get("discount") || "all"

	if (isLoading) return <Spinner />

	if (!cabins.length) return <Empty />
	let filteredCabins = cabins
	if (discount === "all") {
		filteredCabins = cabins
	}
	if (discount === "no-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
	}
	if (discount === "with-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
	}

	const sortBy = searchParams.get("sortBy") || "startDate-asc"

	const [field, derection] = sortBy.split("-")
	const modifier = derection === "asc" ? 1 : -1
	const sortedCabins = filteredCabins.sort((a, b) => {
		return a[field] > b[field] ? 1 * modifier : -1 * modifier
	})
	//console.log(sortedCabins)
	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
				></Table.Body>
			</Table>
		</Menus>
	)
}
