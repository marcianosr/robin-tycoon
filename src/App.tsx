import { useEffect, useState } from "react";
import "./App.css";
import data from "./data/index.json";
import Option from "./components/Option";
import Meter from "./components/Meter";

export type XP = {
	lifeXP?: number;
	socialXP?: number;
	workXP?: number;
	radius?: number;
};

type Basis = "monthly" | "weekly";

type Money = {
	amount: number;
	basis?: string;
};

export type RequirementEarned = Partial<XP> & { money?: Money };

export type Item = {
	name: string;
	// required: RequirementEarned;
	required?: any;
	earned: RequirementEarned;
	cooldown: number;
	limit?: {
		amount: number;
	};
};

export type Stats = XP & { money?: Money };

type Key = { [key in keyof XP]: number };
type Level =
	| "starter"
	| "kluizenaar"
	| "levensgenieter"
	| "familieman"
	| "rich guy robin"
	| "gamenerd";

const months = [
	"Januari",
	"Febuari",
	"Maart",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Augustus",
	"September",
	"Oktober",
	"November",
	"December",
];

function App() {
	const [gameState, setGameState] = useState({
		lifeXP: 0,
		socialXP: 0,
		workXP: 0,
		money: 0,
		radius: 0,
		level: "starter",
		time: {
			month: 1,
			week: 1,
			year: 2010,
		},
		income: 0,
	});

	const [showPopup, setShowPopup] = useState(false);
	const [fakeBuyButtonText, setFakeBuyButtonText] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => {
			setGameState({
				...gameState,
				time: { ...gameState.time, week: gameState.time.week + 1 },
			});
		}, 10000);

		return () => {
			clearTimeout(t);
		};
	}, [gameState]);

	useEffect(() => {
		if (gameState.time.week % 4 === 0)
			setGameState({
				...gameState,
				time: {
					...gameState.time,
					month: gameState.time.month + 1,
				},
				money: gameState.money + gameState.income,
			});
	}, [gameState.time.week]);

	useEffect(() => {
		if (gameState.time.week % 52 === 0)
			setGameState({
				...gameState,
				time: {
					...gameState.time,
					year: gameState.time.year + 1,
					month: 1,
					week: 1,
				},
			});
	}, [gameState.time.month]);

	return (
		<div className="App">
			<header>
				<h1>Robin Schildmeijer</h1>
				<section>
					<strong>Level: {gameState.level}</strong>
				</section>

				<section>
					<Meter
						max={51}
						value={gameState.time.week}
						text={`Week ${gameState.time.week}`}
					/>
					<Meter
						max={11}
						value={gameState.time.month}
						text={`Maand ${months[gameState.time.month - 1]}`}
					/>
					<Meter
						max={2022}
						value={gameState.time.year}
						text={`Jaar ${gameState.time.year}`}
					/>
				</section>

				<section>
					<strong>Status</strong>

					<article>
						<div>
							<label>Levens ervaring:</label>
							<span>{gameState.lifeXP}</span>
						</div>
						<div>
							<label>Sociaal: </label>
							<span>{gameState.socialXP}</span>
						</div>
						<div>
							<label>Werk ervaring:</label>
							<span>{gameState.workXP}</span>
						</div>
						<div>
							<label>Bewegings radius:</label>
							<span>{gameState.radius}</span>
						</div>
						<div>
							<label>Geld:</label>
							<span>{gameState.money}</span>
						</div>
						<div>
							Maandelijks inkomen:
							<span>{gameState.income}</span>
						</div>
					</article>

					<section>
						<span>Advertenties</span>
						<button onClick={() => setShowPopup(true)}>
							Kopen
						</button>
					</section>
				</section>
			</header>

			{showPopup && (
				<dialog open={showPopup}>
					<ul>
						<li>
							{!fakeBuyButtonText && (
								<article>
									<span>Levens elixer</span>
									<span>
										+100 sociale XP en +100 levens ervaring
									</span>
									<span>5 euro</span>
									<button
										onClick={() => {
											setFakeBuyButtonText(true);
											setGameState({
												...gameState,
												lifeXP: -200,
												socialXP: -200,
												money: -200,
											});
										}}
									>
										Koop
									</button>
								</article>
							)}

							{fakeBuyButtonText && (
								<span>
									Gast... niet alles kun je kopen. Omdat je
									hier in bent getrapt zetten we je weer even
									een stapje terug
								</span>
							)}
						</li>
					</ul>
				</dialog>
			)}
			<section>
				<ul style={{ display: "flex" }}>
					{data.game.categories.map((item) => (
						<li>
							<h1>{item.name}</h1>
							<ul>
								{item.items.map((item: Item) => (
									<Option
										item={item}
										gameState={gameState}
										setGameState={setGameState}
									/>
								))}
							</ul>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default App;
