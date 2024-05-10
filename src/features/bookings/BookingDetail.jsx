import styled from "styled-components"

import BookingDataBox from "./BookingDataBox"
import Row from "../../ui/Row"
import Heading from "../../ui/Heading"
import Tag from "../../ui/Tag"
import ButtonGroup from "../../ui/ButtonGroup"
import Button from "../../ui/Button"
import ButtonText from "../../ui/ButtonText"
import Spinner from "../../ui/Spinner"

import { useMoveBack } from "../../hooks/useMoveBack"
import useGetBooking from "./useGetBooking"
import { useNavigate } from "react-router-dom"
import { useCheckout } from "../check-in-out/useCheckout"
import { HiTrash } from "react-icons/hi2"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"
import { useDeleteBooking } from "./useDeleteBooking"

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`

function BookingDetail() {
	const navigate = useNavigate()
	const moveBack = useMoveBack()
	const { booking, isLoading } = useGetBooking()
	const { checkout, isCheckinOut } = useCheckout()
	const { isDeleting, deletBooking } = useDeleteBooking()

	if (isLoading) return <Spinner />

	const { status, id: bookingId } = booking

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	}

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				<Modal>
					<Modal.Open opens="deleteB">
						<Button variation="danger" icon={<HiTrash />}>
							Delete booking
						</Button>
					</Modal.Open>
					<Modal.Window name="deleteB">
						<ConfirmDelete
							resourceName="booking"
							onConfirm={() =>
								deletBooking(bookingId, {
									onSettled: () => {
										navigate(-1)
									},
								})
							}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>

				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
				)}
				{status === "checked-in" && (
					<Button
						onClick={() => {
							checkout(bookingId)
						}}
						disabled={isCheckinOut}
					>
						Check out
					</Button>
				)}
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	)
}

export default BookingDetail
