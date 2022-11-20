import { FC, useState } from "react";
import { Item } from "../../App";
import ActionButton, { isEnabled } from "../ActionButton";
import Meter from "../Meter";
import styles from "./styles.module.css";
import classnames from "classnames";

type Props = {
	category: string;
	item: Item;
	gameState: any;
	setGameState: any;
};

const Option: FC<Props> = ({ category, item, gameState, setGameState }) => {
	const [amountOfActionsByCategory, setAmountOfActionsByCategory] =
		useState(0);

	const isItemEnabled = isEnabled(item.required, gameState);
	const isLocalImage = !item.imageURL?.startsWith("https");
	const url = isLocalImage
		? `${process.env.PUBLIC_URL}/${item.imageURL}`
		: item.imageURL;

	return (
		<li
			className={classnames({
				[styles.disableItem]: !isItemEnabled,
			})}
		>
			<section className={styles.itemInner}>
				<section>
					<h2>{item.name}</h2>
					{item.videoURL && (
						<iframe
							src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fjeffrey.beckers%2Fvideos%2F2974491055947757%2F&show_text=false&width=560&t=0"
							width="560"
							height="300"
							scrolling="no"
							frameBorder="0"
							allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
						></iframe>
					)}
					{item.imageURL && (
						<div className={styles.imageContainer}>
							<img src={url} width={"100%"} height={"100%"} />
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

					<section className={styles.requirements}>
						<strong>Eisen voor deze actie:</strong>
						{item.required && (
							<ul className={styles.requirementsList}>
								{Object.keys(item.required).length === 0 && (
									<p>Geen vereisten</p>
								)}
								{item.required.lifeXP && (
									<li>
										<span>Levens ervaring: </span>
										<strong>{item.required.lifeXP}</strong>
									</li>
								)}
								{item.required.socialXP && (
									<li>
										<span>Sociale ervaring: </span>
										<strong>
											{item.required.socialXP}
										</strong>
									</li>
								)}
								{item.required.workXP && (
									<li>
										<span>Werk ervaring: </span>
										<strong>{item.required.workXP}</strong>
									</li>
								)}
								{item.required.radius && (
									<li>
										<span>Actieradius: </span>
										<strong>{item.required.radius}</strong>
									</li>
								)}
								{item.required.money && (
									<li>
										<span>
											Je moet minimaal
											<strong>
												{" "}
												€{item.required.money.amount}
											</strong>{" "}
											hebben verdiend{" "}
										</span>
									</li>
								)}
							</ul>
						)}
						<ActionButton
							category={category}
							amountOfActionsByCategory={
								amountOfActionsByCategory
							}
							setAmountOfActionsByCategory={
								setAmountOfActionsByCategory
							}
							gameState={gameState}
							setGameState={setGameState}
							item={item}
						/>
					</section>
				</section>

				<section className={styles.earned}>
					{item.earned.lifeXP && (
						<div
							className={classnames(styles.badge, {
								[styles.red]: item.earned.lifeXP < 0,
								[styles.green]: item.earned.lifeXP > 0,
							})}
						>
							{item.earned.lifeXP < 0 && <span>Kosten: </span>}
							<span>Levens ervaring: </span>
							<strong>+{item.earned.lifeXP}</strong>
						</div>
					)}
					{item.earned.socialXP && (
						<div
							className={classnames(styles.badge, {
								[styles.red]: item.earned.socialXP < 0,
								[styles.green]: item.earned.socialXP > 0,
							})}
						>
							<span>Sociale ervaring: </span>
							<strong>+{item.earned.socialXP}</strong>
						</div>
					)}
					{item.earned.workXP && (
						<div
							className={classnames(styles.badge, {
								[styles.red]: item.earned.workXP < 0,
								[styles.green]: item.earned.workXP > 0,
							})}
						>
							<span>Werk ervaring: </span>
							<strong>+{item.earned.workXP}</strong>
						</div>
					)}
					{item.earned.radius && (
						<div>
							<span>Actieradius: </span>
							<strong>{item.earned.radius}</strong>
							<small>*Actieradius is niet incrementeel</small>
						</div>
					)}
					{item.earned.money && (
						<div
							className={classnames(styles.badge, {
								[styles.red]: item.earned.money.amount < 0,
								[styles.green]: item.earned.money.amount > 0,
							})}
						>
							<span>Geld: </span>
							<strong>{item.earned.money.amount}</strong>
						</div>
					)}
				</section>
			</section>
			{!isItemEnabled && (
				<span className={styles.unlockText}>
					<span className={styles.lockIcon}>🔒</span>
					<span>Nog niet vrijgespeeld</span>
				</span>
			)}
		</li>
	);
};

export default Option;
