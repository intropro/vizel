package com.intropro.easel.rest.db

/**
 * Created by andreyk on 12.11.14.
 */

object DbContext {
  implicit var connector : DbConnector = new DbFakeConnector
}
