import { FC, useState } from "react";
import { Basis, Item } from "../../App";
import ActionButton, { isEnabled } from "../ActionButton";
import Meter from "../Meter";
import styles from "./styles.module.css";
import classnames from "classnames";

type Props = {
	category: string;
	item: Item;
	gameState: any;
	setGameState: any;
	numberOfItems: number;
};

const Option: FC<Props> = ({
	category,
	item,
	gameState,
	setGameState,
	numberOfItems,
}) => {
	const [amountOfActionsByCategory, setAmountOfActionsByCategory] =
		useState(0);

	const isItemEnabled = isEnabled(item.required, gameState);
	const isLocalImage = !item.imageURL?.startsWith("https");
	const url = isLocalImage
		? `${process.env.PUBLIC_URL}/${item.imageURL}`
		: item.imageURL;

	const moneyTexts = {
		monthly: "per maand",
		weekly: "per week",
		"per-action": "per keer",
	};

	const moneyBasisText = moneyTexts[item.earned.money?.basis as Basis];

	return (
		<li
			className={classnames({
				[styles.disableItem]: !isItemEnabled,
				[styles.hide]: item.limit?.amount === amountOfActionsByCategory,
			})}
		>
			<section className={styles.itemInner}>
				<section className={styles.imageAndRequirements}>
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
						<div className={styles.notice}>
							<strong>
								Deze actie heeft een limiet
								<span className={styles.emoji}>⚠️</span>
							</strong>
							<Meter
								max={item.limit.amount}
								value={amountOfActionsByCategory}
							/>
						</div>
					) : (
						<strong className={styles.notice}>
							Deze actie is ongelimiteerd
							<span className={styles.emoji}>🤑</span>
						</strong>
					)}

					<section className={styles.requirements}>
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
							numberOfItems={numberOfItems}
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
							<strong>
								{item.earned.lifeXP > 0 && "+"}
								{item.earned.lifeXP}
							</strong>
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
							<strong>
								{item.earned.socialXP > 0 && "+"}
								{item.earned.socialXP}
							</strong>
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
							<strong>
								{item.earned.workXP > 0 && "+"}
								{item.earned.workXP}
							</strong>
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
							<strong>
								€{item.earned.money.amount > 0 && "+"}
								{item.earned.money.amount}
							</strong>
							{item.earned.money.basis ? (
								<span> {moneyBasisText}</span>
							) : (
								<span>
									{" "}
									Bedrag wordt per keer bij/afgeschreven
								</span>
							)}
						</div>
					)}
				</section>
			</section>
			{!isItemEnabled && (
				<div className={styles.unlockContainer}>
					<span className={styles.unlockText}>
						<span>Niet genoeg voor deze actie</span>
						<span className={styles.lockIcon}>🔒</span>
					</span>
					<section className={styles.requirements}>
						<span>
							Om actie <strong>"{item.name}"</strong> vrij te
							spelen heb je nodig:
						</span>
						{item.required && (
							<ul className={styles.requirementsList}>
								{Object.keys(item.required).length === 0 && (
									<p>Geen vereisten</p>
								)}
								{item.required.lifeXP && (
									<li>
										<span>Levens ervaring: </span>
										<strong>{item.required.lifeXP}</strong>
										<span>
											{" "}
											{gameState.lifeXP >=
											item.required.lifeXP
												? "✅"
												: "❌"}
										</span>
									</li>
								)}
								{item.required.socialXP && (
									<li>
										<span>Sociale ervaring: </span>
										<strong>
											{item.required.socialXP}
										</strong>
										<span>
											{" "}
											{gameState.socialXP >=
											item.required.socialXP
												? "✅"
												: "❌"}
										</span>
									</li>
								)}
								{item.required.workXP && (
									<li>
										<span>Werk ervaring: </span>
										<strong>{item.required.workXP}</strong>
										<span>
											{" "}
											{gameState.workXP >=
											item.required.workXP
												? "✅"
												: "❌"}
										</span>
									</li>
								)}
								{item.required.radius && (
									<li>
										<span>Actieradius: </span>
										<strong>{item.required.radius}</strong>
										<span>
											{" "}
											{gameState.radius >=
											item.required.radius
												? "✅"
												: "❌"}
										</span>
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
											<span>
												{" "}
												{gameState.money.amount >=
												item.required.money.amount
													? "✅"
													: "❌"}
											</span>
										</span>
									</li>
								)}
							</ul>
						)}
					</section>
				</div>
			)}
		</li>
	);
};

export default Option;
