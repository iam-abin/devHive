export const formatCurrency = (number: any) => {
	const curr = number.toLocaleString("en-IN", {
		style: "currency",
		currency: "INR",
	});
	return curr;
};
