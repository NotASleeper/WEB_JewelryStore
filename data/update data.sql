insert into orderforms (id, id_customer, id_employee, is_used_point, id_coupon, total_price, date_created, date_payment, status, is_preordered,createdAt,updatedAt) VALUES
(1, 1, 2, 0, null, 1200.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(2, 3, 2, 0, null, 850.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(3, 4, 2, 0, null, 600.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(4, 2, 3, 0, null, 1300.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(5, 5, 3, 1, null, 500.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(6, 1, 3, 0, null, 1350.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(7, 3, 2, 0, null, 1600.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(8, 4, 2, 0, null, 900.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(9, 2, 3, 0, null, 1100.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE()),
(10, 5, 3, 0, null, 1400.00, CURDATE(), CURDATE(), 1, 0,CURDATE(), CURDATE());

insert into orderdetails (id_order, id_product, quantity, request, surcharge, total, status,createdAt,updatedAt) VALUES
(1, 1, 1, 'No request', 0.00, 1200.00, 1,CURDATE(), CURDATE()),
(2, 2, 1, 'Gift wrap', 10.00, 850.00, 1,CURDATE(), CURDATE()),
(3, 3, 1, 'Engraving', 50.00, 600.00, 1,CURDATE(), CURDATE()),
(4, 4, 1, 'Urgent delivery', 20.00, 1300.00, 1,CURDATE(), CURDATE()),
(5, 5, 1, 'Custom size', 30.00, 500.00, 1,CURDATE(), CURDATE());

insert into orderdetails (id_order, id_product, quantity, request, surcharge, total, status,createdAt,updatedAt) VALUES
(6, 1, 1, 'No request', 0.00, 900.00, 1,CURDATE(), CURDATE()),
(6, 2, 1, 'Gift wrap', 10.00, 450.00, 1,CURDATE(), CURDATE()),
(7, 3, 1, 'Engraving', 50.00, 1000.00, 1,CURDATE(), CURDATE()),
(7, 4, 1, 'Urgent delivery', 20.00, 600.00, 1,CURDATE(), CURDATE()),
(8, 5, 1, 'Custom size', 30.00, 600.00, 1,CURDATE(), CURDATE()),
(8, 1, 1, 'No request', 0.00, 300.00, 1,CURDATE(), CURDATE()),
(9, 2, 1, 'Gift wrap', 10.00, 700.00, 1,CURDATE(), CURDATE()),
(9, 3, 1, 'Engraving', 50.00, 400.00, 1,CURDATE(), CURDATE()),
(10, 4, 1, 'Urgent delivery', 20.00, 800.00, 1,CURDATE(), CURDATE()),
(10, 5, 1, 'Custom size', 30.00, 600.00, 1,CURDATE(), CURDATE());

insert into importforms (id, id_supplier, date_created, id_employee, total_price, status,createdAt,updatedAt) VALUES
(1, 1, '2024-11-19', 4, 3000.00, 1,'2024-11-19', '2024-11-19'),
(2, 2, '2024-11-30', 4, 4500.00, 1,'2024-11-30', '2024-11-30'),
(3, 3, '2024-12-11', 4, 2700.00, 1,'2024-12-11', '2024-12-11'),
(4, 4, '2024-12-16', 4, 3200.00, 1,'2024-12-16', '2024-12-16'),
(5, 5, '2024-12-30', 4, 1500.00, 1,'2024-12-30', '2024-12-30');

insert into importdetails (id_lot, id_product, quantity, price, total, status,createdAt,updatedAt) VALUES
-- Importform 1
(1, 1, 5, 200.00, 1000.00, 1,'2024-11-19', '2024-11-19'),
(1, 2, 4, 250.00, 1000.00, 1,'2024-11-19', '2024-11-19'),
(1, 3, 2, 500.00, 1000.00, 1,'2024-11-19', '2024-11-19'),
-- Importform 2
(2, 4, 6, 300.00, 1800.00, 1,'2024-11-30', '2024-11-30'),
(2, 5, 8, 100.00, 800.00, 1,'2024-11-30', '2024-11-30'),
(2, 1, 4, 475.00, 1900.00, 1,'2024-11-30', '2024-11-30'),
-- Importform 3
(3, 2, 6, 200.00, 1200.00, 1,'2024-12-11', '2024-12-11'),
(3, 3, 3, 300.00, 900.00, 1,'2024-12-11', '2024-12-11'),
(3, 4, 4, 150.00, 600.00, 1,'2024-12-11', '2024-12-11'),
-- Importform 4
(4, 5, 10, 80.00, 800.00, 1,'2024-12-16', '2024-12-16'),
(4, 1, 2, 300.00, 600.00, 1,'2024-12-16', '2024-12-16'),
(4, 2, 4, 200.00, 800.00, 1,'2024-12-16', '2024-12-16'),
-- Importform 5
(5, 3, 1, 500.00, 500.00, 1,'2024-12-30', '2024-12-30'),
(5, 4, 5, 200.00, 1000.00, 1,'2024-12-30', '2024-12-30');