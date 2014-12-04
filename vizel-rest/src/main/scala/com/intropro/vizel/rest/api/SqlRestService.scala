package com.intropro.vizel.rest.api

import akka.actor.{Props, Actor}
import com.intropro.vizel.rest.msg.Execute
import spray.http.{StatusCode, AllOrigins, MediaTypes, MediaType}
import spray.routing._
import com.intropro.vizel.rest.core._
import com.intropro.vizel.rest.msg._
import spray.httpx.Json4sSupport
import org.json4s.DefaultFormats

import spray.http.StatusCodes._
import spray.http.HttpHeaders._
import spray.http.HttpMethods._


/**
 * Actor to provide the routes of the rest services
 */
class SqlRestServiceActor extends Actor with SqlRestService {

  def actorRefFactory = context

  // this actor only runs our route, but you could add
  // other things here, like request stream processing
  // or timeout handling
  def receive = runRoute(itemRoute)


}

trait SqlRestService extends HttpService with PerRequestCreator with Json4sSupport {
  implicit def executionContext = actorRefFactory.dispatcher

  val corsHeaders = List(`Access-Control-Allow-Origin`(AllOrigins),
    `Access-Control-Allow-Methods`(GET, POST, OPTIONS, DELETE),
    `Access-Control-Allow-Headers`("Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Host, Referer, User-Agent"))


  implicit val json4sFormats = DefaultFormats

  // static route to Notebook is for development and quick startup and not "production"
  val staticRoute = {
        path("") {
            getFromResource("notebook/index.html")
        } ~ {
            getFromResourceDirectory("notebook")
        }
    }

  //override val json4sFormats = DefaultFormats.withBigDecimal
  val itemRoute =
      path("query") {
        get {
          respondWithMediaType(MediaTypes.`application/json`) {
            complete("")
          }
        } ~
        post {
          respondWithHeaders(corsHeaders) {
            entity(as[SqlCommand]) {
              item =>
                handlePerRequest {
                  Execute(item.query)
                }
            }
          }
        } ~
        options
        {
            respondWithHeaders(corsHeaders) {
              complete("")
            }
        }
      } ~ staticRoute


  def handlePerRequest(message: RequestMessage): Route =
    ctx => perRequest(actorRefFactory, ctx, Props[SqlActor], message)
}



