
use ips;
drop table if exists ips_user;
create table ips_user(
	user_id bigint auto_increment primary key,
	username nvarchar(100) not null unique,
	password nvarchar(36) not null,
	email nvarchar(100) not null unique,
	is_admin tinyint(1) not null default 0,
	is_locked tinyint(1) not null default 0,
	fadatetime datetime not null,
	lcdatetime datetime
);
drop table  if exists ips_session;
create table ips_session(
	session_id bigint auto_increment primary key,
	user_id bigint not null references ips_user(user_id),
	expire_window_seconds int not null default 120,
	fadatetime datetime not null,
	lcdatetime datetime
);

drop table if exists ips_module;
create table ips_module(
  module_id bigint auto_increment primary key,
  name nvarchar(100) not null,
  title nvarchar(100) not null,
  relative_url   nvarchar(100),
  icon_relative_url  nvarchar(100),
  parent_id bigint references ips_module(module_id),
  fadatetime datetime not null,
  lcdatetime datetime
);

drop table if exists ips_product_type;
create table ips_product_type(
	product_type_id bigint primary key,
	name nvarchar(100) not null,
	display_name nvarchar(100) not null,
    parent_id bigint references ips_product_type(product_type_id),
	fadatetime datetime not null,
	lcdatetime datetime
);

drop table if exists ips_product_type_field;
create table ips_product_type_field(
	product_type_field_id bigint auto_increment primary key,
	product_type_id bigint not null references ips_product_type(product_type_id),
	name nvarchar(100) not null
);

drop table if exists ips_product_category;
create table ips_product_category(
	product_category_id bigint auto_increment primary key,
	name nvarchar(100) not null,
	has_children bit not null,
	parent_id bigint references ips_product_category(product_category_id),
	fadatetime datetime not null,
	lcdatetime datetime
);
drop table if exists ips_metadata_setting;
create table ips_metadata_setting(
	setting_key nvarchar(100) not null primary key,
	setting_value nvarchar(255) not null
);

drop table if exists ips_metadata_brand;
create table ips_metadata_brand(
  brand_id bigint auto_increment primary key,
  name nvarchar(100) not null,
  fadatetime datetime not null,
  lcdatetime datetime
);

drop table if exists ips_metadata_color;
create table ips_metadata_color(
  color_id bigint auto_increment primary key,
  name varchar(100) not null,
  fadatetime datetime not null,
  lcdatetime datetime
);

drop table if exists ips_metadata_size;
create table ips_metadata_size(
  size_id bigint auto_increment primary key,
  name varchar(100) not null,
  fadatetime datetime not null,
  lcdatetime datetime
);

drop table if exists ips_product;
create table ips_product(
  product_id bigint auto_increment primary key,
  product_type_id int not null references ips_product_type(product_type_id),
  name nvarchar(100) not null,
  is_published tinyint(1) not null,
  colors varchar(400),#@c0@c1@c2...@cn@
  sizes  varchar(400)#@s0@s1@s2...@sn@
);

drop table if exists ips_product_variant;
create table ips_product_variant(
	product_variant_id bigint auto_increment primary key,
	is_published tinyint(1) not null,
	color_id bigint,
	size_id bigint
);


drop table if exists ips_product_field_value;
create table ips_product_field_value(
	product_id bigint   references ips_product(product_id),
	product_type_field_id bigint  references ips_product_type_field(product_type_field_id),
	value nvarchar(200) not null,
	constraint primary key(product_id,product_type_field_id)
);
#ips_product_showbox
#product show is used to description the product in detail
#a product could have multiple show.
drop table if exists ips_product_showbox;
create table ips_product_showbox(
	product_showbox_id bigint not null auto_increment primary key,
	product_id bigint not null references ips_product(product_id),
	showbox_index int not null,#decide the order of the show.
	showbox_type_id int not null,#image,markdown,html or text
	showbox_value nvarchar(255) not null,
	padding nvarchar(100) not null,# top right bottom left
	margin nvarchar(100) not null, # top right bottom left
	halign int not null,# horizental alignment, could be inherited,left, middle, right
	valign int not null,# vertical alignment, could be inherited, top, middle, bottom
	fadatetime datetime not null,
	lcdatetime datetime
);
#ips_product_price
#price list of product for each period
drop table if exists ips_product_price;
create table ips_product_price(
  product_price_id bigint auto_increment primary key,
  product_id bigint not null references ips_product(product_id),
  start_datetime datetime not null,
  stop_datetime datetime not null,
  fadatetime datetime not null,
  lcdatetime datetime
);
#ips_product_variant_price
#price list of product for each period
drop table if exists ips_product_variant_price;
create table ips_product_variant_price(
  product_variant_price_id bigint auto_increment primary key,
  product_id bigint not null references ips_product(product_id),
  product_variant_id bigint not null references ips_product_variant(product_variant_id),
  is_published tinyint(1) not null,
  start_datetime datetime not null,
  stop_datetime datetime not null,
  fadatetime datetime not null,
  lcdatetime datetime
);
#ips_product_image
drop table if exists ips_product_image;
create table ips_product_image(
  product_image_id bigint auto_increment primary key,
  product_id bigint not null references ips_product(product_id),
  xwidth int not null,
  yheight int not null,
  relative_path nvarchar(255) not null,
  fadatetime datetime not null,
  lcdatetime datetime
);

#ips_product_comment_head
drop table if exists ips_product_comment_head;
create table ips_product_comment_head(
	product_comment_head_id bigint auto_increment primary key,
	product_id bigint not null references ips_product(product_id),
	is_published tinyint(1) not null,
	rate int not null,
	title nvarchar(100) not null,	
	user_id bigint not null references ips_user(user_id),
	fadatetime datetime not null,
	lcdatetime datetime
);

#ips_product_comment_item
drop table if exists ips_product_comment_item;
create table ips_product_comment_item(
	product_comment_item_id bigint auto_increment primary key,
	product_comment_head_id bigint not null references ips_product_comment_head(product_comment_head_id),
	parent_id bigint references ips_product_comment_item(product_comment_item_id),
	comment nvarchar(4000) not null,
	user_id bigint not null references ips_user(user_id),
	is_deleted tinyint(1) not null,
	fadatetime datetime not null,
	lcdatetime datetime
);

#ips_product_inquery_head
drop table if exists ips_product_inquery_head;
create table ips_product_inquery_head(
	product_inquery_head_id bigint auto_increment primary key,
	product_id bigint not null references ips_product(product_id),
	is_public tinyint(1) not null,
	is_published tinyint(1) not null,
	question nvarchar(200) not null,
	answer nvarchar(400),	
	fadatetime datetime not null,
	lcdatetime datetime
);

#ips_product_inquery_item
drop table if exists ips_product_inquery_item;
create table ips_product_inquery_item(
	product_inquery_item_id bigint auto_increment primary key,
	product_inquery_head_id bigint not null references ips_product_inquery_head(product_inquery_head_id),
	question nvarchar(200) not null,
	answer nvarchar(400),
	fadatetime datetime not null,
	lcdatetime datetime
);
#
drop table if exists ips_shopping_cart;
create table ips_shopping_cart(	
	user_id bigint not null primary key references ips_user(user_id),
	total_price float(18,3) not null
);
drop table if exists ips_shopping_cart_item;
create table ips_shopping_cart_item(
	user_id bigint not null primary key,
	product_id bigint not null,
	product_invariant_id bigint not null,
	unit_price float(18,3) not null,
	amount int not null,
	line_price float(18,3) not null
)

