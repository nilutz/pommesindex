import play.sbt.PlayImport.PlayKeys.playRunHooks

name := """pommesindex"""

version := "1.0-0"

scalaVersion := "2.11.7"


lazy val root = (project in file(".")).enablePlugins(PlayScala,SbtWeb)

libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.0"
libraryDependencies ++= Seq(
  specs2 % Test,
   "org.reactivemongo" %% "play2-reactivemongo" % "0.12.1",
   "com.typesafe.play.extras" %% "play-geojson" % "1.4.0"
)

playRunHooks <+= baseDirectory.map(Webpack.apply)

routesGenerator := InjectedRoutesGenerator

excludeFilter in (Assets, JshintKeys.jshint) := "*.js"

watchSources ~= { (ws: Seq[File]) =>
  ws filterNot { path =>
    path.getName.endsWith(".js") || path.getName == ("build")
  }
}

pipelineStages := Seq(digest, gzip)