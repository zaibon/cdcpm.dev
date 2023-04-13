const yearsOfExperience = (): number => {
	const now = new Date();
	const start = new Date(2014, 11, 1);
	return Math.abs(start.getFullYear() - now.getFullYear());
};

export const profile = {
	title: 'Software engineer',
	firstName: 'Christophe',
	lastName: 'de Carvalho Pereira Martins',
	introduction: `Software Engineer with ${yearsOfExperience()} years of experience in designing and developing scalable and efficient software solutions across diverse industries.  I am passionate about leveraging technology to create innovative solutions that make a positive impact on the world.`
};
