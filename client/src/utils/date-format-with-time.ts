export const formatDateWithTime = (dateString: string) => {
	const date = new Date(dateString);

	const formattedDateTime = date.toLocaleString("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	 // Extract individual components
	 const [datePart, timePart] = formattedDateTime.split(', ');
	 const [month, day, year] = datePart.split('/');

	  // Format as day/month/year
	  const formattedDate = `${day}/${month}/${year} ${timePart}`;

	return formattedDate;
};
