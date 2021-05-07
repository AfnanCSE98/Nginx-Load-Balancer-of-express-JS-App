FROM node:16
WORKDIR /home/node/app
COPY app /home/node/app
RUN npm install
CMD ["/home/node/app/start.sh"]
EXPOSE 5000
