import { FC } from "react";

type Props = {
	max: number;
	value: number;
	text?: string;
};

const Meter: FC<Props> = ({ max, value, text }) => {
	return (
		<>
			{text && <span>{text}</span>}

			<div className="meter-container">
				<span>0</span>
				<meter min={0} value={value} max={max}></meter>
				<span>{max}</span>
			</div>
		</>
	);
};

export default Meter;
