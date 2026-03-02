export type IconType =
	| 'recycleBin'
	| 'computer'
	| 'dir-closed'
	| 'console'
	| 'notepad'
	| 'shutdown'
	| 'settings'
	| 'logoff'
	| 'run'
	| 'png'
	| 'mp3'
	| 'github'
	| 'tune'
	| 'tsumugi'
	| 'megabonk-lab';

interface IconProps {
	text: string;
	type: IconType;
}

const Icon = ({ text, type }: IconProps) => {
	return (
		<div className="icon-container">
			<i className={`icon ${type}`} />
			<span>{text}</span>
		</div>
	);
};

export default Icon;
