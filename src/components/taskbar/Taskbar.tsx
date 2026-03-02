import type { DesktopItem } from '../views/Desktop/Desktop';
import type { WindowState } from '../window/Window';

import './Taskbar.scss';

interface TaskbarProps {
	windows: WindowState[];
	onTaskClick: (id: string) => void;
	desktopItems: DesktopItem[];
}

const Taskbar = ({
	windows,
	onTaskClick,
	desktopItems
}: TaskbarProps) => {
	return (
		<div id="taskbar">
			<div id="start-button">Start</div>
			<div id="taskbar-items">
				{windows.map((win) => {
					const icon = desktopItems.find(
						(d) => d.text === win.title
					)?.icon;
					return (
						<div
							key={win.id}
							className={`taskbar-item ${!win.isMinimized ? 'focused' : ''}`}
							onClick={() => {
								onTaskClick(win.id);
							}}>
							<i className={`icon ${icon ?? ''}`} />
						</div>
					);
				})}
			</div>
			<div id="taskbar-system-tray">
				<span id="taskbar-time">
					{new Date().toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit'
					})}
				</span>
			</div>
		</div>
	);
};

export default Taskbar;
