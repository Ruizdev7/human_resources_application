import { Link } from "react-router-dom";
import { OficialLogo } from "../assets/images/SVG";

const FooterDashboard = () => {
    return (
        <div className='bg-[#192954] px-2 r-0 z-40'>
            <div className='lg:grid lg:grid-cols-3 grid grid-cols-1 mx-auto mt-[50px] text-[14px] text-white lg:w-[966px]'>
                <div className='mx-auto'><OficialLogo /></div>
                <div className='m-auto lg:justify-items-center col-span-2 lg:grid lg:grid-cols-3 grid grid-cols-1 text-center lg:text-start'>
                    <Link
                        to="/informedConsent-law-1581"
                    >
                        <strong >Tratamiento de Datos Personales</strong>
                    </Link>
                    <Link to="#"><strong>Linea Ética</strong></Link>
                    <Link to="#"><strong>Comité de Convivencia</strong></Link>
                </div>
                <div className='lg:col-span-3 mt-3 lg:w-[966px] text-[12px] mb-[26px]'>
                    <div className='border-t border-2-white'>
                        <p className='my-2'>
                            <strong>Copyright © 2023 Econabbis S.A.S. Una sociedad de Plena Global Holdings Inc.
                                Todos los derechos reservados. NIT 9009496846</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterDashboard;