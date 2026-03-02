import React, { useState, useRef, useEffect } from 'react';
import './Window.scss';

interface DragWindowProps {
	id: string;
	title: string;
	width?: number;
	height?: number;
	icon?: string;
	allowMaximize?: boolean;
	isMinimized?: boolean;
	zIndex?: number;
	children: React.ReactNode;
    onMinimize: (id: string) => void;
	onClose: (id: string) => void;
	onFocus: (id: string) => void;
}

export const DragWindow: React.FC<DragWindowProps> = ({
	id,
	title,
	width,
	height,
	allowMaximize = false,
	isMinimized = false,
	zIndex = 1,
	onClose,
	onMinimize,
	onFocus,
	children
}) => {
	const windowRef = useRef<HTMLDivElement>(null);

	const [position, setPosition] = useState({ x: 50, y: 50 });
	const [isDragging, setDragging] = useState(false);
	const [dragDiff, setDragDiff] = useState({ x: 0, y: 0 });
	const [isMaximized, setMaximized] = useState(false);

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!(e.target as HTMLElement).closest('.win-title')) return;
		setDragging(true);
		setDragDiff({ x: e.clientX - position.x, y: e.clientY - position.y });
		onFocus(id);
		e.stopPropagation();
	};

	const onMouseUp = () => {
		setDragging(false);
	};

	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			if (!isDragging || isMaximized) return;

			const newX = e.clientX - dragDiff.x;
			const newY = e.clientY - dragDiff.y;

			setPosition({
				x: Math.max(0, Math.min(newX, window.innerWidth - (width ?? 0))),
				y: Math.max(0, Math.min(newY, window.innerHeight - (height ?? 0)))
			});
		};

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};
	}, [isDragging, dragDiff, isMaximized, width, height]);

	if (isMinimized) return null;

	return (
		<div
			ref={windowRef}
			className={`win ${isMaximized ? 'fullscreen' : ''}`}
			style={{
				width: isMaximized ? '100%' : width,
				height: isMaximized ? '100%' : height,
				transform: isMaximized
					? 'none'
					: `translate(${position.x.toString()}px, ${position.y.toString()}px)`,
				position: 'absolute',
				zIndex
			}}
			onMouseDown={() => {
				onFocus(id);
			}}>
			{/* Title Bar */}
			<div className="win-title" onMouseDown={onMouseDown}>
				<div className="win-title-text">{title}</div>
				<div className="win-title-controls">
					<div
						className="button minimize"
						onClick={() => {
							onMinimize(id);
						}}
						title="Minimize"
					/>
					{allowMaximize && (
						<div
							className="button maximize"
							onClick={() => {
								setMaximized(!isMaximized);
							}}
							title={isMaximized ? 'Restore' : 'Maximize'}
						/>
					)}
					<div
						className="button close"
						onClick={() => {
							onClose(id);
						}}
						title="Close"
					/>
				</div>
			</div>

			<div className="win-content">{children}</div>
		</div>
	);
};
