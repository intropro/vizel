package com.intropro.easel.rest.core

import akka.actor.Actor
import akka.event.Logging
import com.intropro.easel.rest.db.DbConnector
import com.intropro.easel.rest.msg._
import java.sql.Timestamp

import com.intropro.easel.rest.db.DbContext._

/**
 * Trait to define the Operations on TodoItems
 */
trait SqlOperations {

  def executeSql(sql: String)(implicit db: DbConnector) = {
     //SingleItem(from(Todos.todos) (i => where(i.id === id ) select(i)).toList.headOption)
    val rs:SqlData = SqlData(db.execute(sql))
    Success(rs)
  }
}

/**
 * Actor to provide the Operations on TodoItems
 */
class SqlActor extends Actor with SqlOperations{
  val log = Logging(context.system, this)
  def receive = {
      case Execute(sql) => sender ! executeSql(sql)
  }
}
