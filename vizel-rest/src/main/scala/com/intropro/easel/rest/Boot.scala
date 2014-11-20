package com.intropro.easel.rest

import akka.actor.{Props, ActorSystem}
import com.intropro.easel.rest.db.{DbFakeConnector, DbConnector}
import com.intropro.easel.rest.api.SqlRestServiceActor
import com.intropro.easel.rest.core.SqlActor
import akka.io.IO
import spray.can.Http


object Boot extends App {


  def start(host:String="localhost",port:Int=9090) = {
    // we need an ActorSystem to host our application in
    implicit val system = ActorSystem("easel")

    // create and start our service actor
    val service = system.actorOf(Props[SqlRestServiceActor], "easel-service")

    // start a new HTTP server on port 8080 with our service actor as the handler
    IO(Http) ! Http.Bind(service, interface = host, port = port)
  }

  start()
}