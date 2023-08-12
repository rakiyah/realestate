- CS340 INTRO TO DATABASE
-- Project Step 3 Final Version: Design HTML Interface + DML SQL (Group / On Ed Discussion) 
-- Created by GROUP 66: Wesley Anding and Rakiyah Mullings
-- Due Monday 31 July 2023
-- Data Manipulation File

-- Drop down query
SELECT `address` FROM `properties`

----------------------
-- agents page
----------------------
--  Create a new agent
INSERT INTO `agents` (`email`, `phone`, `name`)
VALUES (:agent_email_Input, :agent_phone_Input, :agent_name_Input);

-- Get all agent info
SELECT `agent_id`, `email`, `phone`, `name` FROM `agents`

-- Update agent info
UPDATE `agents` SET `email` = :agent_email_Input, `phone` = :agent_phone_Input, `name` = :agent_name_Input WHERE agent_id = :agent_id_from_update_form;

-- Delete agent
DELETE FROM `agents` WHERE `name` = :agent_name_Input;


----------------------
-- potentialBuyer page
----------------------
-- Create a new potentialBuyer
INSERT INTO `potentialBuyers` (`email`, `phone`, `name`, `agent_id`)
VALUES (:buyer_email_Input, :buyer_phone_Input, :buyer_name_Input, :agent_id_Input);

-- Get all potentialBuyer info
SELECT `agent_id`, `email`, `phone`, `name`, `buyer_id` FROM `potentialBuyers`

-- Update buyer info
UPDATE `potentialBuyers` SET `agent_id` = :agent_id_Input,  `email` = :buyer_email_Input, `phone` = :buyer_phone_Input, `name` = :buyer_name_Input WHERE buyer_id = :buyer_id_from_update_form;

-- Delete buyer
DELETE FROM `potentialBuyers` WHERE `name` = :buyer_name_Input;

-- JOIN for FK's
SELECT pbuyer.*, a.name AS agent_name
FROM potentialBuyers AS pbuyer
JOIN agents AS a ON pbuyer.agent_id = a.agent_id;


----------------------
-- properties page
----------------------
-- Create a new property
INSERT INTO `properties` (`address`, `listed_price`, `seller_id`, `on_market`, `sell_price`, `sell_date`)
VALUES (:property_address_Input, :property_listed_price_Input, :seller_id_Input, :property_on_market_Input, :property_sell_price_Input, :property_sell_date_Input);

-- Get all property info
SELECT `property_id`, `address`, `listed_price`, `buyer_id`, `potentialBuyers_agent_id`, `seller_id`, `sellers_agent_id`, `on_market`, `sell_price`, `sell_date`  FROM `properties`

-- Update property info
UPDATE `properties` SET `address` = :property_address_Input, `listed_price` = :property_listed_price_Input,  `seller_id` = :seller_id_Input, `on_market` = :property_on_market_Input, `sell_price` = :property_sell_price_Input, `sell_date` = :property_sell_date_Input WHERE property_id = :property_id_from_update_form;

-- Delete property 
DELETE FROM `properties` WHERE property_id = :property_id_Input;

----------------------
-- sellers page
----------------------
-- Create a new Seller
INSERT INTO `sellers` (`email`, `phone`, `name`, `agent_id`)
VALUES (:seller_email_Input, :seller_phone_Input, :seller_name_Input, :agent_id_Input);

-- Get all seller info
SELECT `seller_id`, `email`, `phone`, `name`, `agent_id` FROM `sellers`

-- Update seller info
UPDATE `sellers` SET `email` = :seller_email_Input, `phone` = :seller_phone_Input, `name` = :seller_name_Input, `agent_id` = :agent_id_Input WHERE seller_id = :seller_id_from_update_form;

-- Delete seller 
DELETE FROM `sellers` WHERE `name` = :seller_name_Input;

-- JOIN for FK's
SELECT seller.*, a.name AS agent_name
FROM sellers AS seller
JOIN agents AS a ON seller.agent_id = a.agent_id;

----------------------
-- properties has potentialBuyer page
----------------------
-- Specify a property for a potentialBuyer
INSERT INTO `potentialBuyers_has_properties` (`buyer_id`, `property_id`)
VALUES (:buyer_id_Input, :property_id_Input);

-- delete association from buyer and property
DELETE FROM `potentialBuyers_has_properties` WHERE buyer_id = :buyer_Id_from_list AND property_id = :property_Id_from_list;

-- get all properties with their buyers
SELECT `buyer_id`, `property_id` FROM `potentialBuyers_has_properties`;

-- JOIN for FK's
SELECT pb.name AS buyer_name, p.address AS property_address
FROM potentialBuyers AS pb
JOIN potentialBuyers_has_properties AS pbhp ON pb.buyer_id = pbhp.buyer_id
JOIN properties AS p ON pbhp.property_id = p.property_id;
