import type { IconType } from '../Icon/Icon';
import Icon from '../Icon/Icon';

import './Project.scss';

export interface ProjectItem {
	text: string;
	icon: IconType;
	link: string;
}

const Projects = () => {
	const projects: ProjectItem[] = [
		{
			text: 'Megabonk Lab',
			icon: 'megabonk-lab',
			link: 'https://github.com/vulpya/megabonk-lab'
		},
		{
			text: 'Bocchi The Cookie',
			icon: 'bocchi-the-cookie',
			link: 'https://github.com/vulpya/bocchi-the-cookie'
		},
		{
			text: 'The Binding of Bocchi',
			icon: 'the-binding-of-bocchi',
			link: 'https://github.com/vulpya/the-binding-of-bocchi'
		}
	];

	return (
		<div className="dir-content">
			{projects.map((project) => (
				<div
					key={project.text}
					className="desktop-item"
					onClick={() =>
						window.open(project.link, '_blank')?.focus()
					}>
					<Icon text={project.text} type={project.icon}></Icon>
				</div>
			))}
		</div>
	);
};

export default Projects;
