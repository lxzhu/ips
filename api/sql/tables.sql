
use ips;
drop table if exists ips_user;
create table ips_user(
	UserId bigint auto_increment primary key,
	UserName nvarchar(100) not null unique,
	Password nvarchar(36) not null,
	Email nvarchar(100) not null unique,
	IsAdmin bit not null default 0,
	IsLocked bit not null default 0,
	CreatedOn datetime not null,
	ModifiedOn datetime
);
drop table  if exists ips_session;
create table ips_session(
	SessionId bigint auto_increment primary key,
	UserId bigint not null references ips_user(UserId),
	ExpireWindowSeconds int not null default 120,
	CreatedOn datetime not null,
	ModifiedOn datetime
);

drop table if exists ips_product_type;
create table ips_product_type(
	ProductTypeId bigint primary key,
	Name nvarchar(100) not null,
	DisplayName nvarchar(100) not null,
    ParentProductType bigint references ips_product_type(ProductTypeId),
	CreatedOn datetime not null,
	ModifiedOn datetime
);
drop table if exists ips_product_category;
create table ips_product_category(
	CategoryId bigint auto_increment primary key,
	Name nvarchar(100) not null,
	HasChildren bit not null,
	ParentCategoryId bigint references ips_product_category(ProductCategoryId),
	CreatedOn datetime not null,
	ModifiedOn datetime
);

drop table if exists ips_module;
create table ips_module(
	ModuleId bigint auto_increment primary key,
	Name nvarchar(100) not null,
	Title nvarchar(100) not null,
	RelativeURL   nvarchar(100),
    IconRelativeURL  nvarchar(100),
	ParentModuleId bigint references ips_module(ModuleId),
	CreatedOn datetime not null,
    ModifiedOn datetime
);

