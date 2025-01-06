insert into employeeimages (id, url, createdAt, updatedAt) VALUES
(1,'https://res.cloudinary.com/djf63iwha/image/upload/v1736132847/STORE/zkflbugtasfw9qyuzpgw.jpg',CURDATE(), CURDATE()),
(2,'https://res.cloudinary.com/djf63iwha/image/upload/v1736132961/STORE/xoprzebftv1d66qcd3bp.jpg',CURDATE(), CURDATE()),
(3,'https://res.cloudinary.com/djf63iwha/image/upload/v1736133078/STORE/junkcherbcbnduzkbjgc.jpg',CURDATE(), CURDATE()),
(4,'https://res.cloudinary.com/djf63iwha/image/upload/v1736133334/STORE/ngwi6jedo1m66hg3usgf.jpg',CURDATE(), CURDATE());

insert into liquidationforms(id,id_employee_created,id_employee_accepted,date_created,date_accepted,total_price,product_status,status,createdAt,updatedAt) values
(1, 4, 1, '2024-11-05', '2024-11-05', 672.0, 1, 1, '2024-11-05', '2024-11-05'),
(2, 4, 1, '2024-11-07', '2024-11-07', 468.0, 1, 1, '2024-11-07', '2024-11-07'),
(3, 4, 1, '2024-11-10', '2024-11-10', 1060.0, 1, 1, '2024-11-10', '2024-11-10'),
(4, 4, 1, '2024-11-12', '2024-11-12', 189.0, 1, 1, '2024-11-12', '2024-11-12'),
(5, 4, 1, '2024-11-13', '2024-11-13', 1116.0, 1, 1, '2024-11-13', '2024-11-13'),
(6, 4, 1, '2024-11-18', '2024-11-18', 627.0, 1, 1, '2024-11-18', '2024-11-18'),
(7, 4, 1, '2024-11-19', '2024-11-19', 2715.0, 1, 1, '2024-11-19', '2024-11-19'),
(8, 4, 1, '2024-11-26', '2024-11-26', 1270.0, 1, 1, '2024-11-26', '2024-11-26'),
(9, 4, 1, '2024-12-01', '2024-12-01', 1094.0, 1, 1, '2024-12-01', '2024-12-01'),
(10, 4, 1, '2024-12-10', '2024-12-10', 609.0, 1, 1, '2024-12-10', '2024-12-10');

insert into liquidationdetails(id_liq,id_product,quantity,price_down,total,status,createdAt,updatedAt) values
(1, 1, 4, 168.0, 672.0, 1, '2024-11-05', '2024-11-05'),
(2, 2, 4, 117.0, 468.0, 1, '2024-11-07', '2024-11-07'),
(3, 3, 4, 265.0, 1060.0, 1, '2024-11-10', '2024-11-10'),
(4, 4, 1, 189.0, 189.0, 1, '2024-11-12', '2024-11-12'),
(5, 5, 4, 279.0, 1116.0, 1, '2024-11-13', '2024-11-13'),
(6, 6, 1, 171.0, 171.0, 1, '2024-11-18', '2024-11-18'),
(6, 4, 4, 114.0, 456.0, 1, '2024-11-18', '2024-11-18'),
(7, 5, 5, 261.0, 1305.0, 1, '2024-11-19', '2024-11-19'),
(7, 2, 5, 282.0, 1410.0, 1, '2024-11-19', '2024-11-19'),
(8, 3, 3, 170.0, 510.0, 1, '2024-11-26', '2024-11-26'),
(8, 4, 4, 190.0, 760.0, 1, '2024-11-26', '2024-11-26'),
(9, 3, 3, 280.0, 840.0, 1, '2024-12-01', '2024-12-01'),
(9, 2, 2, 127.0, 254.0, 1, '2024-12-01', '2024-12-01'),
(10, 2, 2, 166.0, 332.0, 1, '2024-12-10', '2024-12-10'),
(10, 1, 1, 277.0, 277.0, 1, '2024-12-10', '2024-12-10');

insert into serviceactivities(id,id_category,name_activity,price,status,createdAt,updatedAt) values
(1, 1, 'Necklace Cleaning', 50, 1, CURDATE(), CURDATE()),
(2, 2, 'Ring Resizing', 100, 1, CURDATE(), CURDATE()),
(3, 3, 'Bracelet Repair', 120, 1, CURDATE(), CURDATE()),
(4, 4, 'Anklet Polishing', 70, 1, CURDATE(), CURDATE()),
(5, 5, 'Brooch Restoration', 150, 1, CURDATE(), CURDATE()),
(6, 6, 'Custom Jewelry Repair', 200, 1, CURDATE(), CURDATE()),
(7, 1, 'Necklace Chain Replacement', 80, 1, CURDATE(), CURDATE()),
(8, 2, 'Ring Engraving', 60, 1, CURDATE(), CURDATE()),
(9, 3, 'Bracelet Adjustment', 90, 1, CURDATE(), CURDATE()),
(10, 4, 'Anklet Repair', 100, 1, CURDATE(), CURDATE());


insert into orderforms (id, id_customer, id_employee, is_used_point, id_coupon, total_price, date_created, date_payment, status, is_preordered,createdAt,updatedAt) VALUES
(11, 2, 3, 0, NULL, 760.0, '2024-12-15', '2024-12-15', 1, 0, CURDATE(), CURDATE()),
(12, 4, 2, 0, NULL, 1116.0, '2024-12-16', '2024-12-16', 1, 0, CURDATE(), CURDATE()),
(13, 5, 2, 0, NULL, 1835.0, '2024-12-17', '2024-12-17', 1, 0, CURDATE(), CURDATE());

insert into orderdetails (id_order, id_product, quantity, request, surcharge, total, status,createdAt,updatedAt) VALUES
(11, 4, 2, 'Gift wrap', 20.0, 760.0, 1, CURDATE(), CURDATE()),
(12, 5, 4, 'Expedited delivery', 50.0, 1116.0, 1, CURDATE(), CURDATE()),
(13, 1, 3, NULL, 0.0, 735.0, 1, CURDATE(), CURDATE()),
(13, 3, 4, 'Special packaging', 100.0, 1100.0, 1, CURDATE(), CURDATE());

insert into refundforms(id,id_employee,id_customer,id_order,id_product,date_created,note,status,createdAt,updatedAt) values
(1, 3, 2, 11, 4, '2024-12-20', 'Defective product', 1, '2024-12-20', '2024-12-20'),
(2, 2, 4, 12, 5, '2024-12-21', 'Wrong item delivered', 1, '2024-12-21', '2024-12-21'),
(3, 2, 5, 13, 1, '2024-12-22', 'Customer changed mind', 1, '2024-12-22', '2024-12-22');

insert into warrantymaintainances(id,id_employee,id_customer,id_order,id_product,id_category,id_activity,date_created,type,name_product
,image,surcharge,total_price,status,createdAt,updatedAt) values 
-- Bảo hành sản phẩm mua từ cửa hàng (đơn hàng hợp lệ)
(1, 3, 2, 10, 3, 3, NULL, '2024-12-06', 1, 'Bracelet A', NULL, 0.0, 0.0, 1, '2024-12-06', '2024-12-06'),
-- Bảo dưỡng sản phẩm mua từ cửa hàng (đơn hàng hợp lệ)
(2, 2, 5, 9, 2, 2, 2, '2024-12-01', 0, 'Ring B', NULL, 15.0, 115.0, 1, '2024-12-01', '2024-12-01'),
-- Bảo dưỡng sản phẩm không phải từ cửa hàng
(3, 2, 3, NULL, NULL, 1, 1, '2024-12-15', 0, 'Necklace Custom', NULL, 30.0, 80.0, 1, '2024-12-15', '2024-12-15'),
-- Bảo dưỡng sản phẩm không phải từ cửa hàng
(4, 3, 4, NULL, NULL, 3, 9, '2024-12-20', 0, 'Bracelet Custom', NULL, 50.0, 140.0, 1, '2024-12-20', '2024-12-20'),
-- Bảo dưỡng sản phẩm mua từ cửa hàng (đơn hàng hợp lệ)
(5, 3, 2, 8, 1, 1, 1, '2025-01-05', 0, 'Necklace A', NULL, 20.0, 70.0, 1, '2025-01-05', '2025-01-05');