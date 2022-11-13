import { FC, useState } from "react";
import { Item } from "../../App";
import ActionButton from "../ActionButton";
import Meter from "../Meter";

type Props = {
	item: Item;
	gameState: any;
	setGameState: any;
};

const Option: FC<Props> = ({ item, gameState, setGameState }) => {
	const [amountOfActionsByCategory, setAmountOfActionsByCategory] =
		useState(0);

	return (
		<section>
			<section>
				<h2>{item.name}</h2>

				{item.limit ? (
					<Meter
						max={item.limit.amount}
						value={amountOfActionsByCategory}
					/>
				) : (
					<p>Ongelimiteerd</p>
				)}

				<strong>Minimale eisen per actie</strong>
				{item.required && (
					<>
						{Object.keys(item.required).length === 0 && (
							<p>Geen vereisten</p>
						)}
						{item.required.lifeXP && (
							<div>
								<span>Levens ervaring: </span>
								<span>{item.required.lifeXP}</span>
							</div>
						)}
						{item.required.socialXP && (
							<div>
								<span>Sociale ervaring: </span>
								<span>{item.required.socialXP}</span>
							</div>
						)}
						{item.required.workXP && (
							<div>
								<span>Werk ervaring: </span>
								<span>{item.required.workXP}</span>
							</div>
						)}
						{item.required.radius && (
							<div>
								<span>Actieradius: </span>
								<span>{item.required.radius}</span>
							</div>
						)}
						{item.required.money && (
							<div>
								<span>Kosten: </span>
								<span>{item.required.money.amount}</span>
								<span>per {item.required.money.basis}</span>
							</div>
						)}
					</>
				)}
				<ActionButton
					amountOfActionsByCategory={amountOfActionsByCategory}
					setAmountOfActionsByCategory={setAmountOfActionsByCategory}
					gameState={gameState}
					setGameState={setGameState}
					item={item}
				/>
			</section>
			<section>
				<strong>Je verdient:</strong>
				{item.earned.lifeXP && (
					<div>
						<span>Levens ervaring: </span>
						<span>{item.earned.lifeXP}</span>
					</div>
				)}
				{item.earned.socialXP && (
					<div>
						<span>Sociale ervaring: </span>
						<span>{item.earned.socialXP}</span>
					</div>
				)}
				{item.earned.workXP && (
					<div>
						<span>Werk ervaring: </span>
						<span>{item.earned.workXP}</span>
					</div>
				)}
				{item.earned.radius && (
					<div>
						<span>Actieradius: </span>
						<span>{item.earned.radius}</span>
					</div>
				)}
				{item.earned.money && (
					<div>
						<span>Kosten: </span>
						<span>{item.earned.money.amount}</span>
						<span>per {item.earned.money.basis}</span>
					</div>
				)}
			</section>
		</section>
	);
};

export default Option;
