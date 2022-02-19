##back end setup

place environment variables (database server/login etc) in `root/.env`.

create python virtual environment:<br>
`$ python3 -m virtualenv venv`

activate virtual environment:<br>
`$ source venv/bin/activate`

install required packages:<br>
`$ pip install -r requirements.txt`

create superuser:<br>
`$ python3 manage.py createsuperuser`

run web server:<br>
`$ python3 manage.py runserver`
