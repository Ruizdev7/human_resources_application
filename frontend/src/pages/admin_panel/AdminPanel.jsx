import React from "react";

const AdminPanel = () => {
	return (
		<>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<img
							className="w-full h-48 object-cover"
							src="https://via.placeholder.com/300x200"
						/>

						<div className="p-4">
							<h2 className="font-bold text-xl mb-2">
								User Roles
							</h2>

							<a
								href="/administration-panel/users-roles"
								className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							>
								Manage Permissions
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminPanel;
