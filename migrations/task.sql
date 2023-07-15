create table tasks
(
    id        int auto_increment,
    name      varchar(255)          null,
    completed boolean default false null,
    constraint tasks_pk
    primary key (id)
);