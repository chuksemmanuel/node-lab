import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
	// Create user
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: 'John Doe',
	// 		email: 'John@gmail.com',
	// 	},
	// });

	// Get all users
	// const users = await prisma.user.findMany();

	// console.log(users);

	//Create article and associate it with user
	// const article = await prisma.article.create({
	// 	data: {
	// 		title: 'Johns first article',
	// 		body: 'This is my first article',
	// 		author: {
	// 			connect: {
	// 				id: 1,
	// 			},
	// 		},
	// 	},
	// });

	// Get all articles
	const articles = await prisma.article.findMany({
		include: {
			author: true,
		},
	});

	// Create a user and article and associate them
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: 'Sarah Smith',
	// 		email: 'sarah@gmail.com',
	// 		articles: {
	// 			create: {
	// 				title: 'Sarah first article',
	// 				body: 'This is my first article',
	// 			},
	// 		},
	// 	},
	// });

	// const users = await prisma.user.findMany({
	// 	include: {
	// 		articles: true,
	// 	},
	// });

	// const anotherArticle = await prisma.article.create({
	// 	data: {
	// 		title: 'Sample Article',
	// 		body: 'This is a sample article',
	// 		author: {
	// 			connect: {
	// 				id: 2,
	// 			},
	// 		},
	// 	},
	// });

	// const sarahsArticles = await prisma.article.findMany({
	// 	where: {
	// 		author: {
	// 			id: 2,
	// 		},
	// 	},
	// });

	// Update data
	// const user = await prisma.user.update({
	// 	where: {
	// 		id: 1,
	// 	},
	// 	data: {
	// 		name: 'John Doe Jr',
	// 	},
	// });

	// Remove data
	// const article = await prisma.article.delete({
	// 	where: {
	// 		id: 2,
	// 	},
	// });

	// console.log(article);
	console.log(articles);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
