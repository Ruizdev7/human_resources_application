import RBAC from "./RBAC";

import { React, useState } from "react";

import { useGetRolesQuery } from "../../redux_app/services/rolesAPI";

const UsersRoles = () => {
	const [isOpen, setIsOpen] = useState(true);

	const [selectedRole, setSelectedRole] = useState(1);

	const { data: list_roles, isSuccess } = useGetRolesQuery();

	return (
		<>
			<div className="bg-white container mx-auto p-2">
				<div className="flex flex-col mx-auto gap-4 lg:w-[950px]">
					<h2 className="text-2xl font-bold my-5">
						SISTEMA DE ACCESO BASADO EN ROLES
					</h2>
					<p className="text-[14px]mb-5">
						El sistema por defecto cuenta con el registro de cada uno
						de los módulos del sistema, por ende, solo deberá seleccionar
						el rol que desea configurar y el tipo de permisos
						para cada uno de los módulos de la aplicación.
					</p>
					<RBAC />
				</div>
			</div>
		</>
	);
};

export default UsersRoles;
