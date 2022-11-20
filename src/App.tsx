import { useEffect, useState } from "react";
import "./App.css";
import data from "./data/index.json";
import Option from "./components/Option";
import Meter from "./components/Meter";
import Confetti from "react-confetti";
import Profile, { evolveAt } from "./components/Profile";
import classnames from "classnames";

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
	videoURL?: string;
	imageURL?: string;
	// required?: RequirementEarned;
	required?: any;
	earned: RequirementEarned;
	costs?: any;
	cooldown: number;
	limit?: {
		amount: number;
	};
};

export type Stats = XP & { money?: Money };

type Key = { [key in keyof XP]: number };
type ShortNames = "social" | "living" | "verhicle" | "work";

export const months = [
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
		time: {
			month: 1,
			week: 1,
			year: 2010,
		},
		income: 0,
		progress: {
			amount: 23,
		},
	});

	const [activeCategory, setActiveCategory] = useState<ShortNames>("social");

	const [showPopup, setShowPopup] = useState(false);
	const [fakeBuyButtonText, setFakeBuyButtonText] = useState(false);

	const onSelectCategory = (cat: ShortNames) => setActiveCategory(cat);

	useEffect(() => {
		const getCurrentEvolveState = evolveAt
			.filter(
				(evolve) => evolve.progressLevel < gameState.progress.amount
			)
			.at(-1);

		setGameState({
			...gameState,
			progress: {
				...gameState.progress,
				...getCurrentEvolveState,
			},
		});
	}, [gameState.progress.amount]);

	useEffect(() => {
		const t = setTimeout(() => {
			setGameState({
				...gameState,
				time: { ...gameState.time, week: gameState.time.week + 1 },
			});
		}, 8500);

		return () => {
			clearTimeout(t);
		};
	}, [gameState]);

	useEffect(() => {
		const progress =
			gameState.lifeXP + gameState.socialXP + gameState.workXP;

		if (gameState.time.week % 4 === 0)
			setGameState({
				...gameState,
				time: {
					...gameState.time,
					month: gameState.time.month + 1,
				},
				money: gameState.money + gameState.income,
				progress: {
					...gameState.progress,
					amount: gameState.progress.amount + progress - 5,
				},
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

	useEffect(() => {
		if (gameState.progress.amount === 100) {
			// Stop the game, show dialog
		}
	}, [gameState.progress.amount]);

	return (
		<div className="App">
			{gameState.progress.amount === 100 && (
				<>
					<Confetti
						width={window.innerWidth}
						height={window.innerHeight}
						colors={[
							"#f4c430",
							"#ff00ff",
							"#ace1af",
							"#e34234",
							"#2a52be",
							"#967bb6",
						]}
					/>
					<dialog open={gameState.progress.amount === 100}>
						<h1>Gedicht</h1>
					</dialog>
				</>
			)}
			<header>
				<Profile gameState={gameState} />
				<section>
					<span>Advertenties</span>
					<button onClick={() => setShowPopup(true)}>Kopen</button>
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
									<span>
										5 euro (via iDeal)
										<img
											width={40}
											height={40}
											src="https://www.ideal.nl/img/logo/ideal-logo-1024.png"
										/>
									</span>
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
			<section className="contentContainer">
				<h1>Kies een categorie: </h1>
				<div className="category-buttons">
					{data.game.categories.map((cat) => (
						<button
							onClick={(e) => {
								onSelectCategory(cat.shortName as ShortNames);
							}}
						>
							{cat.name}
						</button>
					))}
				</div>
				<h1>Voer een actie uit:</h1>
				{data.game.categories.map((category) => (
					<section
						className={classnames("category", {
							["showCategory"]:
								category.shortName === activeCategory,
						})}
					>
						<h1>{category.name}</h1>
						<span>{category.description}</span>
						<ul className="categoryOptions">
							{category.items.map((item: Item) => (
								<Option
									category={category.name}
									item={item}
									gameState={gameState}
									setGameState={setGameState}
								/>
							))}
						</ul>
					</section>
				))}
			</section>
			<section className="timeContainer">
				<Meter
					max={51}
					value={gameState.time.week}
					text={`Week ${gameState.time.week}`}
				/>
				<Meter
					max={11}
					value={gameState.time.month}
					text={`${months[gameState.time.month - 1]}`}
				/>
				<Meter
					max={2022}
					value={gameState.time.year}
					text={`${gameState.time.year}`}
				/>
			</section>
		</div>
	);
}

export default App;
