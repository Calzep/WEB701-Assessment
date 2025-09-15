drop table if exists ServicePurchase;
drop table if exists [Service];
drop table if exists [User];
go

create table [User] (
	Id				int identity not null,
	Email			varchar(256) not null,
	[Password]		varchar(256) not null,
	FirstName		varchar(50) null,
	LastName		varchar(100) not null,
	userType		varchar(20) not null,
	tokens			int default 0 not null,
	constraint PK__User primary key (Id),
	constraint UQ__User_Email unique (Email)
);

create table [Service] (
	Id				int identity not null,
	[Name]			varchar(100) not null,
	[Description]	varchar(500) not null,
	[Image]			varchar(256) null,
	TokenCost		int default 0 not null,
	RegisteredBy	int null,
	[Type]			varchar(20) not null,
	constraint PK__Service primary key (Id),
	constraint FK__Service__User
		foreign key (RegisteredBy) references [User] (Id)
		on delete set null
);

create table ServicePurchase (
	Id					int identity not null,
	[Service]			int not null,
	[User]				int not null,
	Date				DateTime not null,
	Status				varchar(20) default 'pending',
	TemporalTokenCost	int null,
	constraint PK__ServicePurchase primary key (Id),
	constraint FK__ServicePurchase__Service
		foreign key ([Service]) references [Service] (Id)
		on delete cascade,
	constraint FK__ServicePurchase_User
		foreign key ([User]) references [User] (id)
		on delete cascade
);
go