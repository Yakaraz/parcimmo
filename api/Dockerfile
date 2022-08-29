FROM maven:3.6.3-openjdk-8

COPY . src
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD cd src ; /wait && mvn spring-boot:run

