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
		const progressValue = values.reduce((acc, [key, value]: [any, any]) => {
			if (key === "lifeXP" || key === "socialXP" || key === "workXP") {
				return Math.round((acc + value) / 10);
			}

			return acc;
		}, 0);

		const updated = values.reduce((prev, [key, value]) => {
			const gameStateValue = gameState[key as keyof XP];
			// const progressValue = Math.round(2);

			if (key === "radius") {
				return {
					...prev,
					radius: value,
				};
			}

			if (key === "money" && typeof value !== "number") {
				console.log("value", value, item.name);
				return {
					...prev,
					money: gameStateValue + value.amount,
					income: value.amount > 0 ? value.amount : gameStateValue,
					costs: value.amount < 0 ? value.amount : gameState.costs,
				};
			}

			return {
				...prev,
				[key]: gameStateValue + value,
				actionsActive: [
					...gameState.actionsActive,
					{ name: item.name, isRunning: true },
				],
				progress: {
					...gameState.progress,
					amount: gameState.progress.amount + progressValue,
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

	useEffect(() => {
		if (gameState.actionsActive.length > 0) {
			console.log(item.name);

			const remove = gameState.actionsActive.find(
				(action: any) => action.name === item.name
			);

			// setGameState({
			// 	...gameState,
			// 	actionsActive: [
			// 		...gameState.actionsActive,
			// 	]
			// })

			// console.log(remove, "2322");
		}

		// setGameState(
		// 	gameState.actionsActive.filter(
		// 		(action: string) => action === item.name
		// 	)
		// );
	}, [timerActive]);

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
