import de.guderlei.spray.database.DatabaseConfiguration
import de.guderlei.spray.domain.SqlCommand
import org.specs2.mutable.Specification
import spray.testkit.Specs2RouteTest
import de.guderlei.spray.api._
import spray.http.StatusCodes._
import java.sql.Timestamp


class MyRouteTest extends Specification with Specs2RouteTest with SqlRestService with DatabaseConfiguration {
  def actorRefFactory = system // connect the DSL to the test ActorSystem
  // start the backend actor, the database is started using the DatabaseConfiguration mixin



  var location: String = ""

  "The service" should {
    sequential // this does the trick to share state along the tests


    "return empty list of todoitems" in {
      Get("/items") ~> itemRoute ~> check {
        status === OK
        val content = responseAs[List[SqlCommand]]
        content must beEmpty
      }
    }

    "return a 201 when trying to create a valid new one" in {
      Post("/items", new SqlCommand(-1, new Timestamp(System.currentTimeMillis), "test")) ~> itemRoute ~> check {

        location = header("location") match {
          case Some(header) => header.value
          case _ => "fail"
        }
        println("#" + location)
        status === Created
        location must not be equalTo("fail")
      }
    }

    "return the previously created item by its direct url" in {
      Get(location) ~> itemRoute ~> check {
        val item = responseAs[SqlCommand]
        status === OK
        item.text === "test"
      }
    }

    "modify the created item" in {
      Put(location, new SqlCommand(-1,  new Timestamp(System.currentTimeMillis), "other text")) ~> itemRoute ~> check {

        body.asString must contain("other text")
        status === OK
      }
    }

    "delete the item" in {
      Delete(location) ~> itemRoute ~> check {
        status === OK
      }
    }

    "not find the deleted item" in {
      Get(location) ~> sealRoute(itemRoute) ~> check {
        status === NotFound
      }
    }
  }
}
