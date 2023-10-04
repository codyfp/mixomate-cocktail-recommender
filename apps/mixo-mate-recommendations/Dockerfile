FROM python:3.9-slim-buster

ENV FLASK_ENV=development

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install pandas


COPY . .
# Copy CSV files into the image



CMD [ "flask", "run", "--host=0.0.0.0" ]