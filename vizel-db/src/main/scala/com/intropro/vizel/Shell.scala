package com.intropro.vizel

/**
 * This works only 2.10.*
 * 2.11 broke compatibility
 */

import java.io.File
import java.net.{URL, URLClassLoader}

import com.intropro.vizel.rest.db.{DbContext, DbFakeConnector, DbConnector}

import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.ILoop

import scalikejdbc._
import scalikejdbc.StringSQLRunner._


class DbConnectorScalike extends DbConnector {
  override def execute(sql: String): AnyRef = {
    Console.out.println(s"Executing: ${sql}")
    val rs = sql.run()
    Console.out.println(s"Executed: ${sql}: ${rs}")
    rs
  }
}

object Easel {
  def start = {
    DbContext.connector = new DbConnectorScalike
  }
}

object DynamicLoader {
  def loadFromJar(jarPath:String,className:String):Any = {
    val classLoader = new URLClassLoader(
      Seq(new File(jarPath).toURI().toURL()).toArray
    )
    val c = classLoader.loadClass(className)
    val instance = c.newInstance()
    Class.forName(className);
    Console.out.println(s"Driver: '${className}': class='${instance.getClass}'")

  }
}




