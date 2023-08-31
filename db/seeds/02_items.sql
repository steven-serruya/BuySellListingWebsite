INSERT INTO items (name, price, picurl, seller_id, description, detailed_description)
VALUES
    ('Laptop', 999.99, '/images/01_laptop_1500.jpg', 1, 'Powerful laptop for all your computing needs.', 'Whether youre a professional or a student, this laptop offers blazing-fast performance and stunning visuals. With a high-resolution display and advanced graphics, its perfect for multitasking and entertainment.'),
    ('Smartphone', 699.00, '/images/02_smartphone_1500.jpg', 2, 'High-end smartphone with advanced features.', 'Experience the future with this sleek smartphone. Its cutting-edge camera technology captures breathtaking photos, and its powerful processor ensures smooth performance for all your apps.'),
    ('Headphones', 149.99, '/images/03_headphones_1500.jpg', 3, 'High-quality headphones for immersive audio.', 'Immerse yourself in your favorite music like never before. These headphones deliver crisp highs, deep bass, and active noise cancellation, making every listening session a treat.'),
    ('Coffee Maker', 49.99, '/images/04_coffemaker_1500.jpg', 4, 'Brew your favorite coffee with ease.', 'Start your mornings right with this efficient coffee maker. Its programmable features let you wake up to the aroma of freshly brewed coffee, while its compact design saves valuable counter space.'),
    ('Fitness Tracker', 89.99, '/images/05_fitnessTracker_1500.jpg', 5, 'Track your fitness goals with this device.', 'Stay motivated on your fitness journey with this advanced tracker. Monitor your heart rate, sleep patterns, and daily activity, and receive personalized insights to reach your goals.'),
    ('Bluetooth Speaker', 79.99, '/images/06_bluetoothSpeeaker_1500.jpg', 1, 'Portable speaker with Bluetooth connectivity.', 'Take the party with you wherever you go. This speaker offers powerful sound and seamless Bluetooth pairing, making it an essential companion for outdoor adventures.'),
    ('Wireless Earbuds', 129.99, '/images/07_wirelessEarbuds_1500.jpg', 2, 'Enjoy wireless audio with these earbuds.', 'Cut the cords and enjoy total freedom with these wireless earbuds. With ergonomic design and long battery life, theyre perfect for your on-the-go lifestyle.'),
    ('Tablet', 349.00, '/images/08_tablet_1500.jpg', 3, 'Versatile tablet for work and entertainment.', 'Unleash your creativity and productivity with this versatile tablet. Whether youre sketching, taking notes, or streaming content, its responsive touchscreen and powerful features have you covered.'),
    ('Gaming Console', 399.00, '/images/09_gamingConsole_1500.jpg', 4, 'Next-gen gaming console for immersive gameplay.', 'Step into a world of gaming like never before. This console delivers breathtaking graphics and responsive gameplay, allowing you to dive into epic adventures and multiplayer action.'),
    ('Camera', 599.99, '/images/10_camera_1500.jpg', 5, 'Capture stunning moments with this camera.', 'Preserve memories in crystal-clear detail with this high-performance camera. From breathtaking landscapes to candid portraits, its advanced features ensure every shot is a masterpiece.'),
    ('TV', 899.00, '/images/11_tv_1500.jpg', 1, 'High-definition TV for an enhanced viewing experience.', 'Transform your entertainment experience with this stunning TV. Its immersive display and smart features bring your favorite movies and shows to life, right in your living room.'),
    ('Smart Watch', 249.99, '/images/12_smartWatch_1500.jpg', 2, 'Stay connected with this smartwatch.', 'Stay connected and organized with this intelligent smartwatch. Get notifications, track your health, and customize watch faces for a device that matches your style and needs.'),
    ('Printer', 119.99, '/images/13_printer_1500.jpg', 3, 'Print documents and photos with ease.', 'Experience hassle-free printing with this reliable printer. Whether youre producing important documents or cherished photos, its high-quality output ensures professional results every time.'),
    ('Monitor', 299.00, '/images/14_Monitor_1500.jpg', 4, 'High-quality monitor for improved productivity.', 'Boost your productivity with this high-resolution monitor. Its expansive display and color accuracy provide a comfortable workspace for all your tasks, from creative projects to spreadsheets.'),
    ('Desk Chair', 159.99, '/images/15_deskChair_1500.jpg', 5, 'Ergonomic desk chair for comfort during work.', 'Support your body during long work sessions with this ergonomic desk chair. Adjustable features and lumbar support ensure comfort, allowing you to focus on your work without discomfort.'),
    ('Microwave Oven', 89.99, '/images/16_microwave_1500.jpg', 1, 'Efficient microwave oven for quick meals.', 'Simplify meal prep with this efficient microwave oven. Whether youre reheating leftovers or defrosting ingredients, its user-friendly controls and compact design make cooking a breeze.'),
    ('Vacuum Cleaner', 179.99, '/images/17_vacuumCleaner_1500.jpg', 2, 'Powerful vacuum cleaner for clean spaces.', 'Keep your living space spotless with this high-performance vacuum cleaner. With strong suction and versatile attachments, it effectively tackles dust, dirt, and pet hair.'),
    ('Blender', 39.99, '/images/18_blender_1500.jpg', 3, 'Blend ingredients for smoothies and more.', 'Whip up delicious and nutritious concoctions with this easy-to-use blender. From smoothies to soups, its powerful motor and sharp blades create consistently smooth results.'),
    ('Toaster', 29.99, '/images/19_toaster_1500.jpg', 4, 'Quickly toast bread and other snacks.', 'Start your mornings with perfectly toasted bread, bagels, and more. With adjustable settings and a sleek design, this toaster adds convenience to your breakfast routine.'),
    ('Electric Kettle', 24.99, '/images/20_electric_kettle_1500.jpg', 5, 'Boil water efficiently with this kettle.', 'Experience fast and efficient boiling with this electric kettle. Its sleek design and rapid boiling technology make it a must-have appliance.')


















-- -- Insert 20 items with brief descriptions
-- INSERT INTO items (name, price, picurl, seller_id, description)
-- VALUES
--     ('Laptop', 999.99, 'images/01_laptop_1500.jpg', 1, 'Powerful laptop for all your computing needs.'),
--     ('Smartphone', 699.00, 'images/02_smartphone_1500.jpg', 2, 'High-end smartphone with advanced features.'),
--     ('Headphones', 149.99, 'images/03_headphones_1500.jpg', 3, 'High-quality headphones for immersive audio.'),
--     ('Coffee Maker', 49.99, 'images/04_coffemaker_1500.jpg', 4, 'Brew your favorite coffee with ease.'),
--     ('Fitness Tracker', 89.99, 'images/05_fitnessTracker_1500.jpg', 5, 'Track your fitness goals with this device.'),
--     ('Bluetooth Speaker', 79.99, 'images/06_bluetoothSpeeaker_1500.jpg', 1, 'Portable speaker with Bluetooth connectivity.'),
--     ('Wireless Earbuds', 129.99, 'images/07_wirelessEarbuds_1500.jpg', 2, 'Enjoy wireless audio with these earbuds.'),
--     ('Tablet', 349.00, 'images/08_tablet_1500.jpg', 3, 'Versatile tablet for work and entertainment.'),
--     ('Gaming Console', 399.00, 'images/09_gamingConsole_1500.jpg', 4, 'Next-gen gaming console for immersive gameplay.'),
--     ('Camera', 599.99, 'images/10_camera_1500.jpg', 5, 'Capture stunning moments with this camera.'),
--     ('TV', 899.00, 'images/11_tv_1500.jpg', 1, 'High-definition TV for an enhanced viewing experience.'),
--     ('Smart Watch', 249.99, 'images/12_smartWatch_1500.jpg', 2, 'Stay connected with this smartwatch.'),
--     ('Printer', 119.99, 'images/13_printer_1500.jpg', 3, 'Print documents and photos with ease.'),
--     ('Monitor', 299.00, 'images/14_Monitor_1500.jpg', 4, 'High-quality monitor for improved productivity.'),
--     ('Desk Chair', 159.99, 'images/15_deskChair_1500.jpg', 5, 'Ergonomic desk chair for comfort during work.'),
--     ('Microwave Oven', 89.99, 'images/16_microwave_1500.jpg', 1, 'Efficient microwave oven for quick meals.'),
--     ('Vacuum Cleaner', 179.99, 'images/17_vacuumCleaner_1500.jpg', 2, 'Powerful vacuum cleaner for clean spaces.'),
--     ('Blender', 39.99, 'images/18_blender_1500.jpg', 3, 'Blend ingredients for smoothies and more.'),
--     ('Toaster', 29.99, 'images/19_toaster_1500.jpg', 4, 'Quickly toast bread and other snacks.'),
--     ('Electric Kettle', 24.99, 'images/20_electric_kettle_1500.jpg', 5, 'Boil water efficiently with this kettle.');
















-- -- Insert 20 items
-- INSERT INTO items (name, price, picurl, seller_id)
-- VALUES
--     ('Laptop', 999.99, 'images/01_laptop_1500.jpg' , 1),
--     ('Smartphone', 699.00, 'images/02_smartphone_1500.jpg', 2),
--     ('Headphones', 149.99, 'images/0_headphones_1500.jpg',  3),
--     ('Coffee Maker', 49.99, 'images/04_coffemaker_1500.jpg', 4),
--     ('Fitness Tracker', 89.99, 'images/05_fitnessTracker_1500.jpg', 5),
--     ('Bluetooth Speaker', 79.99, 'images/06_bluetoothSpeeaker_1500.jpg', 1),
--     ('Wireless Earbuds', 129.99, 'images/07_wirelessEarbuds_1500.jpg', 2),
--     ('Tablet', 349.00, 'images/08_tablet_1500.jpg', 3),
--     ('Gaming Console', 399.00, 'images/09_gamingConsole_1500.jpg', 4),
--     ('Camera', 599.99, 'images/10_camera_1500.jpg',  5),
--     ('TV', 899.00, 'images/11_tv_1500.jpg', 1),
--     ('Smart Watch', 249.99, 'images/12_smartWatch_1500.jpg', 2),
--     ('Printer', 119.99, 'images/13_printer_1500.jpg', 3),
--     ('Monitor', 299.00, 'images/14_Monitor_1500.jpg', 4),
--     ('Desk Chair', 159.99, 'images/15_deskChair_1500.jpg', 5),
--     ('Microwave Oven', 89.99, 'images/16_microwave_1500.jpg', 1),
--     ('Vacuum Cleaner', 179.99, 'images/17_vacuumCleaner_1500.jpg',  2),
--     ('Blender', 39.99, 'images/18_blender_1500.jpg', 3),
--     ('Toaster', 29.99, 'images/19_toaster_1500.jpg', 4),
--     ('Electric Kettle', 24.99, 'images/20_electric_kettle_1500.jpg', 5);
