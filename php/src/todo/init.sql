CREATE TABLE captcha (      
captcha_id int(11) NOT NULL, 
ts TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
token varchar(100) NOT NULL,
code TEXT NOT NULL
);

CREATE TABLE users (      
users_id int(11) NOT NULL, 
sessionToken varchar(100),
token varchar(100) NOT NULL,
name TEXT NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE projects (  
project_id int(11) NOT NULL, 
users_id int(11) NOT NULL,
token varchar(100) NOT NULL,
name TEXT NOT NULL,
position int(11)
);

CREATE TABLE tasks (  
task_id int(11) NOT NULL,
project_id int(11) NOT NULL,
token varchar(100) NOT NULL,
text TEXT NOT NULL,
status int(11) NOT NULL,
position int(11)
);


ALTER TABLE `captcha`
  ADD PRIMARY KEY (`captcha_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

ALTER TABLE `captcha`
  MODIFY `captcha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `users_id` (`users_id`);

ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`) USING BTREE,
  ADD KEY `project_id` (`project_id`);

ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `projects`
  ADD CONSTRAINT `users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tasks`
  ADD CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;