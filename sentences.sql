CREATE TABLE tasks (
  id serial PRIMARY KEY,
  title VARCHAR ( 255 ) NOT NULL,
  complete boolean DEFAULT false
);

INSERT INTO tasks(title)
VALUES
('Task 1'),
('Task 2');

INSERT INTO product(name, description, price, stock, image)
VALUES
('Producto 1', 'Es algo', 150, 10, 'url1'),
('Producto 2', 'Es algo', 150, 10, 'url2');