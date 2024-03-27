CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`image` text,
	`title` text,
	`publishedAt` integer,
	`content` text,
	`excerpt` text,
	`userId` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`firstName` text,
	`lastName` text,
	`email` text,
	`avatar` text
);
