import React from "react";

interface InputProps {
	id: string;
	onChange: any;
	value: string;
	label: string;
	type: string;
}

const InputComponent: React.FC<InputProps> = ({
	id,
	label,
	onChange,
	type,
	value
}) => {
	return (
		<div className="relative">
			<input
				className="block rounded-xl px-7 py-5 w-full text-base text-white bg-neutral-600 focus:outline-none focus:ring-0 peer cursor-pointer"
				placeholder=" "
				id={id}
				value={value}
				onChange={onChange}
				type={type}
			/>
			<label
				htmlFor={id}
				className="absolute text-base text-zinc-300 z-10 left-5 
                duration-150
                transform
                top-2
                peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75
                peer-focus:-translate-y-2 
                origin-[0]
                ">
				{label}
			</label>
		</div>
	);
};

export default InputComponent;
