CREATE TABLE `message_stamps` (
	`user_id` text NOT NULL,
	`stamp_id` text NOT NULL,
	`message_id` text NOT NULL,
	`count` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`stamp_id`, `user_id`),
	FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`pinned` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `message_stamps` (`user_id`);--> statement-breakpoint
CREATE INDEX `stamp_id_idx` ON `message_stamps` (`stamp_id`);--> statement-breakpoint
CREATE INDEX `message_id_idx` ON `message_stamps` (`message_id`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `message_stamps` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `message_stamps` (`updated_at`);--> statement-breakpoint
CREATE INDEX `user_id_index` ON `messages` (`user_id`);--> statement-breakpoint
CREATE INDEX `channel_id_index` ON `messages` (`channel_id`);--> statement-breakpoint
CREATE INDEX `created_at_index` ON `messages` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_index` ON `messages` (`updated_at`);--> statement-breakpoint
CREATE INDEX `pinned_index` ON `messages` (`pinned`);