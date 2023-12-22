CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`icon_file_id` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS `user_id_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `stamp_id_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `message_id_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `created_at_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `updated_at_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `user_id_index`;--> statement-breakpoint
DROP INDEX IF EXISTS `channel_id_index`;--> statement-breakpoint
DROP INDEX IF EXISTS `created_at_index`;--> statement-breakpoint
DROP INDEX IF EXISTS `updated_at_index`;--> statement-breakpoint
DROP INDEX IF EXISTS `pinned_index`;--> statement-breakpoint
CREATE INDEX `users_name_idx` ON `users` (`name`);--> statement-breakpoint
CREATE INDEX `users_updated_at_idx` ON `users` (`updated_at`);--> statement-breakpoint
CREATE INDEX `message_stamps_user_id_idx` ON `message_stamps` (`user_id`);--> statement-breakpoint
CREATE INDEX `message_stamps_stamp_id_idx` ON `message_stamps` (`stamp_id`);--> statement-breakpoint
CREATE INDEX `message_stamps_message_id_idx` ON `message_stamps` (`message_id`);--> statement-breakpoint
CREATE INDEX `message_stamps_created_at_idx` ON `message_stamps` (`created_at`);--> statement-breakpoint
CREATE INDEX `message_stamps_updated_at_idx` ON `message_stamps` (`updated_at`);--> statement-breakpoint
CREATE INDEX `messages_user_id_idx` ON `messages` (`user_id`);--> statement-breakpoint
CREATE INDEX `messages_channel_id_idx` ON `messages` (`channel_id`);--> statement-breakpoint
CREATE INDEX `messages_created_at_idx` ON `messages` (`created_at`);--> statement-breakpoint
CREATE INDEX `messages_updated_at_idx` ON `messages` (`updated_at`);--> statement-breakpoint
CREATE INDEX `messages_pinned_idx` ON `messages` (`pinned`);