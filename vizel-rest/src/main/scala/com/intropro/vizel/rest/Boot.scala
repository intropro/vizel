package com.intropro.vizel.rest

import akka.actor.{Props, ActorSystem}
import com.intropro.vizel.rest.db.{DbFakeConnector, DbConnector}
import com.intropro.vizel.rest.api.SqlRestServiceActor
import com.intropro.vizel.rest.core.SqlActor
import akka.io.IO
import spray.can.Http


object Boot extends App {


  def start(host:String="0.0.0.0",port:Int=9090) = {
    // we need an ActorSystem to host our application in
    implicit val system = ActorSystem("vizel")

    // create and start our service actor
    val service = system.actorOf(Props[SqlRestServiceActor], "vizel-service")

    // start a new HTTP server on port 8080 with our service actor as the handler
    IO(Http) ! Http.Bind(service, interface = host, port = port)
  }

  start()
}
