import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<section className="w-screen h-screen flex items-center justify-center mx-auto">
			<div className="mx-auto">
				<Outlet />
			</div>
		</section>
	);
};

export default AuthLayout;
