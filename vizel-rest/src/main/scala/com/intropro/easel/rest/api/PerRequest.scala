package com.intropro.easel.rest.api

import akka.actor._
import com.intropro.easel.rest.api.PerRequest.WithProps
import spray.http.StatusCodes._
import spray.http.{HttpHeader, StatusCode}
import akka.actor.SupervisorStrategy.Stop
import scala.concurrent.duration._
import spray.routing.RequestContext
import akka.actor.OneForOneStrategy
import com.intropro.easel.rest.msg._

import spray.httpx.Json4sSupport
import org.json4s.DefaultFormats
import spray.http.HttpHeaders.Location


/**
 * Per request pattern, taken from https://github.com/NET-A-PORTER/spray-actor-per-request
 *
 * Created by rguderlei on 25.02.14.
 */
trait PerRequest extends Actor with Json4sSupport{
    def r: RequestContext
    def target: ActorRef
    def message: RequestMessage

    import context._

    //implicit val json4sFormats = DefaultFormats.withBigDecimal
    override val json4sFormats = DefaultFormats.withBigDecimal

    setReceiveTimeout(5.seconds)

    target ! message

    def receive = {
      //case Execute(sql) => complete(spray.http.StatusCodes.Created, "")
      case Execute(rs) => complete(OK,rs)
      case com.intropro.easel.rest.msg.Success(rs) => complete(OK, rs)
      case Error(message) => complete(BadRequest, message)
      case ReceiveTimeout => complete(GatewayTimeout, "Request timeout")
    }

    def complete[T <: AnyRef](status: StatusCode, obj: T, headers: List[HttpHeader] = List()) = {
      r.withHttpResponseHeadersMapped(oldheaders => oldheaders:::headers).complete(status, obj)
      stop(self)
    }

    override val supervisorStrategy =
      OneForOneStrategy() {
        case e => {
          complete(InternalServerError, Error(e.getMessage))
          Stop
        }
      }
}

object PerRequest {
  case class WithProps(r: RequestContext, props: Props, message: RequestMessage) extends PerRequest {
    lazy val target = context.actorOf(props)
  }
}

trait PerRequestCreator {
  def perRequest(actorRefFactory: ActorRefFactory, r: RequestContext, props: Props, message: RequestMessage) =
    actorRefFactory.actorOf(Props(new WithProps(r, props, message)))
}
