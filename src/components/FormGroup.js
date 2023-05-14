import React from "react";

export default function FormGroup(props, { innerRef }) {
	const {
		id,
		label,
		type = "text",
		name,
		value,
		onChange,
		className,
		errorRequired,
		maxLength,
		charactercount,
	} = props;

	return (
		<div className="flex justify-between">
			<label htmlFor={id}>{label}</label>
			<input
				className="border border-indigo-800 border-1 ml-5 w-[60vw] max-w-[380px] mb-6 py-4 pl-4"
				required
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
