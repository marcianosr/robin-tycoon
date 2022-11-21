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

export const isEnabled = (requirement: RequirementEarned, gameState: any) => {
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
					income: value.amount > 0 ? value.amount : gameStateValue,
					costs: value.amount < 0 ? value.amount : gameStateValue,
				};
			}

			return {
				...prev,
				[key]: gameStateValue + value,
				progress: {
					amount: gameState.progress.amount,
				},
			};
		}, {});
		setAmountOfActionsByCategory(amountOfActionsByCategory + 1);
		setTimerActive(true);
		setGameState({
			...gameState,
			...updated,
		});
	};

	return (
		<button
			onClick={() => action(item)}
			disabled={
				!isEnabled(item.required, gameState) ||
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
