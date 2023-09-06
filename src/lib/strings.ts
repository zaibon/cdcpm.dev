export const ellipses = (input: string | null, maxLenght: number = 100) => {
	if (input == null) {
		return ""
	}
	return input.length > maxLenght ? input.substring(0, maxLenght) + '...' : input;
};
