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
		progressLevel: 0,
	},
	{
		title: "Starter",
		progressLevel: 16,
	},
	{
		title: "Pakt de draad op",
		progressLevel: 30,
	},
	{
		title: "Mogelijkheden in het leven en vindt zijn weg",
		progressLevel: 52,
	},
	{
		title: "Stabiliteit en geniet van het leven",
		progressLevel: 70,
	},
];

const Profile: FC<Props> = ({ gameState }) => (
	<section className={styles.profileContainer}>
		<section className={styles.profile}>
			<div>
				<strong>Level: {gameState.level}</strong>
				<span>{gameState.progress.title}</span>
			</div>
			<div className={styles.baseMeter}>
				<small>
					Uitpakmeter: <strong>{gameState.progress.amount} </strong>
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
				<div>
					<span>Bewegings radius:</span>
					<strong>{gameState.radius}</strong>
				</div>
				<div>
					<span>Geld:</span>
					<strong>€{gameState.money}</strong>
				</div>
				<div>
					<span>Maandelijks inkomen:</span>
					<strong>€{gameState.income}</strong>
				</div>
			</article>
		</section>
	</section>
);

export default Profile;
