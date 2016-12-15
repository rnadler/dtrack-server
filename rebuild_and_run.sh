#!/usr/bin/env bash
pushd ../dtrack-ui
mvn clean install
popd
mvn clean package -DskipTests=true
java -jar ./target/dtrack-server-0.0.1-SNAPSHOT.jar