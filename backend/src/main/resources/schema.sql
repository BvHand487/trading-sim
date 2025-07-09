create table if not exists users(
    id serial primary key,
    username varchar(255) unique not null,
    password varchar(255) not null
);

create table if not exists wallets(
    id serial primary key,
    user_id int not null,
    name varchar(255) not null,
    balance real not null,
    created_at timestamp not null,

    unique (user_id, name),
    foreign key(user_id) references users(id) ON DELETE CASCADE
);

create table if not exists currencies(
    id serial primary key,
    symbol varchar(12) not null,
    name varchar(255) not null,
    logo_url varchar(255)
);

create table if not exists transactions(
    id serial primary key,
    wallet_id int not null,
    currency_id int not null,
    type varchar(10) not null check (type in ('BUY', 'SELL')),
    quantity real not null,
    price real not null,
    created_at timestamp not null,

    foreign key(wallet_id) references wallets(id) ON DELETE CASCADE,
    foreign key(currency_id) references currencies(id)
);

create table if not exists holdings(
    id serial primary key,
    wallet_id int not null,
    currency_id int not null,
    amount real not null,

    unique (wallet_id, currency_id),
    foreign key(wallet_id) references wallets(id) ON DELETE CASCADE,
    foreign key(currency_id) references currencies(id)
);
