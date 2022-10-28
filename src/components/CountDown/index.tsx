import { FC, useEffect, useState } from "react";

type Props = {
	cooldown: number;
	timerActive: boolean;
	setTimerActive: (active: boolean) => void;
};

const CountDown: FC<Props> = ({ cooldown, timerActive, setTimerActive }) => {
	const [timer, setTimer] = useState(cooldown);

	useEffect(() => {
		timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);

		if (timer === 0) setTimerActive(false);

		return () => clearTimeout(timer);
	}, [timerActive, timer]);

	return <span>{timer}</span>;
};

export default CountDown;
