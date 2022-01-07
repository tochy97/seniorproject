# UTA CSE Lab Equipment Checkout

## Requirements

Must be able to add student (name, id, email, instructor, section, team)

Must be able to add admin (name, email)

Must be able to add items (name, id, description)

Must be able to check out items to students (either card swipe or qr/camera)

Must be able to check in items from students

Must be able to generate reports to what items we have

Reports to see what's checked out

Reports to see whats overdue

Must be able to generate ids/barcodes/qr codes for items

## Todo

Add instructor view handler for profile page

Add instructor vs account permisions

Add instructor api for adding sections

Change checkout item to accept serial number as input, scan through the items in database and automatically put the item the currently logged in accounts item list

Change instructor select input to get the options from users who have superuser priveledges

Change section select input to get the options from selected instructor section list
