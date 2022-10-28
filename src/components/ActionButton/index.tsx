import { FC, useState } from "react";
import { Item, XP } from "../../App";
import CountDown from "../CountDown";

type Props = {
	item: any;
	gameState: any;
	setGameState: any;
	isEnabled: any;
};

const ActionButton: FC<Props> = ({
	item,
	gameState,
	setGameState,
	isEnabled,
}) => {
	const [timerActive, setTimerActive] = useState(false);

	const action = (item: Item) => {
		const values = Object.entries(item.earned);
		const updated = values.reduce((prev, [key, value]) => {
			const gameStateValue = gameState[key as keyof XP];
			const v = value as number;

			if (key === "radius") {
				return {
					...prev,
					radius: v,
				};
			}
			return {
				...prev,
				[key]: gameStateValue + v,
			};
		}, {});
		setTimerActive(true);
		setGameState({
			...gameState,
			...updated,
		});
	};

	return (
		<button
			onClick={() => action(item)}
			disabled={isEnabled || timerActive}
		>
			<span>{item.name} uitvoeren </span>
			{timerActive && (
				<CountDown
					timerActive={timerActive}
					setTimerActive={setTimerActive}
					cooldown={item.cooldown}
				/>
			)}
		</button>
	);
};

export default ActionButton;
