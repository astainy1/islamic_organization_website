CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) DEFAULT NULL,
    profile_picture VARCHAR(255) DEFAULT 'default-profile.png',
    password VARCHAR(255) NOT NULL,
    role ENUM('superadmin', 'admin', 'editor') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO admins (name, username, email, phone, profile_picture, password, role)
VALUES (
    'Super Admin',
    'admin',
    'admin@lajinahliberia.org',
    '+231777000000',
    'default-profile.png',
    '$2b$10$y1PVNcRBmf0B2nEyUL6GxuF4SyLyrKNey0BvgftSNlZwm8bn8BtEu', 
    'superadmin'
);

-- Program Table

CREATE TABLE programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  description TEXT,
  target_audience VARCHAR(255),
  location VARCHAR(255),
  frequency VARCHAR(100),
  duration VARCHAR(100),
  video_url VARCHAR(255),
  testimonial TEXT,
  testimonial_by VARCHAR(100),
  hero_image VARCHAR(255),
  cover_image VARCHAR(255),
  pdf_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE program_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  ongoing BOOLEAN DEFAULT 0,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- For gallery images related to a project
CREATE TABLE project_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);



