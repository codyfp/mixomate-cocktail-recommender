FROM python:3.9-slim-buster

ENV FLASK_ENV=development

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install pandas
COPY app/api/recommendations/model.py model.py
COPY app/api/recommendations/compressed_combined_df.pkl.gz /app/compressed_combined_df.pkl.gz
COPY app/api/recommendations/compressed_similarity_matrix.h5 /app/compressed_similarity_matrix.h5



COPY . .
# Copy CSV files into the image



CMD [ "flask", "run", "--host=0.0.0.0" ]