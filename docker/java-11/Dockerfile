# Base Java Image for ForgeRock Identity Platform. Used for DS, amster, IGx and IDM (Anything that does not need a web
# container)
#
# Copyright 2019 ForgeRock AS. All Rights Reserved
#
# Use of this code requires a commercial software license with ForgeRock AS.
# or with one of its affiliates. All use shall be exclusively subject
# to such license between the licensee and ForgeRock AS.
#
FROM openjdk:11-jdk-slim
RUN jlink --compress=2 \
          --no-header-files \
          --no-man-pages \
          --strip-debug \
          --add-modules java.base,java.compiler,java.desktop,java.instrument,java.management.rmi,java.prefs,java.security.jgss,\
java.security.sasl,java.sql,jdk.security.auth,jdk.unsupported,java.datatransfer,java.logging,java.naming,java.rmi,java.scripting,\
java.sql.rowset,java.transaction.xa,java.xml,java.xml.crypto,jdk.xml.dom,\
jdk.crypto.ec,jdk.crypto.cryptoki,jdk.jfr,jdk.jcmd \
          --output /opt/jdk \
   && cp /usr/local/openjdk-11/bin/jstack /opt/jdk/bin \
   && cp /usr/local/openjdk-11/bin/jps /opt/jdk/bin \
   && apt-get update && apt-get install -y binutils wget \
   && strip -p --strip-unneeded /opt/jdk/lib/server/libjvm.so

# This installs the GCP stack driver profiler. Adds approx 8MB
RUN mkdir -p /opt/cprof && \
     wget -q -O- https://storage.googleapis.com/cloud-profiler/java/latest/profiler_java_agent.tar.gz \
     | tar xzv -C /opt/cprof

# Installs the async-profiler - adds 280K
RUN mkdir -p /opt/async-profiler && \
    wget -q -O-  https://github.com/jvm-profiling-tools/async-profiler/releases/download/v1.5/async-profiler-1.5-linux-x64.tar.gz \
    | tar xzv -C /opt/async-profiler

FROM debian:stable-slim

COPY --from=0 /opt /opt

# Add in ca-certificates needed for uploads to google cloud storage.
RUN adduser --home "/home/forgerock" -uid 11111 --gid 0 forgerock --disabled-password --gecos "forgerock user" && \
   apt-get update && \
   apt-get install -y ca-certificates && \
   rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME /opt/jdk

ENV PATH $PATH:/opt/jdk/bin

