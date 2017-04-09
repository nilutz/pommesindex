package repos

import javax.inject.Inject
import play.api.libs.json.{ JsObject, Json }
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.play.json._
import reactivemongo.play.json.collection._
import reactivemongo.api.ReadPreference
import reactivemongo.api.commands.WriteResult
import reactivemongo.bson.{ BSONDocument, BSONObjectID }
import scala.concurrent.{ ExecutionContext, Future }
import scala.concurrent.ExecutionContext.Implicits.global

import reactivemongo.api.indexes.Index
import reactivemongo.api.indexes.IndexType.Geo2DSpherical

import models._

trait PommesRestRepo {

  def find()(implicit ec: ExecutionContext): Future[List[JsObject]]

  def findWithLimit(limit: Int = 100)(implicit ec: ExecutionContext): Future[List[JsObject]]

  def select(selector: BSONDocument)(implicit ec: ExecutionContext): Future[Option[JsObject]]

  def update(selector: BSONDocument, update: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult]

  def remove(document: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult]

  def save(document: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult]

  def create(pommes: Pommes)(implicit ec: ExecutionContext): Future[WriteResult]

  def nearPoint(lat: Double, lng: Double, radius: Int = 3000, limit: Int = 100)(implicit ec: ExecutionContext): Future[List[JsObject]]

}

class PommesRestRepoImpl @Inject() (reactiveMongoApi: ReactiveMongoApi) extends PommesRestRepo {

  def collections = reactiveMongoApi.database.map(_.collection[JSONCollection]("pommesindex"))

  override def find()(implicit ec: ExecutionContext): Future[List[JsObject]] = {
    // val genericQueryBuilder = collections.flatMap(_.find(Json.obj());
    // val cursor = genericQueryBuilder.cursor[JsObject](ReadPreference.Primary);
    // cursor.collect[List]()
    //collections.find(Json.obj()).cursor[JsObject](ReadPreference.Primary).collect[List]()
    collections.flatMap(_.find(Json.obj()).cursor[JsObject](ReadPreference.Primary).collect[List]())
  }

  override def findWithLimit(limit: Int = 100)(implicit ec: ExecutionContext): Future[List[JsObject]] = {
    // val genericQueryBuilder = collections.flatMap(_.find(Json.obj());
    // val cursor = genericQueryBuilder.cursor[JsObject](ReadPreference.Primary);
    // cursor.collect[List]()
    //collections.find(Json.obj()).cursor[JsObject](ReadPreference.Primary).collect[List]()
    collections.flatMap(_.find(Json.obj()).cursor[JsObject](ReadPreference.Primary).collect[List](limit))
  }

  override def select(selector: BSONDocument)(implicit ec: ExecutionContext): Future[Option[JsObject]] = {
    collections.flatMap(_.find(selector).one[JsObject])
  }

  override def update(selector: BSONDocument, update: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult] = {
    collections.flatMap(_.update(selector, update))
  }

  override def remove(document: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult] = {
    collections.flatMap(_.remove(document))
  }

  override def save(document: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult] = {
    collections.flatMap(_.update(BSONDocument("_id" -> document.get("_id").getOrElse(BSONObjectID.generate)), document, upsert = true))
  }

  override def create(pommes: Pommes)(implicit ec: ExecutionContext): Future[WriteResult] = {
    collections.flatMap(_.insert(pommes))
  }
  // Json.obj(
  //         "location" -> Json.obj(
  //           "$near" -> Json.obj(
  //             "$geometry" -> Json.obj(
  //               "type" -> "Point",
  //               "coordinates" -> Json.arr(lat, lng)))))
  override def nearPoint(lat: Double, lng: Double, radius: Int = 3000, limit: Int = 100)(implicit ec: ExecutionContext): Future[List[JsObject]] = {
  
  // lazy val geo2DSphericalIndex = Index(Seq(("location", Geo2DSpherical)), Some("geo2DSphericalIdx"))    
  collections.flatMap(_.indexesManager.ensure(Index(Seq("location" -> Geo2DSpherical), unique=true)))
  collections.flatMap(_.find(
      Json.obj(
        "location" -> Json.obj(
          "$near" -> Json.obj(
            "$geometry" -> Json.obj(
              "type" -> "Point",
              "coordinates" -> Json.arr(lat, lng)),
            "$maxDistance" -> radius)
          )
        )
      ).cursor[JsObject](ReadPreference.Primary).collect[List](limit))
  }

}