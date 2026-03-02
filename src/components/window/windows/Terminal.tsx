import React, { useRef, useState } from 'react';

import './Terminal.scss';

const Terminal = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [output, setOutput] = useState<string[]>([
		'Welcome to vulpyaOS Terminal',
		'Type "help" for commands.'
	]);
	const [input, setInput] = useState('');

	const handleCommand = (cmd: string) => {
		const lower = cmd.toLowerCase();
		if (lower === 'help') {
			setOutput((prev) => [
				...prev,
				'> help',
				'Available commands: help, list, clear'
			]);
		} else if (lower === 'list') {
			setOutput((prev) => [
				...prev,
				'> list',
				'file1.txt',
				'file2.png',
				'script.js'
			]);
		} else if (lower === 'clear') {
			setOutput([]);
		} else {
			setOutput((prev) => [
				...prev,
				`> ${cmd}`,
				`Unknown command: ${cmd}`
			]);
		}
	};

	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault();
		if (!input.trim()) return;
		handleCommand(input.trim());
		setInput('');
	};

	const handleFocus = () => {
		inputRef.current?.focus();
	};

	return (
		<div className="cmd-folder" onClick={handleFocus}>
			<div className="cmd-output">
				{output.map((line, idx) => (
					<div key={idx}>{line}</div>
				))}
			</div>
			<form className="cmd-input-form" onSubmit={handleSubmit}>
				<span className="cmd-prompt">{'>'}</span>
				<input
					type="text"
					className="cmd-input"
					value={input}
					ref={inputRef}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					autoFocus
				/>
			</form>
		</div>
	);
};

export default Terminal;
