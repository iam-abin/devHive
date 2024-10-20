export const formatCurrency = (number: number): string => {
	const curr = number.toLocaleString("en-IN", {
		style: "currency",
		currency: "INR",
	});
	return curr;
};
