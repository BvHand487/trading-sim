FROM openjdk:17-jdk-slim
# Make sure you're using Java 17 here

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["sh", "-c", "java -version && java -jar /app.jar"]