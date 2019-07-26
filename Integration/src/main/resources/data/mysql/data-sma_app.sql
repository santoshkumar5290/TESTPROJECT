INSERT IGNORE INTO sma_machine (id, name, url) VALUES(1,"Wrapper Arm 1","SMA-Machine2.png");
INSERT IGNORE INTO sma_machine_component(id,name,product_family,part_number,message,x_axis,y_axis,uniqueId,machine_id) 
VALUES(1,"Door 6 Reset","SICK","56240","Test",100,120,"D6Reset",1);
