import React from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

const DashboardStats2 = () => {
	return (
		<>
			<div className="bg-white rounded-sm p-5 flex-1 flex items-center justify-center">
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">
						Promedio de Edad
					</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">
							16432
						</strong>
						<span className="text-sm text-red-500 pl-2">-43</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardStats2;
