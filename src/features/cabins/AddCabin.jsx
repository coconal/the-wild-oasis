import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal"

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add New Cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	)
}

// export default function AddCabin() {
// 	const [showForm, setShowForm] = useState(false)

// 	return (
// 		<div>
// 			<Button onClick={() => setShowForm((show) => !show)}> Add New Cabin </Button>

// 			{showForm && (
// 				<Modal onClose={() => setShowForm(false)}>
// 					<CreateCabinForm onCloseModal={() => setShowForm(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	)
// }

export default AddCabin
