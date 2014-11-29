insert into ips_user(username,password,email,createdon)
	values('lxzhu','N0rikos123','lxzhu@outlook.com',current_date());

insert into ips_module(Name,Title,RelativeURL,IconRelativeURL,ParentModuleId,CreatedOn)
	values('sys.modules','Modules','admin/modules','icons/modules',null,current_date());

insert into ips_module(Name,Title,RelativeURL,IconRelativeURL,ParentModuleId,CreatedOn)
	values('sys.modules','Create Module','admin/modules/create','icons/modules',1,current_date());

insert into ips_module(Name,Title,RelativeURL,IconRelativeURL,ParentModuleId,CreatedOn)
	values('sys.modules','Edit Module','admin/modules/edit','icons/modules',1,current_date());

insert into ips_module(Name,Title,RelativeURL,IconRelativeURL,ParentModuleId,CreatedOn)
	values('sys.modules','Search Module','admin/modules/search','icons/modules',1,current_date());