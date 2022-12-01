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

export type Basis = "monthly" | "weekly" | "per-action";

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
		costs: 0,
		progress: {
			amount: 0,
		},
		won: false,
		data: data.game.categories,
		unlockedItems: [],
	});

	const [activeCategory, setActiveCategory] = useState<ShortNames>("living");

	const [showPopup, setShowPopup] = useState(false);
	const [fakeBuyButtonText, setFakeBuyButtonText] = useState(false);

	const onSelectCategory = (cat: ShortNames) => setActiveCategory(cat);

	const getAllItems = data.game.categories
		.map((category) => category.items)
		.flat();

	useEffect(() => {
		const getCurrentEvolveState = evolveAt
			.filter((evolve) => evolve.progress < gameState.progress.amount)
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
			if (!gameState.won) {
				setGameState({
					...gameState,
					time: { ...gameState.time, week: gameState.time.week + 1 },
					progress: {
						...gameState.progress,
						amount:
							gameState.progress.amount > 0
								? gameState.progress.amount
								: gameState.progress.amount,
					},
				});
			}
		}, 6000);

		return () => {
			clearTimeout(t);
		};
	}, [gameState]);

	useEffect(() => {
		if (gameState.time.week % 4 === 0 && !gameState.won)
			setGameState({
				...gameState,
				time: {
					...gameState.time,
					month: gameState.time.month + 1,
				},
				money: gameState.money + gameState.income + gameState.costs,
			});
	}, [gameState.time.week]);

	useEffect(() => {
		if (gameState.time.week % 52 === 0 && !gameState.won)
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
		if (gameState.progress.amount >= 100) {
			// Stop the game, show dialog

			winGame();
		}
	}, [gameState.progress.amount]);

	const winGame = () =>
		setGameState({
			...gameState,
			won: true,
			progress: {
				...gameState.progress,
				amount: 100,
			},
		});
	return (
		<div className="App">
			<button style={{ display: "none" }} onClick={winGame}>
				Cheat
			</button>
			{gameState.progress.amount >= 100 && (
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
					{gameState.progress.amount === 100 && (
						<div className="backdrop"></div>
					)}
					<dialog
						className="gedicht"
						open={gameState.progress.amount === 100}
					>
						<article>
							<h1>Beste Robin,</h1>
							<p>
								Sinter-lexxxus is weer in 't land, jauwwwww maak
								plaats ga aan de kant.
							</p>
							<p>
								Deze Sint heeft je leven al jaren bijgehouden,
								ook toen je je spullen van je oude appartement
								naar je nieuwe appartement versjouwde.{" "}
							</p>
							<p>
								Ik negeer lekker die AVG privacy wetgeving, nee
								met al die weetjes van mensen blijft ik bestaan
								en krijg ik als oude Sint weer een opleving.{" "}
							</p>
							<p>
								Ik als een voorganger op Feesboek zou je kunnen
								zeggen, want zoals je zojuist hebt gezien, heb
								ik allerlei elementen in jouw leven weten vast
								te leggen.
							</p>
							<p>
								Van Kornetten bij Crescendo tot een leipe
								scooter tot het kopen van leaugue of legends
								skins tot afspreken met je matties, al die
								dingen kosten zoals je weet makkelijk een paar
								barkies.
							</p>
							<p>
								Al die dingen die je zonet hebt kunnen
								herbeleven is wie je bent, en de Sint kan
								zeggen: Hij vindt je een fijne vent.
							</p>
							<p>
								Met al je opgedane ervaring en C aan je zij, is
								deze Sint-Lexxus met zijn Pieten echt KAPOT
								blij.
							</p>
							<p>
								Tot slot moet je me één ding beloven, weet dat
								ik je in de gaten hou in elk plan wat je
								probeert te bekokstoven.{" "}
							</p>
							<p>Dus, zeg ik het nog eens maar:</p>
							<strong style={{ color: "red" }}>
								Robin, maak me niet kwaad komend jaar.
							</strong>
							<p>Groetjes, Sint en Piet</p>
						</article>
					</dialog>
				</>
			)}
			<header>
				<Profile gameState={gameState} />
			</header>

			{showPopup && (
				<dialog open={showPopup}>
					<ul>
						<li>
							{!fakeBuyButtonText && (
								<article>
									<span>
										Elixer pakket: sociale ervaring elixer
										en levens ervaring elixer
									</span>
									<span>
										+500 sociale XP en +500 levens ervaring
									</span>
									<div>
										2,50 euro (via iDeal)
										<img
											width={40}
											height={40}
											src="https://www.ideal.nl/img/logo/ideal-logo-1024.png"
										/>
									</div>
									<div>
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
									</div>
								</article>
							)}

							{fakeBuyButtonText && (
								<>
									<span>
										Gast... niet alles kun je kopen. Omdat
										je hier in bent getrapt zetten we je
										weer even een stapje terug
									</span>
									<button
										onClick={() => setShowPopup(!showPopup)}
									>
										Klik weg
									</button>
								</>
							)}
						</li>
					</ul>
				</dialog>
			)}
			<section className="contentContainer">
				<div>
					<h1>
						Vrijgespeeld: {gameState.unlockedItems.length}/
						{getAllItems.length}
					</h1>
					<section className="small-card-container">
						{gameState.unlockedItems.map((item: Item) => (
							<section className="small-card">
								<span>{item.name}</span>
							</section>
						))}
					</section>
				</div>
				<div className="category-container-buttons">
					<h1>Kies een categorie: </h1>
					<div className="category-buttons">
						{data.game.categories.map((cat) => (
							<button
								onClick={(e) => {
									onSelectCategory(
										cat.shortName as ShortNames
									);
								}}
							>
								{cat.name}
							</button>
						))}
					</div>
				</div>
				<h1>Voer een actie uit:</h1>
				{gameState.data.map((category) => (
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
									numberOfItems={getAllItems.length}
									gameState={gameState}
									setGameState={setGameState}
								/>
							))}
						</ul>
					</section>
				))}
			</section>
			<section>
				<span>
					Aanbieding: levens elixer kopen om je ervaring te boosten:
				</span>
				<button onClick={() => setShowPopup(true)}>Kopen</button>
			</section>
		</div>
	);
}

export default App;
