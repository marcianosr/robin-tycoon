import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./data/index.json";
import CountDown from "./components/CountDown";
import ActionButton from "./components/ActionButton";

export type XP = {
	lifeXP?: number;
	socialXP?: number;
	workXP?: number;
	radius?: number;
};

type Basis = "monthly" | "weekly";

type Money = {
	amount: number;
	basis?: Basis;
};

type RequirementEarned = Partial<XP> & { money: Money };

export type Item = {
	name: string;
	required: RequirementEarned;
	earned: RequirementEarned;
	cooldown: number;
};

export type Stats = XP & { money: Money };

type Key = { [key in keyof XP]: number };
type Level = "zwerver" | "rijk";

function App() {
	const [gameState, setGameState] = useState({
		lifeXP: 0,
		socialXP: 0,
		workXP: 0,
		money: 0,
		radius: 0,
		level: "zwerver",
	});

	const isEnabled = (requirement: RequirementEarned) => {
		if (!requirement) return true;

		const req = Object.entries(requirement).map(
			([key, value]: [unknown, any]) => {
				const gameKey = gameState[key as keyof XP];
				if (key === "money") {
					return gameState.money >= value;
				}

				return gameKey >= value;
			}
		);

		return req.every((r) => r);
	};

	return (
		<div className="App">
			<header>
				<h1>Robin Schildmeijer</h1>
				<section>
					<strong>Level: {gameState.level}</strong>
				</section>

				<section>
					<strong>Status</strong>

					<article>
						<div>
							<label>Levens ervaring: </label>
							<span>{gameState.lifeXP}</span>
						</div>
						<div>
							<label>Sociale ervaring: </label>
							<span>{gameState.socialXP}</span>
						</div>
						<div>
							<label>Werk ervaring: </label>
							<span>{gameState.workXP}</span>
						</div>
						<div>
							<label>Radius: </label>
							<span>{gameState.radius}</span>
						</div>
						<div>
							<label>Geld: </label>
							<span>{gameState.money}</span>
						</div>
					</article>
				</section>
			</header>
			<section>
				<ul style={{ display: "flex" }}>
					{data.game.categories.map((item) => (
						<li>
							<h1>{item.name}</h1>
							<ul>
								{item.items.map((item) => {
									const requirementItems =
										(item.required as Stats) || {};
									const earnedItems =
										(item.earned as Stats) || {};
									return (
										<>
											<section>
												<h2>{item.name}</h2>
												<strong>
													Minimale eisen per actie
												</strong>
												{Object.keys(requirementItems)
													.length === 0 && (
													<p>Geen vereisten</p>
												)}
												{requirementItems.lifeXP && (
													<div>
														<span>
															Levens ervaring:{" "}
														</span>
														<span>
															{
																requirementItems.lifeXP
															}
														</span>
													</div>
												)}
												{requirementItems.socialXP && (
													<div>
														<span>
															Sociale ervaring:{" "}
														</span>
														<span>
															{
																requirementItems.socialXP
															}
														</span>
													</div>
												)}
												{requirementItems.workXP && (
													<div>
														<span>
															Werk ervaring:{" "}
														</span>
														<span>
															{
																requirementItems.workXP
															}
														</span>
													</div>
												)}
												{requirementItems.workXP && (
													<div>
														<span>
															Actieradius:{" "}
														</span>
														<span>
															{
																requirementItems.radius
															}
														</span>
													</div>
												)}
												{requirementItems.money && (
													<div>
														<span>Kosten: </span>
														<span>
															{
																requirementItems
																	.money
																	.amount
															}
														</span>
														<span>
															per{" "}
															{
																requirementItems
																	.money.basis
															}
														</span>
													</div>
												)}

												<ActionButton
													isEnabled={
														!isEnabled(
															item.required as RequirementEarned
														)
													}
													gameState={gameState}
													setGameState={setGameState}
													item={item}
												/>
											</section>
											<section>
												<strong>Je verdient:</strong>
												{earnedItems.lifeXP && (
													<div>
														<span>
															Levens ervaring:{" "}
														</span>
														<span>
															{earnedItems.lifeXP}
														</span>
													</div>
												)}
												{earnedItems.socialXP && (
													<div>
														<span>
															Sociale ervaring:{" "}
														</span>
														<span>
															{
																earnedItems.socialXP
															}
														</span>
													</div>
												)}
												{earnedItems.workXP && (
													<div>
														<span>
															Werk ervaring:{" "}
														</span>
														<span>
															{earnedItems.workXP}
														</span>
													</div>
												)}
												{earnedItems.radius && (
													<div>
														<span>
															Actieradius:{" "}
														</span>
														<span>
															{earnedItems.radius}
														</span>
													</div>
												)}
												{earnedItems.money && (
													<div>
														<span>Kosten: </span>
														<span>
															{
																earnedItems
																	.money
																	.amount
															}
														</span>
														<span>
															per{" "}
															{
																earnedItems
																	.money.basis
															}
														</span>
													</div>
												)}
											</section>
										</>
									);
								})}
							</ul>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default App;
