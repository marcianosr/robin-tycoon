import { FC, useEffect, useState } from "react";
import { Item, RequirementEarned, XP } from "../../App";
import CountDown from "../CountDown";

type Props = {
	category: string;
	item: Item;
	gameState: any;
	setGameState: any;
	amountOfActionsByCategory: number;
	setAmountOfActionsByCategory: (n: number) => void;
};

const ActionButton: FC<Props> = ({
	category,
	item,
	gameState,
	setGameState,
	amountOfActionsByCategory,
	setAmountOfActionsByCategory,
}) => {
	const [timerActive, setTimerActive] = useState(false);

	const action = (item: Item) => {
		const values = Object.entries(item.earned);
		const updated = values.reduce((prev, [key, value]) => {
			const gameStateValue = gameState[key as keyof XP];

			if (key === "radius") {
				return {
					...prev,
					radius: value,
				};
			}

			if (key === "money" && typeof value !== "number") {
				return {
					...prev,
					money: gameStateValue + value.amount,
					income: value.amount,
				};
			}

			return {
				...prev,
				[key]: gameStateValue + value,
			};
		}, {});
		setAmountOfActionsByCategory(amountOfActionsByCategory + 1);
		setTimerActive(true);
		setGameState({
			...gameState,
			...updated,
		});
	};

	const isEnabled = (requirement: RequirementEarned) => {
		if (!requirement) {
			return true;
		}

		const req = Object.entries(requirement).map(
			([key, value]: [unknown, any]) => {
				const gameKey = gameState[key as keyof XP];
				if (key === "money") {
					return gameState.money >= value.amount;
				}

				return gameKey >= value;
			}
		);
		return req.every((r) => r);
	};

	return (
		<button
			onClick={() => action(item)}
			disabled={
				!isEnabled(item.required) ||
				(item.limit &&
					amountOfActionsByCategory === item.limit.amount) ||
				timerActive
			}
		>
			{category === "werken" ? (
				<span>"Werken" uitvoeren</span>
			) : (
				<span>"{item.name}" uitvoeren </span>
			)}
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
