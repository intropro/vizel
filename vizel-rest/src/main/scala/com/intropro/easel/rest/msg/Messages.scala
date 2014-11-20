package com.intropro.easel.rest.msg

import java.sql.Timestamp

/**
 * Created by rguderlei on 25.02.14.
 */
sealed trait ResultMessage

case class Success(rs: AnyRef) extends ResultMessage
case class Error(message: String)


sealed trait RequestMessage

case class Execute(sql:String) extends RequestMessage
