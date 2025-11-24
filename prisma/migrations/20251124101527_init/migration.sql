-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_comments_template`(`template_id`),
    INDEX `fk_comments_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `templates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `description` TEXT NOT NULL,
    `demo_url` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NULL,
    `rtl` BOOLEAN NOT NULL DEFAULT false,
    `score` INTEGER NULL,
    `sellCount` INTEGER NULL,
    `reviewCount` INTEGER NULL,
    `status` ENUM('active', 'draft') NULL DEFAULT 'active',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `categories` JSON NULL,
    `tags` JSON NULL,
    `features` JSON NULL,
    `addons` JSON NULL,
    `requirements` JSON NULL,

    UNIQUE INDEX `slug_UNIQUE`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(45) NULL,
    `firstname` VARCHAR(45) NULL,
    `lastname` VARCHAR(45) NULL,
    `avatar_url` VARCHAR(45) NULL,
    `status` ENUM('active', 'inactive', 'banned') NULL DEFAULT 'active',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `role` VARCHAR(45) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `fk_comments_template` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
