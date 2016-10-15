#!/usr/bin/env bash
cd dtrack-ui
mvn clean install
cd ..
mvn clean package -DskipTests=true
java -jar ./target/dtrack-server-0.0.1-SNAPSHOT.jar