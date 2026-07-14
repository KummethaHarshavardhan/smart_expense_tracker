function PieChart({ data }) {
	const defaultData = [
		{ label: "Food", value: 400, color: "#4caf50" },
		{ label: "Transport", value: 150, color: "#2196f3" },
		{ label: "Shopping", value: 250, color: "#ff9800" },
		{ label: "Bills", value: 200, color: "#f44336" },
	];

	const slices = data && data.length ? data : defaultData;
	const total = slices.reduce((sum, s) => sum + (s.value || 0), 0) || 1;

	let cumulative = 0;

	const radius = 80;
	const center = 100;

	const polarToCartesian = (cx, cy, r, angleInDeg) => {
		const angleInRad = ((angleInDeg - 90) * Math.PI) / 180.0;
		return {
			x: cx + r * Math.cos(angleInRad),
			y: cy + r * Math.sin(angleInRad),
		};
	};

	const describeArc = (cx, cy, r, startAngle, endAngle) => {
		const start = polarToCartesian(cx, cy, r, endAngle);
		const end = polarToCartesian(cx, cy, r, startAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
		return [
			`M ${cx} ${cy}`,
			`L ${start.x} ${start.y}`,
			`A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
			`Z`,
		].join(" ");
	};

	return (
		<div className="chart-card pie-card">
			<h3>Category Breakdown</h3>

			<div className="pie-chart-wrapper">
				<svg width="200" height="200" viewBox="0 0 200 200" className="pie-chart">
					{slices.map((slice, i) => {
						const startAngle = (cumulative / total) * 360;
						cumulative += slice.value || 0;
						const endAngle = (cumulative / total) * 360;

						return (
							<path
								key={i}
								d={describeArc(center, center, radius, startAngle, endAngle)}
								fill={slice.color || `hsl(${(i * 60) % 360},70%,50%)`}
							/>
						);
					})}
				</svg>

				<ul className="legend">
					{slices.map((s, i) => (
						<li key={i} className="legend-item">
							<span className="legend-color" style={{ background: s.color }}></span>
							<span className="legend-label">{s.label}</span>
							<span className="legend-value">{s.value}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default PieChart;

