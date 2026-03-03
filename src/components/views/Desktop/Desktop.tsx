import React, { useState } from 'react';
import DragWindow, { type WindowState } from '../../window/Window';
import Taskbar from '../../taskbar/Taskbar';

import Icon, { type IconType } from '../../Icon/Icon';
import Terminal from '../../window/windows/Terminal';

import './Desktop.scss';
import Project from '../../Project/Project';
import MegabonkLab from '../../MegabonkLab/MegabonkLab';

export interface DesktopItem {
	text: string;
	icon: IconType;
	link?: string;
	content?: React.ReactNode;
	fullscreen?: boolean;
	allowMaximize?: boolean;
}

export const Desktop = () => {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const [topZIndex, setTopZIndex] = useState(1);

	const desktopItems: DesktopItem[] = [
		{
			text: 'Recycle Bin',
			icon: 'recycleBin',
			content: <p>Recycle Bin is empty.</p>
		},
		{
			text: 'My Projects',
			icon: 'dir-closed',
            allowMaximize: false,
			content: <Project />
		},
		{
			text: 'Console',
			icon: 'console',
			content: <Terminal />
		},
		{
			text: 'Megabonk Lab',
			icon: 'megabonk-lab',
			content: <MegabonkLab />,
			fullscreen: true,
			allowMaximize: false
		},
		{
			text: 'My Github',
			icon: 'github',
			link: 'https://github.com/vulpya'
		}
	];

	const openWindow = (
		title: string,
		content: React.ReactNode,
		fullscreen = false,
		allowMaximize = true
	) => {
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
			allowMaximize,
			zIndex: topZIndex + 1,
			fullscreen
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
						onClick={() => {
							if (item.link) {
								window.open(item.link, '_blank')?.focus();
								return;
							}
							openWindow(
								item.text,
								item.content,
								item.fullscreen,
								item.allowMaximize
							);
						}}>
						<Icon text={item.text} type={item.icon} />
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
					allowMaximize={win.allowMaximize}
					zIndex={win.zIndex}
					isMinimized={win.isMinimized}
					fullscreen={win.fullscreen}
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
