- CS340 INTRO TO DATABASE
-- Project Step 5
-- Created by GROUP 66: Wesley Anding and Rakiyah Mullings
-- Due Monday 14 August 2023
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
UPDATE `agents` SET `name` = :agent_name_Input, `email` = :agent_email_Input, `phone` = :agent_phone_Input WHERE agent_id = :agent_id_from_update_form;

-- Delete agent
DELETE FROM `agents` WHERE `agent_id` = :agent_id_Input;


----------------------
-- potentialBuyer page
----------------------
-- Create a new potentialBuyer
INSERT INTO `potentialBuyers` (`email`, `phone`, `name`, `agent_id`)
VALUES (:buyer_email_Input, :buyer_phone_Input, :buyer_name_Input, :agent_id_Input);

-- Get all potentialBuyer info
SELECT `agent_id`, `email`, `phone`, `name`, `buyer_id` FROM `potentialBuyers`

-- Get single potentialBuyer info
SELECT * FROM `potentialBuyers` WHERE `buyer_id` = :buyer_id_Input;

-- Update buyer info
UPDATE `potentialBuyers` SET `agent_id` = :agent_id_Input,  `email` = :buyer_email_Input, `phone` = :buyer_phone_Input, `name` = :buyer_name_Input WHERE buyer_id = :buyer_id_from_update_form;

-- Delete buyer
DELETE FROM `potentialBuyers` WHERE `buyer_id` = :buyer_id_Input;

-- JOIN for FK's 
SELECT pbuyer.*, a.name AS agent_name
FROM potentialBuyers AS pbuyer
LEFT JOIN agents AS a ON pbuyer.agent_id = a.agent_id;


----------------------
-- properties page
----------------------
-- Create a new property
INSERT INTO `properties` (`address`, `listed_price`, `seller_id`, `on_market`)
VALUES (:property_address_Input, :property_listed_price_Input, :seller_id_Input, :property_on_market_Input);

-- Get all property info
SELECT `property_id`, `address`, `listed_price`, `buyer_id`, `potentialBuyers_agent_id`, `seller_id`, `sellers_agent_id`, `on_market`, `sell_price`, `sell_date`  FROM `properties`

-- Get single property info
SELECT * FROM `properties` WHERE `property_id` = :property_id_Input;

-- Update property info
UPDATE `properties` SET `address` = :property_address_Input, `listed_price` = :property_listed_price_Input,  `seller_id` = :seller_id_Input, `on_market` = :property_on_market_Input, `sell_price` = :property_sell_price_Input, `sell_date` = :property_sell_date_Input WHERE property_id = :property_id_from_update_form;

-- Delete property 
DELETE FROM `properties` WHERE property_id = :property_id_Input;

-- JOIN for FK's in table
SELECT p.property_id, p.address, p.listed_price, p.on_market, p.sell_price, DATE_FORMAT(p.sell_date, "%m-%d-%Y") as sell_date,
a.name AS seller_agent, pb.name AS buyer_name, pb_agent.name AS buyer_agent, s.name AS seller_name
FROM properties p
LEFT JOIN agents a ON p.sellers_agent_id = a.agent_id
LEFT JOIN potentialBuyers pb ON p.buyer_id = pb.buyer_id
LEFT JOIN agents pb_agent ON pb.agent_id = pb_agent.agent_id
LEFT JOIN sellers s ON p.seller_id = s.seller_id;

----------------------
-- sellers page
----------------------
-- Create a new Seller
INSERT INTO `sellers` (`email`, `phone`, `name`, `agent_id`)
VALUES (:seller_email_Input, :seller_phone_Input, :seller_name_Input, :agent_id_Input);

-- Get all seller info
SELECT `seller_id`, `email`, `phone`, `name`, `agent_id` FROM `sellers`

-- Get single seller info
SELECT * FROM `sellers` WHERE `seller_id` = :seller_id_Input;

-- Update seller info
UPDATE `sellers` SET `email` = :seller_email_Input, `phone` = :seller_phone_Input, `name` = :seller_name_Input, `agent_id` = :agent_id_Input WHERE seller_id = :seller_id_from_update_form;

-- Delete seller 
DELETE FROM `sellers` WHERE `seller_id` = :seller_id_Input;

-- JOIN for FK's
SELECT seller.*, agents.name AS agent_name
FROM sellers AS seller
JOIN agents ON seller.agent_id = agents.agent_id;

----------------------
-- properties has potentialBuyer page
----------------------
-- Specify a property for a potentialBuyer
INSERT INTO `potentialBuyers_has_properties` (`buyer_id`, `property_id`)
VALUES (:buyer_id_Input, :property_id_Input);

-- delete association from buyer and property
DELETE FROM `potentialBuyers_has_properties` WHERE `buyer_id` = `:buyer_id_Input` AND `property_id` = :property_id_Input;

-- get all properties with their buyers
SELECT `buyer_id`, `property_id` FROM `potentialBuyers_has_properties`;

-- JOIN for FK's
SELECT pb.name AS buyer_name, pb.buyer_id as buyer_id, p.address AS property_address, p.property_id as property_id
FROM potentialBuyers AS pb
JOIN potentialBuyers_has_properties AS pbhp ON pb.buyer_id = pbhp.buyer_id
JOIN properties AS p ON pbhp.property_id = p.property_id;
