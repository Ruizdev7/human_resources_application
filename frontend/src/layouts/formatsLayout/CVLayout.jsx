import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from '@headlessui/react'
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
	BasicData,
	EmergencyContact,
	AffiliationData,
	FamilyNucleus,
	HealthCondition,
	Relationship,
	DemographicData,
	SociodemographicData,
	DataSheet,
} from "../../pages/formatsPages/CVData";
import { SociodemographicDataCV, DemographicDataCV, BasicCV, NucleusFamilyCV, EmergenciContact, HealthConditionCV, RelationshipCV, SSCV } from "../../assets/images/SVG";
import { useSelector } from "react-redux";

export function ItemsData({ MyComponent, contador, setContador }) {

	return (
		<>
			<Transition.Root show={contador} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setContador}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto relative w-[80vh] ">
										<Transition.Child
											as={Fragment}
											enter="ease-in-out duration-500"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="ease-in-out duration-500"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
												<button
													type="button"
													className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
													onClick={() => setContador(false)}
												>
													<span className="sr-only">Close panel</span>
												</button>
											</div>
										</Transition.Child>
										<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">


											<div className="relative mt-6 flex-1 px-4 sm:px-6">{MyComponent}</div>

										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	)
}

const CVLayout = () => {

	const nombre_usuario_actual = useSelector((state) => state);
	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0

	const { ccn_employee } = useParams();
	const [open, setOpen] = useState(true)
	const [Image, setImage] = useState(null);

	const [component, setComponent] = useState(<BasicData ccn_employee={ccn_employee || current_user} />);

	useEffect(() => {
		async function fetchImage() {
			const respImage = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}employee/images/${ccn_employee || current_user}`
			);
			setImage(`data:image/jpeg;base64,${respImage.data.image_b64}`);
		}
		fetchImage();
	}, []);

	useEffect(() => {
		setOpen(!open)
	}, [component]);
	return (
		<>
			<div className="flex flex-col mx-auto mt-[30px] lg:w-[55%] gap-y-10">
				<div className="mx-auto">
					<button
						className="text-md uppercase py-2"
						onClick={() =>
							setComponent(
								<BasicData ccn_employee={ccn_employee || current_user} />
							)
						}
					>
						<BasicCV />
					</button>
				</div>

				<div className="flex">
					<div className="mx-auto">
						<button
							className="text-md uppercase  py-2"
							onClick={() =>
								setComponent(
									<SociodemographicData
										ccn_employee={ccn_employee || current_user}
									/>
								)
							}
						>
							<SociodemographicDataCV />
						</button>
					</div>
					<div className="mx-auto">
						<button
							className="text-md uppercase  py-2"
							onClick={() =>
								setComponent(
									<AffiliationData
										ccn_employee={ccn_employee || current_user}
									/>
								)
							}
						>
							<SSCV />
						</button>
					</div>
				</div>

				<div className="flex items-center	">
					<div className="mx-auto ">
						<button
							className="text-md uppercase  py-2"
							onClick={() =>
								setComponent(
									<DemographicData
										ccn_employee={ccn_employee || current_user}
									/>
								)
							}
						>
							<DemographicDataCV />
						</button>
					</div>
					<div className="mx-auto w-32 h-32 rounded-full overflow-hidden">
						<img src={Image} alt="" className="w-full h-full object-cover" />
					</div>
					<div className="mx-auto">
						<button
							className="text-md uppercase  py-2"
							onClick={() =>
								setComponent(
									<HealthCondition
										ccn_employee={ccn_employee || current_user}
									/>
								)
							}
						>
							<HealthConditionCV />
						</button>
					</div>
				</div>
				<div className="flex">
					<div className="mx-auto">
						<button
							className="text-md uppercase  py-2"
							onClick={() =>
								setComponent(
									<Relationship ccn_employee={ccn_employee || current_user} />
								)
							}
						>
							<RelationshipCV />
						</button>
					</div>
					<div className="mx-auto">
						<button
							className="text-md uppercase  py-2"
							onClick={() =>
								setComponent(
									<EmergencyContact
										ccn_employee={ccn_employee || current_user}
									/>
								)
							}
						>
							<EmergenciContact />
						</button>
					</div>
				</div>
				<div className="mx-auto">
					<button
						className="text-md uppercase  py-2"
						onClick={() =>
							setComponent(
								<FamilyNucleus
									ccn_employee={ccn_employee || current_user}
								/>
							)
						}
					>
						<NucleusFamilyCV />
					</button>
				</div>
			</div>
			<ItemsData MyComponent={component} contador={open} setContador={setOpen} />
		</ >
	);
};

export default CVLayout;
