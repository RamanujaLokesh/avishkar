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

create table reset_tokens(
    token varchar(255) not null,
    created_at varchar(255) not null, 
    expires_at varchar(255) not null,
    reg_no int not null,
    PRIMARY KEY(user_id, token)
);