import { FC, useState } from "react";
import { Item, RequirementEarned, XP } from "../../App";
import CountDown from "../CountDown";

type Props = {
	category: string;
	item: Item;
	gameState: any;
	setGameState: any;
	numberOfItems: number;
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
	numberOfItems,
}) => {
	const [timerActive, setTimerActive] = useState(false);

	const action = (item: Item) => {
		const values = Object.entries(item.earned);
		const unlockedItems = gameState.unlockedItems.length + 1;
		const progressValue = Math.round((unlockedItems / numberOfItems) * 100);

		const updated = values.reduce((prev, [key, value]) => {
			const gameStateValue = gameState[key as keyof XP];

			if (key === "radius") {
				return {
					...prev,
					radius: value,
				};
			}

			if (key === "money" && typeof value !== "number") {
				console.log("v", value.amount);
				return {
					...prev,
					money: gameStateValue + value.amount,
					income: value.amount > 0 ? value.amount : gameState.income,
					costs:
						value.amount < 0
							? gameState.costs + value.amount
							: gameState.costs,
				};
			}

			const hasUnlockedItem = gameState.unlockedItems.find(
				(found: Item) => found.name === item.name
			);

			// const categoryWithItems = gameState.data.find(
			// 	(c: any) => c.name === category
			// );

			// const otherCategories = gameState.data.filter(
			// 	(c: any) => c.name !== category
			// );

			// const removedItem = categoryWithItems.items.find(
			// 	(i: Item) => i.name === item.name
			// );

			// const updatedItems = categoryWithItems.items.filter((i: Item) => {
			// 	console.log(i.name, amountOfActionsByCategory);

			// 	return i;
			// 	// return (
			// 	// i.name !== removedItem.name
			// 	// && i.limit?.amount === amountOfActionsByCategory
			// 	// );
			// });

			// const updatedState = [
			// 	...otherCategories,
			// 	{
			// 		...categoryWithItems,
			// 		items: updatedItems,
			// 	},
			// ];

			return {
				...prev,
				[key]: gameStateValue + value,
				progress: {
					...gameState.progress,
					amount: progressValue,
				},
				// data: updatedState,
				unlockedItems: !hasUnlockedItem
					? [...gameState.unlockedItems, item]
					: gameState.unlockedItems,
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
