package com.intropro.vizel.rest.db


import java.util.Date
import scala.Some
import com.jolbox.bonecp.{BoneCP, BoneCPConfig}
import org.slf4j.LoggerFactory
import com.github.nscala_time.time.Imports._
/**
 * sample squeryl configuration with mysql database
 */
trait DbConnector {

  //Class.forName("com.mysql.jdbc.Driver")
//  Class.forName("org.h2.Driver")
//  //configure an instantiate BoneCP connection pool
//  val poolConfig = new BoneCPConfig()
//  //poolConfig.setJdbcUrl("jdbc:mysql://localhost:3306/todoexample")
//  poolConfig.setJdbcUrl("jdbc:h2:mem:test")
//  poolConfig.setUsername("todouser")
//  poolConfig.setPassword("password")
//  poolConfig.setMinConnectionsPerPartition(5);
//  poolConfig.setMaxConnectionsPerPartition(1000);
//  poolConfig.setPartitionCount(1);
//  val connectionPool = new BoneCP(poolConfig)
//
//  // create a squeryl session factory
//  val log = LoggerFactory.getLogger("Database")
  def execute(sql:String):AnyRef

}


class DbFakeConnector extends  DbConnector {
  // result is of any value at the moment
  def execute(sql:String):AnyRef = {
    Console.err.println(s"execute: [sql=${sql}]")
    List(Map("IS_PUSH" -> 0))
    val r: List[Map[String,Any]] = List(
      Map("IS_PUSH" -> 0,
          "ADDED_DATE" -> DateTime.now,
          "UPCOMING_MOVIE" -> 0,
          "DESCRIPTION" -> "A man is ready to put down roots in Croatia.",
          "PGRS_HASH" -> "ca8f89a19b0309ec4527e4f373f22f4e",
          "TMS_CONNECTOR_ID" -> "SH008048630000",
          "RATING" -> "TVG",
          "CHANNEL_ADULT" -> true,
          "TITLE" -> "House Hunters International",
          "SERIES_ID" -> 185817,
          "PGRS_OBJECT_STATE" -> "A",
          "TMS_ID" -> "EP008048630214")
    )
    r
  }
}

