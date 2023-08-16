import { React, useRef, useState } from "react";
import { useGetRBACByRoleQuery } from "../../redux_app/services/rbacAPI";
import { useGetRBACModulesQuery } from "../../redux_app/services/rbacModules";
import { useUpdatePermissionsMutation } from "../../redux_app/services/rbacAPI";
import { Read, Create, Update, Delete } from "../../assets/images/SVG";
import { useGetRolesQuery } from "../../redux_app/services/rolesAPI";

function RBAC() {
	const [CreateAccess, setCreateAccess] = useState(false)
	const [ReadAccess, setReadAccess] = useState(false)
	const [UpdateAccess, setUpdateAccess] = useState(false)
	const [DeleteAccess, setDeleteAccess] = useState(false)
	const [ccnRbacModule, setCcnRbacModule] = useState(1)
	const [selectedRole, setSelectedRole] = useState(1)

	const [trigger, { data, error: error_update_permission }] = useUpdatePermissionsMutation(ccnRbacModule)
	const { data: list_rbac_modules } = useGetRBACModulesQuery();
	const { data: list_roles, isSuccess: is_succes_roles } = useGetRolesQuery();
	const {
		data: list_rbac_by_role,
		isLoading: is_loading_rbac_by_role,
		isError: is_error_role_rbac_by_role,
		error,
		isSuccess,
	} = useGetRBACByRoleQuery(selectedRole, { skip: false });


	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			ccn_role: selectedRole,
			create_access: CreateAccess,
			read_access: ReadAccess,
			update_access: UpdateAccess,
			delete_access: DeleteAccess,
			ccn_rbac_module: ccnRbacModule,
		}
		trigger(body);
	}
	//const last_query = useSelector((state) => state.rbacApi.queries.data)

	if (is_loading_rbac_by_role) {
		return <div>...is Loading</div>;
	}

	if (is_error_role_rbac_by_role) {
		return <div>Error loading RBAC</div>;
	}

	return (
		<div className="lg:grid lg:grid-cols-2 sm:grid sm:grid-cols-1 lg:h-[55vh]">
			<div className="my-auto">
				<div >
					<h2 className="font-arial text-[20px] my-2">Seleccionar Rol</h2>
					<select
						className="border-gray-400 h-[35px] rounded-lg border-2 w-[85%]"
						onChange={(e) => setSelectedRole(e.target.value)}
					>
						{list_roles
							? list_roles.Role.map((role) => (
								<option
									key={role.ccn_role}
									value={role.ccn_role}
								>
									{role.full_role}
								</option>
							))
							: null}
					</select>
				</div>
				<form onSubmit={handleSubmit}>
					<h2 className="font-arial text-[20px] my-2">Seleccionar Modulo</h2>
					<select
						className="border-gray-400 h-[35px] rounded-lg border-2 w-[85%]"
						onChange={(e) => setCcnRbacModule(e.target.value)}
					>
						{list_rbac_modules
							?
							list_rbac_modules.rbac.map((rbac_module) => (
								<option
									key={rbac_module.ccn_rbac_module}
									value={rbac_module.ccn_rbac_module}
								>
									{rbac_module.rbac_module} </option>
							))
							:
							null
						}
					</select>
					<h2 className="font-arial text-[20px] my-2">Asignar Permisos</h2>
					<div className="grid grid-cols-3 w-[250px]">
						<Create />
						<label htmlFor="">Crear</label>
						<input
							name="create_access"
							onChange={() => setCreateAccess(!CreateAccess)}
							type="checkbox"
							className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
						/>
					</div>
					<div className="grid grid-cols-3 w-[250px]">
						<Read />
						<label htmlFor="">Leer</label>
						<input
							name="read_access"
							onChange={() => setReadAccess(!ReadAccess)}
							type="checkbox"
							className="h-5 w-5  rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
						/>
					</div>
					<div className="grid grid-cols-3 w-[250px]">
						<Update />
						<label>Actualizar</label>
						<input
							name="update_access"
							onChange={() => setUpdateAccess(!UpdateAccess)}
							type="checkbox"
							className="h-5 w-5  rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
						/>
					</div>
					<div className="grid grid-cols-3  w-[250px]">
						<Delete />
						<label>Eliminar</label>
						<input
							name="delete_access"
							onChange={() => setDeleteAccess(!DeleteAccess)}
							type="checkbox"
							className="h-5 w-5  rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
						/>
					</div>
					<input type="submit" className="bg-[#007367] my-5 mx-auto w-[78px] h-[34px] rounded-lg text-white" value="Asignar" />
				</form>
			</div>
			<div className="container m-auto overflow-y-scroll h-[45vh] rounded-lg shadow ">
				<table className="w-full border-gray-400 h-[35px] rounded-lg border-2">
					<thead className="bg-gray-50 border-b-2 border-gray-200">
						<tr>
							<th className="p-3 text-sm bg-[#F2F2F2] font-semibold tracking-wide text-center">
								RBAC MODULE
							</th>
							<th className="p-3 text-sm bg-[#F2F2F2] font-semibold tracking-wide text-center">
								PERMISOS
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 ">
						{list_rbac_by_role ? list_rbac_by_role.rbacByRole.map((i) => (
							<tr className="text-center" key={i.ccn_rbac}>
								<td className="p-3 text-xs text-left text-gray-700 whitespace-nowrap uppercase font-extrabold">
									{i.length != 0
										? list_rbac_modules.rbac.find(
											(module) =>
												module.ccn_rbac_module ===
												i.ccn_rbac_module
										).rbac_module
										: i.ccn_rbac_module}
								</td>

								<td className="flex">
									{i.create_access ? (
										<Create color={"#007367"} />
									) : (
										<Create color={"#73000C"} />
									)}
									{i.read_access ? (
										<Read color={"#007367"} />
									) : (
										<Read color={"#73000C"} />
									)}
									{i.update_access ? (
										<Update color={"#007367"} />

									) : (
										<Update color={"#73000C"} />
									)}
									{i.delete_access ? (
										<Delete color={"#007367"} />
									) : (
										<Delete color={"#73000C"} />
									)}
								</td>
							</tr>
						)) : null}
					</tbody>
				</table>
			</div>


		</div>
	);
}

export default RBAC;
