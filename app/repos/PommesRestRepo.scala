package repos

import javax.inject.Inject
import play.api.libs.json.{JsObject, Json}
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.play.json._
import reactivemongo.play.json.collection._
import reactivemongo.api.ReadPreference
import reactivemongo.api.commands.WriteResult
import reactivemongo.bson.{BSONDocument, BSONObjectID}
import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.ExecutionContext.Implicits.global

import models._

trait PommesRestRepo {
  def find()(implicit ec: ExecutionContext): Future[List[JsObject]]

  def select(selector: BSONDocument)(implicit ec: ExecutionContext): Future[Option[JsObject]]

  def update(selector: BSONDocument, update: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult]

  def remove(document: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult]

  def save(document: BSONDocument)(implicit ec: ExecutionContext): Future[WriteResult]

  def create(pommes: Pommes)(implicit ec: ExecutionContext): Future[WriteResult] 

  // def nearPoint(lon: Double, lat Double, limit= Int=100, ReadPreference = ReadPreference.primaryPreferred)(implicit ec: ExecutionContext): Future[WriteResult]
}

class PommesRestRepoImpl @Inject()(reactiveMongoApi: ReactiveMongoApi) extends PommesRestRepo {

  def collections = reactiveMongoApi.database.map(_.collection[JSONCollection]("pommesindex"))


  override def find()(implicit ec: ExecutionContext): Future[List[JsObject]] = {
    // val genericQueryBuilder = collections.flatMap(_.find(Json.obj());
    // val cursor = genericQueryBuilder.cursor[JsObject](ReadPreference.Primary);
    // cursor.collect[List]()
    //collections.find(Json.obj()).cursor[JsObject](ReadPreference.Primary).collect[List]()
    collections.flatMap(_.find(Json.obj()).cursor[JsObject](ReadPreference.Primary).collect[List]())
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

  // override  def nearPoint(lon: Double, lat: Double, limit= Int=100, ReadPreference = ReadPreference.primaryPreferred)(implicit ec: ExecutionContext): Future[WriteResult] = {
  //   collections.flatMap(_.find(
  //     Json.obj(
  //       Location.obj(
  //         "$near" -> Json.obj(
  //           "$geometry" -> Json.obj(
  //             "type" ->"Point",
  //             "coordinates" -> Json.arr(lon,lat)
  //             )
  //           )
  //         )
  //       )
  //     )
  //   ).cursor[A](readPreference).collect[List](limit)
  // }


}