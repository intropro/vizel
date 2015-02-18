import sbt._
import Keys._

import sbtassembly.Plugin._
import AssemblyKeys._ 

object build extends Build {

  val public = true
  val Settings = Defaults.defaultSettings ++ Seq(
    version := "0.0.5-SNAPSHOT",
    organization := "com.intropro",
    scalaVersion := "2.11.0",
//    crossScalaVersions := Seq("2.10.0", "2.11.0"),
    scalacOptions ++= Seq("-unchecked", "-deprecation", "-optimize", "-feature", "-Yinline-warnings", "-language:existentials", "-language:implicitConversions", "-language:higherKinds", "-language:reflectiveCalls", "-language:postfixOps"),
    javacOptions ++= Seq("-target", "1.6", "-source", "1.6"),
//    manifestSetting,
//    publishSetting,
    resolvers ++= Seq(Opts.resolver.sonatypeSnapshots, Opts.resolver.sonatypeReleases),
    crossVersion := CrossVersion.binary,
    resolvers ++= Seq(
      "spray repo"         at "http://repo.spray.io/",
      "sonatype releases"  at "http://oss.sonatype.org/content/repositories/releases/",
      "sonatype snapshots" at "http://oss.sonatype.org/content/repositories/snapshots/",
      "typesafe repo"      at "http://repo.typesafe.com/typesafe/releases/",
      "intropro releases"  at "http://build.ea.intropro.com:8081/nexus/content/repositories/releases-public/",
      "intropro snapshots" at "http://build.ea.intropro.com:8081/nexus/content/repositories/snapshots-public/"
    ),

//    publishMavenStyle := true,

    publishTo := {
	  val nexus = "http://build.ea.intropro.com:8081/nexus/"
	  if (isSnapshot.value)
        Some("snapshots" at nexus + "content/repositories/snapshots-public") 
	  else
	    Some("releases"  at nexus + "content/repositories/releases-public")
    },

    credentials += Credentials(Path.userHome / ".sbt" / ".credentials")
  )

  lazy val root = Project(
    id = "vizel",
    base = file("."),
    settings = Settings ++ assemblySettings
  ) dependsOn(vizel_db,vizel_rest) //aggregate(vizel_db, vizel_rest)


  lazy val vizel_db = Project(
    id = "vizel-db",
    base = file("vizel-db"),
    settings = Settings ++ Seq(
      libraryDependencies ++= Seq(
          "org.scalikejdbc" %% "scalikejdbc"        % "2.2.+",
          "ch.qos.logback"  %  "logback-classic"    % "1.1.+"
      )
    )
  ) dependsOn(vizel_rest % "compile")

  lazy val vizel_rest = Project(
    id = "vizel-rest",
    base = file("vizel-rest"),
    settings = Settings ++ Seq(
      libraryDependencies ++= Seq(
          "io.spray"            %%    "spray-can"         % "1.3.1",
          "io.spray"            %%    "spray-routing"     % "1.3.1",
          "io.spray"            %%    "spray-testkit"     % "1.3.1",
          "io.spray"            %%    "spray-json"        % "1.3.1",
          //"org.json4s"          %%    "json4s-native"     % "3.2.12",
          //"org.json4s"          %    "json4s-native_2.10"     % "3.2.10",
          "org.json4s"          %%    "json4s-native" % "3.2.10-INTROPRO",
          //"org.json4s"          %%    "json4s-native" % "3.2.10",
          "com.typesafe.akka"   %%    "akka-actor"        % "2.3.0",
          "com.jolbox"          %     "bonecp"            % "0.8.0.RELEASE",
          "com.github.nscala-time" %% "nscala-time"       % "1.4.0"
      )
    )
  ) 


}


