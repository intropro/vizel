#!/bin/bash

CONF=${1:-db-iers.conf}
SCALA_HOME=${SCALA_HOME:-/opt/scala-2.11.4}

if [ ! -e "$SCALA_HOME" ]; then
    which scala
    if [ "$?" != "0" ]; then 
        echo "ERR: Scala not found"
        exit 1
    fi
    SCALA_HOME=`which scala`/../
fi

#check version
$SCALA_HOME/bin/scala -version 2>&1|grep 2.11;
if [ "$?" == "1" ]; then
    echo "ERR: vizel-shell requires Scala 2.11 runtime"
    exit 2
fi

$SCALA_HOME/bin/scala -i $CONF -cp target/scala-2.11/vizel-assembly-0.0.4-SNAPSHOT.jar
