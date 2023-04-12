export const link = (link: string | undefined): string | undefined => {
	if (link) {
		return link.startsWith('http') ? link : `/images/${link}`;
	} else {
		return undefined;
	}
};
