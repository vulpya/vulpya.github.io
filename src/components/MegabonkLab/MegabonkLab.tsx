import './MegabonkLab.scss';

const URL = 'https://vulpya.github.io/megabonk-lab';

const MegabonkLab = () => {
    return (
		<div id="megabonk-lab">
			<span
				onClick={() => {
					window.open(URL, '_blank')?.focus();
				}}>
				Visit the Website
			</span>
			<iframe src={URL}></iframe>
		</div>
	);
}

export default MegabonkLab