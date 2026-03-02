import React, { useState } from 'react';
import Taskbar from '../../taskbar/Taskbar';

import './Desktop.scss';
import { DragWindow } from '../../window/Window';
import Terminal from '../../window/windows/Terminal';

interface DesktopItem {
	text: string;
	icon: string;
	link?: string;
	content?: React.ReactNode;
}

interface WindowState {
	id: string;
	title: string;
	content: React.ReactNode;
	isMinimized: boolean;
	zIndex: number;
}

export const Desktop: React.FC = () => {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const [topZIndex, setTopZIndex] = useState(1);

	const desktopItems: DesktopItem[] = [
		{
			text: 'Recycle Bin',
			icon: 'recycleBin',
			content: <p>Recycle Bin is empty.</p>
		},
		{
			text: 'Computer',
			icon: 'computer',
			content: <p>About Me content.</p>
		},
        {
            text: 'Terminal',
            icon: 'console',
            content: <Terminal />
        },
		{
			text: 'My Projects',
			icon: 'dir-closed',
			content: <p>Project list.</p>
		},
		{
			text: 'My Github',
			icon: 'github',
			link: 'https://github.com/vulpya'
		}
	];

	const openWindow = (title: string, content: React.ReactNode) => {
		const existing = windows.find((w) => w.title === title);
		if (existing) {
			focusWindow(existing.id);
			return;
		}
		const newWin: WindowState = {
			id: crypto.randomUUID(),
			title,
			content,
			isMinimized: false,
			zIndex: topZIndex + 1
		};
		setWindows([...windows, newWin]);
		setTopZIndex((prev) => prev + 1);
	};

	const closeWindow = (id: string) => {
		setWindows((prev) => prev.filter((w) => w.id !== id));
	};

	const focusWindow = (id: string) => {
		setWindows((prev) =>
			prev.map((w) =>
				w.id === id
					? { ...w, isMinimized: false, zIndex: topZIndex + 1 }
					: w
			)
		);
		setTopZIndex((prev) => prev + 1);
	};

	const toggleWindow = (id: string) => {
		const win = windows.find((w) => w.id === id);
		if (!win) return;
		if (win.isMinimized) focusWindow(id);
		else
			setWindows((prev) =>
				prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
			);
	};

	return (
		<div id="desktop">
			<div className="desktop-items">
				{desktopItems.map((item) => (
					<div
						key={item.text}
						className="desktop-item"
						onDoubleClick={() => {
							if (item.link) {
								window.open(item.link, '_blank')?.focus();
								return;
							}
							openWindow(item.text, item.content);
						}}>
						<div className="icon-container">
							<i className={`icon ${item.icon}`} />
							<span>{item.text}</span>
						</div>
					</div>
				))}
			</div>
			{windows.map((win) => (
				<DragWindow
					key={win.id}
					id={win.id}
					title={win.title}
					width={300}
					height={200}
					allowMaximize
					zIndex={win.zIndex}
					isMinimized={win.isMinimized}
					onMinimize={toggleWindow}
					onClose={closeWindow}
					onFocus={focusWindow}>
					{win.content}
				</DragWindow>
			))}
			<Taskbar
				windows={windows}
				onTaskClick={toggleWindow}
				desktopItems={desktopItems}
			/>
		</div>
	);
};
