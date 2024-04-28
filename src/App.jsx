import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import DashBoard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Account from "./pages/Account"
import Cabins from "./pages/Cabins"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import Users from "./pages/Users"
import PageNotFound from "./pages/PageNotFound"
import AppLayOut from "./ui/AppLayOut"
import GlobalStyles from "./styles/GlobalStyles"
import { Toaster } from "react-hot-toast"

export default function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayOut />}>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<DashBoard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="account" element={<Account />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="login" element={<Login />} />
						<Route path="settings" element={<Settings />} />
						<Route path="users" element={<Users />} />
						<Route path="*" element={<PageNotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "500px",
						padding: "16px 24px",
						backgroundColor: "var(--color-grey-0)",
						color: "var(--color-grey-700)",
					},
				}}
			/>
		</QueryClientProvider>
	)
}
