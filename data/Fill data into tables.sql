-- Hãy chạy câu lệnh đầu tiên ở mỗi khối trước rồi đồng loạt chạy các câu lệnh sau nha

-- Product Categories 
insert into productcategories(id,name,status,createdAt,updatedAt) values (1,'Necklace',1,curdate(),curdate()),
(2,'Ring',1,curdate(),curdate()),
(3,'Bracelet',1,curdate(),curdate()),
(4,'Anklet',1,curdate(),curdate()),
(5,'Brooch',1,curdate(),curdate()),
(6,'Other',1,curdate(),curdate());

-- Position Employees
insert into positionemployees(id,name_position,status,createdAt,updatedAt) values 
(1,'Manager',1,curdate(),curdate()),
(2,'Sales Employee',1,curdate(),curdate()),
(3,'Warehouse Employee',1,curdate(),curdate());

-- Employees
insert into employees(id,name,address,phone,email,birthday,id_position,status,createdAt,updatedAt) values 
(1,'Pham Nhat Huy','KTX khu B','0967679733','22520570@gm.uit.edu.vn','2024-02-29 00:00:00',1,1,curdate(),curdate()),
(2,'Trinh Quang Hao','TP HCM','0645351759','22520406@gm.uit.edu.vn','2024-05-25 00:00:00',2,1,curdate(),curdate()),
(3,'Ho Thi Bich Phuong','Nha tro gan KTX khu A','0751342568','22521160@gm.uit.edu.vn','2024-02-20 00:00:00',2,1,curdate(),curdate()),
(4,'Le Minh Kha','KTX khu B','0846195471','22520596@gm.uit.edu.vn','2024-08-15 00:00:00',3,1,curdate(),curdate());

-- Account
insert into accounts(id,username,password,id_employee,status,createdAt,updatedAt) values 
(1,'admin','123',1,1,curdate(),curdate()),
(2,'sale1','123',2,1,curdate(),curdate()),
(3,'sale2','123',3,1,curdate(),curdate()),
(4,'warehouse','123',4,1,curdate(),curdate());

-- Product
insert into products(id,id_category,name,material,size,weight,price,warranty_period,status,createdAt,updatedAt) values
(1, 1, 'Elegant Ruby Necklace', 'Gold', 45, 15.5, 1200.00, 24, 1, curdate(), curdate()),
(2, 2, 'Classic Diamond Ring', 'Platinum', 7, 5.2, 950.00, 36, 1, curdate(), curdate()),
(3, 3, 'Stylish Emerald Bracelet', 'Silver', 19, 10.3, 600.00, 12, 1, curdate(), curdate()),
(4, 4, 'Anklet with Sapphire Charm', 'Gold', 22, 8.1, 450.00, 18, 1, curdate(), curdate()),
(5, 5, 'Vintage Brooch with Garnet', 'Bronze', 8, 6.5, 400.00, 12, 1, curdate(), curdate()),
(6, 1, 'Modern Aquamarine Necklace', 'White Gold', 50, 18.2, 1300.00, 24, 1, curdate(), curdate()),
(7, 2, 'Amethyst Engagement Ring', 'Rose Gold', 6, 4.8, 850.00, 36, 1, curdate(), curdate()),
(8, 3, 'Peridot Chain Bracelet', 'Gold', 20, 9.5, 700.00, 12, 1, curdate(), curdate()),
(9, 4, 'Diamond and Topaz Anklet', 'Silver', 21, 7.9, 500.00, 18, 1, curdate(), curdate()),
(10, 6, 'Customizable Jewelry Piece', 'Mixed Materials', 0, 12.0, 300.00, 6, 1, curdate(), curdate());

-- Gemstone
insert into gemstones(id,name,size,weight,color,purity,certificate,status,createdAt,updatedAt)
values
(1, 'Ruby', 10, 5.2, 'Red', 98.5, null,1,curdate(),curdate()),
(2, 'Sapphire', 8, 4.3, 'Blue', 97.8, null,1,curdate(),curdate()),
(3, 'Emerald', 12, 6.1, 'Green', 96.2, null,1,curdate(),curdate()),
(4, 'Diamond', 6, 3.5, 'Colorless', 99.9, null,1,curdate(),curdate()),
(5, 'Amethyst', 14, 7.8, 'Purple', 95.0, null,1,curdate(),curdate()),
(6, 'Citrine', 9, 4.7, 'Yellow', 94.7, null,1,curdate(),curdate()),
(7, 'Topaz', 11, 6.3, 'Light Blue', 96.5, null,1,curdate(),curdate()),
(8, 'Peridot', 8, 5.0, 'Olive Green', 95.9, null,1,curdate(),curdate()),
(9, 'Aquamarine', 10, 6.7, 'Pale Blue', 96.8, null,1,curdate(),curdate()),
(10, 'Garnet', 9, 5.6, 'Deep Red', 95.4, null,1,curdate(),curdate());


-- Inventories
insert into inventories(id,quantity,createdAt,updatedAt) values
(1,0,curdate(),curdate()),
(2,0,curdate(),curdate()),
(3,0,curdate(),curdate()),
(4,0,curdate(),curdate()),
(5,0,curdate(),curdate()),
(6,0,curdate(),curdate()),
(7,0,curdate(),curdate()),
(8,0,curdate(),curdate()),
(9,0,curdate(),curdate()),
(10,0,curdate(),curdate());

-- Customer
insert into customers(id,name,address,phone,email,birthday,loyalty_point,accumulated_point,status,createdAt,updatedAt) values
(1, 'Nguyen Van A', '123 Nguyen Trai, Hanoi', '0901234567', 'nva@example.com', '1990-05-12', 0, 0, 1, curdate(),curdate()),
(2, 'Tran Thi B', '45 Le Loi, Da Nang', '0912345678', 'ttb@example.com', '1985-08-24', 0, 0, 1, curdate(),curdate()),
(3, 'Le Minh C', '789 Tran Hung Dao, HCM City', '0923456789', 'lmc@example.com', '1993-03-15', 0, 0, 1, curdate(),curdate()),
(4, 'Pham Thi D', '56 Hai Ba Trung, Hai Phong', '0934567890', 'ptd@example.com', '1988-10-10', 0, 0, 1, curdate(),curdate()),
(5, 'Do Van E', '98 Nguyen Du, Hue', '0945678901', 'dve@example.com', '1995-07-20', 0, 0, 1, curdate(),curdate()),
(6, 'Hoang Thi F', '12 Le Lai, Can Tho', '0956789012', 'htf@example.com', '1992-01-30', 0, 0, 1, curdate(),curdate()),
(7, 'Nguyen Van G', '45 Tran Phu, Nha Trang', '0967890123', 'nvg@example.com', '1990-11-18', 0, 0, 1, curdate(),curdate()),
(8, 'Pham Minh H', '78 Dinh Tien Hoang, Vinh', '0978901234', 'pmh@example.com', '1987-04-22', 0, 0, 1, curdate(),curdate()),
(9, 'Tran Thi I', '33 Phan Boi Chau, Quy Nhon', '0989012345', 'tti@example.com', '1994-06-25', 0, 0, 1, curdate(),curdate()),
(10, 'Vu Thi J', '123 Hai Trieu, Da Lat', '0990123456', 'vtj@example.com', '1991-09-09', 0, 0, 1, curdate(),curdate());
 
 -- Supplier
 insert into suppliers(id,name,address,phone,email,status,createdAt,updatedAt) values
(1, 'Gemstone Co. Ltd.', '123 Diamond Street, Hanoi', '0901234567', 'info@gemstone.vn', 1, curdate(),curdate()),
(2, 'Precious Supplies', '45 Ruby Avenue, HCM City', '0912345678', 'contact@precioussupplies.com', 1, curdate(),curdate()),
(3, 'Golden Gems', '789 Sapphire Lane, Da Nang', '0923456789', 'sales@goldengems.com', 1,curdate(),curdate()),
(4, 'Emerald World', '56 Emerald Blvd, Hue', '0934567890', 'support@emeraldworld.vn', 1, curdate(),curdate()),
(5, 'Luxury Stones Ltd.', '98 Topaz Road, Hai Phong', '0945678901', 'luxury@stonesltd.com', 1, curdate(),curdate()),
(6, 'Crystal Imports', '12 Amethyst Plaza, Can Tho', '0956789012', 'orders@crystalimports.com', 1, curdate(),curdate()),
(7, 'Peridot Partners', '45 Aquamarine Crescent, Nha Trang', '0967890123', 'service@peridotpartners.vn', 1, curdate(),curdate()),
(8, 'Sapphire Supplies', '78 Garnet Street, Vinh', '0978901234', 'info@sapphiresupplies.com', 1, curdate(),curdate()),
(9, 'Jewelry Wholesale', '33 Opal Lane, Quy Nhon', '0989012345', 'contact@jewelrywholesale.vn', 1, curdate(),curdate()),
(10, 'Garnet Group', '123 Zircon Way, Da Lat', '0990123456', 'sales@garnetgroup.com', 1, curdate(),curdate());