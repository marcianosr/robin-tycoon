import { FC, useState } from "react";
import { Item } from "../../App";
import ActionButton from "../ActionButton";
import Meter from "../Meter";
import styles from "./styles.module.css";

type Props = {
	category: string;
	item: Item;
	gameState: any;
	setGameState: any;
};

const Option: FC<Props> = ({ category, item, gameState, setGameState }) => {
	const [amountOfActionsByCategory, setAmountOfActionsByCategory] =
		useState(0);

	return (
		<section>
			<section>
				<h2>{item.name}</h2>
				{item.videoURL && (
					<iframe
						src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fjeffrey.beckers%2Fvideos%2F2974491055947757%2F&show_text=false&width=560&t=0"
						width="560"
						height="314"
						scrolling="no"
						frameBorder="0"
						allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
					></iframe>
				)}
				{item.imageURL && (
					<div className={styles.imageContainer}>
						<img
							src={`${process.env.PUBLIC_URL}/${item.imageURL}`}
							width={"100%"}
							height={"100%"}
						/>
					</div>
				)}
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
								<span>
									Je moet minimaal €
									{item.required.money.amount} hebben verdiend{" "}
								</span>
							</div>
						)}
					</>
				)}
				<ActionButton
					category={category}
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
						<small>*Actieradius is niet incrementeel</small>
					</div>
				)}
				{item.earned.money && (
					<div>
						{item.earned.money.amount < 0 && <span>Kosten: </span>}
						<span>{item.earned.money.amount}</span>
					</div>
				)}
			</section>
		</section>
	);
};

export default Option;
