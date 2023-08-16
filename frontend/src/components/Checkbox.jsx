import React from "react";

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<div className="flex">
				<input
					className="flex"
					type="checkbox"
					ref={resolvedRef}
					{...rest}
				/>
			</div>
		</>
	);
});
