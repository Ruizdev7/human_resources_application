import { Outlet } from "react-router-dom";

import SideBar from "../../components/SideBar";
import HeaderDashboard from "../../components/HeaderDashboard";
import FooterDashboard from "../../components/FooterDashboard";
import { useSelector } from "react-redux";

const AppLayout = () => {

	const nombre_usuario_actual = useSelector((state) => state);

	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0
	if (current_user === 0) {
		window.location = `${import.meta.env.VITE_REDIRECT}/`;
	}
	const size = screen.width
	return (
		<div className="flex flex-col min-h-screen">
			<SideBar />
			{current_user != 0 ?
				<>
					<div className="flex-shrink-0 border-black border-b">
						<HeaderDashboard />
					</div>
					<div className="flex-grow min-h-screen overflow-y-auto mt-5 xl:flex-grow xl:overflow-y-scroll mb-5">
						<Outlet />
					</div>
				</>
				: null}
			<FooterDashboard />
		</div>

	);
};

export default AppLayout;
