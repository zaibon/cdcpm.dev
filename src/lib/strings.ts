export const ellipses = (input: string, maxLenght: number = 100) => {
	return input.length > maxLenght ? input.substring(0, maxLenght) + '...' : input;
};
