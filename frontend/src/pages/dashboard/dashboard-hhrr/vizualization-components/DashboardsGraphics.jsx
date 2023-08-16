import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import axios from "axios";
import CountUp from 'react-countup';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InfoButton } from '../../../../assets/images/SVG';
import { PolarArea, Line, Pie, Bar } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);



const Tooltips = ({ text, children }) => {
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(!open);
    };

    return (
        <>
            <div className="relative w-full ">
                <div
                    className="inline-block w-full"
                    onClick={openModal}
                >
                    {children}
                </div>

            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative">
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
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base font-bold leading-6 text-gray-900">
                                                    {text[0] ? text[0].area : null}
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4">
                                                <div className='gap-x-5 p-1 flex font-bold'>
                                                    <h4 className='w-[50px]'>CCN</h4>
                                                    <h4 className='w-[200px]'>Nombre del Empleado</h4>
                                                    <h4 className='w-[100px]'>Rol</h4>
                                                    <h4 className='w-[100px]'>Area</h4>
                                                </div>
                                                {text.map((employee) => {
                                                    return (
                                                        <>
                                                            <div className='gap-x-5 p-4 flex'>
                                                                <h4 className='w-[50px]'>{employee.ccn_employee}</h4>
                                                                <h4 className='w-[200px]'>{employee.full_name_employee}</h4>
                                                                <h4 className='w-[100px]'>{employee.role}</h4>
                                                                <h4 className='w-[100px]'>{employee.area}</h4>
                                                            </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

const Graphics = () => {

    const [dataForMetrics, setDataForMetrics] = useState(null)
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")

    const getDataForMetrics = async () => {
        try {
            const resData = await axios(
                `${import.meta.env.VITE_API_ADDRESS}metrics_for_main_data`
            );
            setDataForMetrics(resData.data[0].MetricsForMainDashboard);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getDataForMetrics();
    }, []);
    //Area for employees
    const BarOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    const BarData = {
        labels: dataForMetrics ? dataForMetrics.employee_for_area.map((area) => area.area) : "",
        datasets: [
            {
                label: 'Empleados X Area',
                data: dataForMetrics ? dataForMetrics.employee_for_area.map((employee_qty) => employee_qty.employee_qty) : 0,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    //Gender employees in the company
    const PolarData = {
        labels: ['Femenino', 'Masculino', 'Otro',],
        datasets: [
            {
                label: 'Empleados X Genero',
                data: [
                    dataForMetrics ? dataForMetrics.employee_for_gender.female_employees : 0,
                    dataForMetrics ? dataForMetrics.employee_for_gender.male_employees : 0,
                    dataForMetrics ? dataForMetrics.employee_for_gender.employees_others : 0,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //Employees for region
    const PieData = {
        labels: dataForMetrics ? dataForMetrics.recidencie_cities.map((city) => city.city) : "",
        datasets: [
            {
                label: '# of Votes',
                data: dataForMetrics ? dataForMetrics.recidencie_cities.map((city) => city.quantity) : "",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //Employee for type of relationship
    const LineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    const LineData = {
        labels: dataForMetrics ? dataForMetrics.employee_type_of_relationship.map((relationship) => relationship.relationship) : "",
        datasets: [
            {
                fill: true,
                label: 'Tipo de Vinculación',
                data: dataForMetrics ? dataForMetrics.employee_type_of_relationship.map((qty_relationship) => qty_relationship.qty_relationship) : 0,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <>
            <div className='container mx-auto p-5 overflow-x-auto mt-[20px] ' >
                <div
                    className="w-[250px] h-[100px] flex gap-x-2 mr-2 text-center rounded-lg bg-white "
                >
                    {dataForMetrics ? dataForMetrics.employee_for_area.map((employee) => {
                        return (
                            <Tooltips text={employee.employees}>
                                <>
                                    <div className='container hover:text-[#333333]  hover:border-[#333333] hover:border text-[#B2B2B2] rounded-lg cursor-pointer border-2 border-gray-200 flex '>
                                        <div >
                                            <h2 className="mx-5 my-1 border-b-2 border-gray-200 hover:border-[#333333] hover:border-b-2 text-[20px] w-[150px]">
                                                <strong>{employee.area_abbreviation}</strong>
                                            </h2>
                                            <strong>
                                                <CountUp
                                                    className="custom-count text-[35px]  "
                                                    start={100}
                                                    end={employee.employee_qty}
                                                    duration={5}
                                                    useEasing={true}
                                                    separator=" "
                                                    decimal=","
                                                />
                                            </strong>
                                        </div>
                                    </div>
                                </>
                            </Tooltips>
                        );
                    }
                    ) : null}
                </div>
            </div>
            <div className='container flex flex-row my-5 items-center gap-x-5 mx-auto border-b-2 rounded-lg border-gray-200'>
                <div className='basis-1/3 p-5'>
                    <h2 className='text-2xl uppercase font-bold'>Distribución de empleados por tipo de vinculación laboral en la empresa <button onClick={() => {
                        setOpen(true)
                        setText("Esta es la gráfica de distribución de empleados por tipo de vinculación laboral, para esta grafica debe tener en cuenta que el empleado debe estar activo en y registrado en los datos de vinculación laboral.")
                    }} className='mx-1'>
                        <InfoButton />
                    </button></h2>
                </div>
                <div className='basis-2/3 h-[60vh]'>
                    <Line options={LineOptions} data={LineData} />
                </div>
            </div>
            <div className='container flex flex-row  items-center my-5 gap-x-5 mx-auto border-b-2 rounded-lg border-gray-200'>
                <div className='basis-2/3  h-[60vh] my-[32px]'>
                    <Pie data={PieData} />
                </div>
                <div className='basis-1/3 p-5 flex'>
                    <h2 className='text-2xl uppercase font-bold'>Distribución de empleados por region en la que reciden <button onClick={() => {
                        setOpen(true)
                        setText("Esta es la gráfica de distribución del personal de la empresa por ciudad en la que reside, para esta grafica debe tener en cuenta que el empleado este registrado activo y registrado tanto en los datos de vinculación laboral como en datos demográficos.")
                    }} className='mx-1'>
                        <InfoButton />
                    </button></h2>
                </div>
            </div>
            <div className='container flex flex-row my-5 gap-x-5 items-center mx-auto border-b-2  rounded-lg border-gray-200'>
                <div className='basis-1/3 p-5 flex'>
                    <h2 className='text-2xl uppercase font-bold'>Distribución de empleados por genero
                        <button className='mx-1' onClick={() => {
                            setOpen(true)
                            setText("Esta en la grafica que describe la distribución de los empleados por género, para esta grafica es necesario que el empleado este activo y registrado en los datos de vinculación laboral.")
                        }}>
                            <InfoButton />
                        </button>
                    </h2>
                </div>
                <div className='basis-2/3 h-[60vh] my-[32px]'>
                    <PolarArea data={PolarData} />
                </div>
            </div>
            <div className='container flex flex-row my-5 gap-x-5 items-center mx-auto border-b-2  rounded-lg border-gray-200'>
                <div className='basis-2/3 h-[60vh] '>
                    <Bar options={BarOptions} data={BarData} />
                </div>
                <div className='basis-1/3 p-5'>
                    <h2 className='text-2xl uppercase font-bold'>Distribución de empleados por el area <button onClick={() => {
                        setOpen(true)
                        setText("Esta grafica describe la distribución de empleados por área, debe tener en cuenta que el empleado debe estar activo en datos de vinculación laboral.")
                    }} className='mx-1'>
                        <InfoButton />
                    </button></h2>
                </div>
            </div>
            <div className='fixed flex justify-center bottom-5 mx-auto z-30 justify-items-center text-white rounded-lg  w-full'>
                <div className='border border-black bg-gray-600 text-white flex gap-5 opacity-80 p-2 rounded-lg'>
                    <button
                        className="bg-gray-900 gap-x-2 w-[200px] font-bold rounded justify-between shadow-md py-2 px-5 flex items-center"
                    >
                        <p className='text-[30px] h-full border-r-2 border-white px-2'>{dataForMetrics ? dataForMetrics.active_employees : 0}</p>
                        <p
                            onClick={() => {
                                setOpen(true)
                                setText("Para este calculo debe tener en cuenta que el empleado debe estar registrado, activo y con datos de vinculación laboral.")
                            }}
                        >Cantidad de Empleados</p>
                    </button>
                    <button
                        className="bg-gray-900 gap-x-2 w-[200px] justify-between font-bold rounded hover:text-white shadow-md py-2 px-5 inline-flex items-center"
                        onClick={() => {
                            setOpen(true)
                            setText("Este es el promedio de edad de los empleados registrados, activos y con datos de vinculación laboral. ")
                        }}
                    >
                        <p className='text-[30px] h-full border-r-2 border-white px-2'>{dataForMetrics ? dataForMetrics.avg_for_age : 0}</p>
                        <p>Promedio de Edad</p>
                    </button>
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative">
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
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base text-center font-bold leading-6 text-gray-900">
                                                    <h4 className='font-bold '>DESCRIPCIÓN DE LA GRAFICA</h4>
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4">
                                                <div className='gap-x-5 justify-center items-center flex-col p-1 flex w-[400px]'>
                                                    <p>{text}</p>
                                                </div>
                                            </div>
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

const MainDashboard = () => {
    return (
        <>
            <Graphics />
        </>
    )
}

export { MainDashboard, Graphics };