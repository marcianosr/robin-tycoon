import { FC } from "react";
import { months } from "../../App";
import Meter from "../Meter";
import styles from "./styles.module.css";

type Props = {
	gameState: any;
};

export const evolveAt = [
	{
		title: "Kluizenaar",
		progress: 0,
	},
	{
		title: "Starter",
		progress: 16,
	},
	{
		title: "Pakt de draad op",
		progress: 30,
	},
	{
		title: "Mogelijkheden in het leven en vindt zijn weg",
		progress: 52,
	},
	{
		title: "Stabiliteit en geniet van het leven",
		progress: 70,
	},
];

const Profile: FC<Props> = ({ gameState }) => {
	const progress = Math.round(
		gameState.progress.amount +
			(gameState.lifeXP + gameState.socialXP + gameState.workXP) / 10
	);

	return (
		<section className={styles.profileContainer}>
			<section className={styles.profile}>
				<div>
					<strong>Level: {gameState.level}</strong>
					<span>{gameState.progress.title}</span>
				</div>
				<div className={styles.baseMeter}>
					<small className={styles.uitpakText}>
						<span className={styles.emoji}>🎁</span>
						Uitpakmeter:{" "}
						<strong>{gameState.progress.amount}</strong>{" "}
						<span className={styles.emoji}>🎁</span>
					</small>
					<Meter max={100} value={gameState.progress.amount} />
				</div>
			</section>

			<section className={styles.stats}>
				<article className={styles.statItems}>
					<div>
						<span>Levens ervaring:</span>
						<strong>{gameState.lifeXP}</strong>
					</div>
					<div>
						<span>Sociaal: </span>
						<strong>{gameState.socialXP}</strong>
					</div>
					<div>
						<span>Werk ervaring:</span>
						<strong>{gameState.workXP}</strong>
					</div>
				</article>
				<article className={styles.statItems}>
					<div>
						<span>Bewegings radius:</span>
						<strong>{gameState.radius}</strong>
					</div>
					<div className={styles.money}>
						<div>
							<span>Maandelijks inkomen:</span>
							<strong> €{gameState.income}</strong>
						</div>
						<div>
							<span>Maandelijkse kosten:</span>
							<strong> €{gameState.costs}</strong>
						</div>
						<div>
							<span>Netto inkomen:</span>
							<strong>
								{" "}
								€{gameState.income + gameState.costs}
							</strong>
						</div>
					</div>
					<div>
						<span>Geld:</span>
						<strong> €{gameState.money}</strong>
					</div>
				</article>
			</section>
		</section>
	);
};

export default Profile;
