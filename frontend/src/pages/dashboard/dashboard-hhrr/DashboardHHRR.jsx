import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import axios from "axios";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Link } from "react-router-dom";

import BarCharExample from "./vizualization-components/BarCharExample";
import AreaCharExample from "./vizualization-components/AreaCharExample";
import AreaCharExample2 from "./vizualization-components/AreaCharExample2";
import LineCharExample from "./vizualization-components/LineCharExample";
import DashboardStats1 from "./vizualization-components/DashboardStats1";
import DashboardStats2 from "./vizualization-components/DashboardStats2";
import DashboardStats3 from "./vizualization-components/DashboardStats3";
import DashboardStats4 from "./vizualization-components/DashboardStats4";
import PieChartExample from "./vizualization-components/PieCharExample";
import RadarCharExample from "./vizualization-components/RadarCharExample";
import ComposedChartExample from "./vizualization-components/ComposedChartExample";

const DashboardHHRR = () => {
	// Define el layout de la cuadrícula
	const layout = [
		{ i: "a", x: 0, y: 0, w: 3, h: 1.5 },
		{ i: "b", x: 3, y: 0, w: 3, h: 1.5 },
		{ i: "c", x: 6, y: 0, w: 3, h: 1.5 },
		{ i: "d", x: 9, y: 0, w: 3, h: 1.5 },
		{ i: "e", x: 0, y: 1, w: 12, h: 6 },
		{ i: "f", x: 0, y: 1, w: 12, h: 6 },
		{ i: "g", x: 0, y: 1, w: 12, h: 6 },
		{ i: "h", x: 0, y: 1, w: 12, h: 6 },
		{ i: "i", x: 0, y: 1, w: 12, h: 6 },
		{ i: "j", x: 0, y: 1, w: 12, h: 6 },
		{ i: "k", x: 0, y: 1, w: 12, h: 6 },
	];

	return (
		<>
			<GridLayout
				className="z-0 hover:z-50"
				layout={layout}
				cols={12}
				rowHeight={60}
				width={1200}
			>
				<div className="bg-white rounded-lg shadow-lg" key="a">
					<DashboardStats1 />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="b">
					<DashboardStats2 />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="c">
					<DashboardStats3 />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="d">
					<DashboardStats4 />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="e">
					<BarCharExample />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="f">
					<AreaCharExample />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="g">
					<AreaCharExample2 />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="h">
					<LineCharExample />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="i">
					<ComposedChartExample />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="j">
					<PieChartExample />
				</div>
				<div className="bg-white rounded-lg shadow-lg" key="k">
					<RadarCharExample />
				</div>
			</GridLayout>
		</>
	);
};

export default DashboardHHRR;
