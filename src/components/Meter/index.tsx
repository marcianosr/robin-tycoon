import { FC } from "react";
import styles from "./styles.module.css";

type Props = {
	max: number;
	value: number;
	text?: string;
};

const Meter: FC<Props> = ({ max, value, text }) => {
	return (
		<section className={styles.meterContainer}>
			{text && <span>{text}</span>}

			<div className="meter-container">
				<span>0</span>
				<meter
					min={0}
					value={value}
					max={max}
					low={max / 3}
					high={max / 2}
					optimum={max / 1.5}
				></meter>
				<span>{max}</span>
			</div>
		</section>
	);
};

export default Meter;
