create schema mess;

CREATE TABLE student_details (
    reg_no VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    clg_mail VARCHAR(255) UNIQUE NOT NULL,
    ph_number VARCHAR(15),
    gender VARCHAR(10)
);

CREATE TABLE bank_details (
    reg_no VARCHAR(10) REFERENCES student_details(reg_no),
    bank_name VARCHAR(100) NOT NULL,
    acc_no VARCHAR(20) UNIQUE NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    branch VARCHAR(100),
    PRIMARY KEY (reg_no)
);

CREATE TABLE personal_student_details (
    reg_no VARCHAR(10) PRIMARY KEY REFERENCES student_details(reg_no),
    parent_name VARCHAR(100) NOT NULL,
    emergency_ph_number VARCHAR(15),
    blood_group VARCHAR(5),
    address text,
    aadhar_no varchar(12)
);

CREATE TABLE hostel_details (
    reg_no VARCHAR(10) PRIMARY KEY REFERENCES student_details(reg_no),
    hostel_name VARCHAR(100) NOT NULL,
    room_number VARCHAR(10) NOT NULL
);

CREATE TABLE menu (
    hostel_name VARCHAR(100) NOT NULL,
    day VARCHAR(10) NOT NULL,
    breakfast TEXT,
    lunch TEXT,
    snacks TEXT,
    dinner TEXT,
    PRIMARY KEY (hostel_name, day)
);

CREATE TABLE noticeboard (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    pdf_document VARCHAR(255) NOT NULL,
    hostel_name VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaint_box (
    id SERIAL PRIMARY KEY,
    sender_regno VARCHAR(10) REFERENCES student_details(reg_no),
    text TEXT NOT NULL,
    timestamp DATE DEFAULT CURRENT_DATE
);

CREATE TABLE messages (
    unique_id SERIAL PRIMARY KEY,
    hostel_name VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    sender_regno VARCHAR(10) REFERENCES student_details(reg_no),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TYPE gender_type AS ENUM ('male', 'female', 'others');
ALTER TABLE student_details 
ALTER COLUMN gender TYPE gender_type USING gender::gender_type;
CREATE TYPE day_type AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
ALTER TABLE menu
ALTER COLUMN day TYPE day_type USING day::day_type,
ALTER COLUMN breakfast SET NOT NULL,
ALTER COLUMN lunch SET NOT NULL,
ALTER COLUMN snacks SET NOT NULL,
ALTER COLUMN dinner SET NOT NULL;


--djgh, kngh, sngh, ihba, ihbb, pg girls hostel
CREATE TYPE hostel_name_type AS ENUM (
    'SVBH',
    'Patel',
    'Tilak',
    'Tandon',
    'Malviya',
    'NBH',
    'Raman',
    'Tagore',
    'PG Girls',
    'DJGH',
    'KNGH',
    'SNGH',
    'IHB'
);
ALTER TABLE menu
ALTER COLUMN hostel_name TYPE hostel_name_type USING hostel_name::hostel_name_type;
ALTER TABLE hostel_details 
ALTER COLUMN hostel_name TYPE hostel_name_type USING hostel_name::hostel_name_type;
ALTER TABLE noticeboard 
ALTER COLUMN hostel_name TYPE hostel_name_type USING hostel_name::hostel_name_type;
ALTER TABLE messages 
ALTER COLUMN hostel_name TYPE hostel_name_type USING hostel_name::hostel_name_type;

ALTER TABLE student_details 
ADD COLUMN password TEXT DEFAULT NULL;

INSERT INTO student_details (reg_no, name, clg_mail , ph_number, gender, password)
VALUES 
    ('A1000001', 'Rushil', 'mnrs.rushil@gmail.com', '9123456781', 'male', NULL),
    ('A1000002', 'Likhith', 'likhith1660@gmail.com', '9123456782', 'male', NULL),
    ('A1000003', 'Sai', 'sdubed01@gmail.com', '9123456783', 'male', NULL),
    ('A1000004', 'Rahul', 'dhanapanarahulreddy4444@gmail.com', '9123456784', 'male', NULL),
    ('A1000005', 'Lokesh', 'ramunjalokesh@gmail.com', '9123456785', 'male', NULL),
    ('A1000006', 'Kiran', 'likithkk2004@gmail.com', '9123456786', 'male', NULL),
    ('A1000007', 'Naveen', 'naveenbhukya921@gmail.com', '9123456787', 'male', NULL);

INSERT INTO Menu (hostel_name, day, breakfast, lunch, snacks, dinner)
VALUES
    ('SVBH', 'Monday', 'Idli, Sambar', 'Rice, Dal, Paneer Curry', 'Tea, Samosa', 'Chapati, Mixed Veg'),
    ('SVBH', 'Tuesday', 'Dosa, Chutney', 'Fried Rice, Manchurian', 'Coffee, Biscuit', 'Paratha, Potato Curry'),
    ('SVBH', 'Wednesday', 'Upma, Chutney', 'Curd Rice, Vegetable Fry', 'Lemonade, Sandwich', 'Rice, Sambar, Papad'),
    ('SVBH', 'Thursday', 'Puri, Bhaji', 'Biryani, Raita', 'Tea, Pakoda', 'Naan, Dal Makhani'),
    ('SVBH', 'Friday', 'Poha, Jalebi', 'Veg Pulao, Kurma', 'Coffee, Cake', 'Chapati, Paneer Butter Masala'),
    ('SVBH', 'Saturday', 'Aloo Paratha, Curd', 'Rice, Sambar, Vegetable Fry', 'Lassi, Veg Puff', 'Roti, Mixed Dal'),
    ('SVBH', 'Sunday', 'Chole Bhature', 'Veg Biryani, Raita', 'Cold Drink, Chips', 'Rice, Dal Tadka, Bhindi Fry'),
    ('Patel', 'Monday', 'Idli, Sambar', 'Rice, Dal, Paneer Curry', 'Tea, Samosa', 'Chapati, Mixed Veg'),
    ('Patel', 'Tuesday', 'Dosa, Chutney', 'Fried Rice, Manchurian', 'Coffee, Biscuit', 'Paratha, Potato Curry'),
    ('Patel', 'Wednesday', 'Upma, Chutney', 'Curd Rice, Vegetable Fry', 'Lemonade, Sandwich', 'Rice, Sambar, Papad'),
    ('Patel', 'Thursday', 'Puri, Bhaji', 'Biryani, Raita', 'Tea, Pakoda', 'Naan, Dal Makhani'),
    ('Patel', 'Friday', 'Poha, Jalebi', 'Veg Pulao, Kurma', 'Coffee, Cake', 'Chapati, Paneer Butter Masala'),
    ('Patel', 'Saturday', 'Aloo Paratha, Curd', 'Rice, Sambar, Vegetable Fry', 'Lassi, Veg Puff', 'Roti, Mixed Dal'),
    ('Patel', 'Sunday', 'Chole Bhature', 'Veg Biryani, Raita', 'Cold Drink, Chips', 'Rice, Dal Tadka, Bhindi Fry'),
    ('Tilak', 'Monday', 'Idli, Sambar', 'Rice, Dal, Paneer Curry', 'Tea, Samosa', 'Chapati, Mixed Veg'),
    ('Tilak', 'Tuesday', 'Dosa, Chutney', 'Fried Rice, Manchurian', 'Coffee, Biscuit', 'Paratha, Potato Curry'),
    ('Tilak', 'Wednesday', 'Upma, Chutney', 'Curd Rice, Vegetable Fry', 'Lemonade, Sandwich', 'Rice, Sambar, Papad'),
    ('Tilak', 'Thursday', 'Puri, Bhaji', 'Biryani, Raita', 'Tea, Pakoda', 'Naan, Dal Makhani'),
    ('Tilak', 'Friday', 'Poha, Jalebi', 'Veg Pulao, Kurma', 'Coffee, Cake', 'Chapati, Paneer Butter Masala'),
    ('Tilak', 'Saturday', 'Aloo Paratha, Curd', 'Rice, Sambar, Vegetable Fry', 'Lassi, Veg Puff', 'Roti, Mixed Dal'),
    ('Tilak', 'Sunday', 'Chole Bhature', 'Veg Biryani, Raita', 'Cold Drink, Chips', 'Rice, Dal Tadka, Bhindi Fry');

INSERT INTO hostel_details(reg_no, hostel_name, room_number)
VALUES
    ('A1000001', 'SVBH', '101'),
    ('A1000002', 'Patel', '102'),
    ('A1000003', 'Tilak', '203'),
    ('A1000004', 'Tandon', '204'),
    ('A1000005', 'Malviya', '305'),
    ('A1000006', 'NBH', '306'),
    ('A1000007', 'Raman', '407');

create table reset_tokens(
    token varchar(255) not null,
    created_at varchar(255) not null, 
    expires_at varchar(255) not null,
    reg_no VARCHAR(10) REFERENCES student_details(reg_no) ,
    PRIMARY KEY(reg_no)
);

CREATE TABLE unregistered_meals (
    reg_no VARCHAR(10),
    date DATE,
    breakfast BOOLEAN,
    lunch BOOLEAN,
    snacks BOOLEAN,
    dinner BOOLEAN,
    PRIMARY KEY (reg_no, date),
    FOREIGN KEY (reg_no) REFERENCES student_details(reg_no)
);

ALTER TABLE hostel_details
ADD CONSTRAINT unique_hostel_name UNIQUE (hostel_name);

CREATE TABLE contact_details (
    hostel_name hostel_name_type PRIMARY KEY REFERENCES hostel_details(hostel_name),
    office_mail VARCHAR(255),
    warden_mail VARCHAR(255),
    chief_warden_mail VARCHAR(255);
);
INSERT INTO contact_details (hostel_name, office_mail, warden_mail, chief_warden_mail) VALUES
('SVBH', 'mnrs.rushil@gmail.com', 'mnrs.rushil@gmail.com', 'likhith1660@gmail.com'),
('Patel', 'likhith1660@gmail.com', 'sdubed01@gmail.com', 'dhanapanarahulreddy4444@gmail.com'),
('Tilak', 'sdubed01@gmail.com', 'ramunjalokesh@gmail.com', 'likithkk2004@gmail.com'),
('Tandon', 'dhanapanarahulreddy4444@gmail.com', 'naveenbhukya921@gmail.com', 'mnrs.rushil@gmail.com'),
('Malviya', 'ramunjalokesh@gmail.com', 'likhith1660@gmail.com', 'sdubed01@gmail.com'),
('NBH', 'likithkk2004@gmail.com', 'dhanapanarahulreddy4444@gmail.com', 'ramunjalokesh@gmail.com'),
('Raman', 'naveenbhukya921@gmail.com', 'likithkk2004@gmail.com', 'naveenbhukya921@gmail.com');

ALTER TABLE hostel_details
ADD CONSTRAINT unique_hostel_name UNIQUE (hostel_name);

CREATE TABLE contact_details (
    hostel_name hostel_name_type PRIMARY KEY REFERENCES hostel_details(hostel_name),
    office_mail VARCHAR(255),
    warden_mail VARCHAR(255),
    chief_warden_mail VARCHAR(255);
);
INSERT INTO contact_details (hostel_name, office_mail, warden_mail, chief_warden_mail) VALUES
('SVBH', 'mnrs.rushil@gmail.com', 'mnrs.rushil@gmail.com', 'likhith1660@gmail.com'),
('Patel', 'likhith1660@gmail.com', 'sdubed01@gmail.com', 'dhanapanarahulreddy4444@gmail.com'),
('Tilak', 'sdubed01@gmail.com', 'ramunjalokesh@gmail.com', 'likithkk2004@gmail.com'),
('Tandon', 'dhanapanarahulreddy4444@gmail.com', 'naveenbhukya921@gmail.com', 'mnrs.rushil@gmail.com'),
('Malviya', 'ramunjalokesh@gmail.com', 'likhith1660@gmail.com', 'sdubed01@gmail.com'),
('NBH', 'likithkk2004@gmail.com', 'dhanapanarahulreddy4444@gmail.com', 'ramunjalokesh@gmail.com'),
('Raman', 'naveenbhukya921@gmail.com', 'likithkk2004@gmail.com', 'naveenbhukya921@gmail.com');

ALTER TABLE hostel_details
ADD CONSTRAINT unique_hostel_name UNIQUE (hostel_name);

CREATE TABLE contact_details (
    hostel_name hostel_name_type PRIMARY KEY REFERENCES hostel_details(hostel_name),
    office_mail VARCHAR(255),
    warden_mail VARCHAR(255),
    chief_warden_mail VARCHAR(255)
);

CREATE TABLE stored_complaints (
    complaint_id SERIAL PRIMARY KEY,
    reg_no VARCHAR REFERENCES student_details(reg_no),
    hostel_name hostel_name_type, 
    complaint TEXT,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TYPE hostel_name_type ADD VALUE 'All';
