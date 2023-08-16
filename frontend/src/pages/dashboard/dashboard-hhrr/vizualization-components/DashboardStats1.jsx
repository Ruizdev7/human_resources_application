import React, { useEffect, useState } from "react";
import { RiTeamLine } from "react-icons/ri";
import axios from "axios";

const DashboardStats1 = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/posts"
			);
			setData(response.data);
		}
		fetchData();
	}, []);

	return (
		<>
			<div className="bg-white rounded-sm p-5 flex-1 flex items-center justify-center">
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<RiTeamLine className="text-2xl text-white" />
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

export default DashboardStats1;
