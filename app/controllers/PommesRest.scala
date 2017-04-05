package controllers

import javax.inject.Inject

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Json
import play.api.mvc._
import play.modules.reactivemongo._
import models._
// {MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.api.commands.WriteResult
import reactivemongo.bson.{ BSONObjectID, BSONDocument }
import repos.PommesRestRepoImpl

import scala.concurrent.Future

class PommesRest @Inject() (val reactiveMongoApi: ReactiveMongoApi) extends Controller
  with MongoController with ReactiveMongoComponents {

  import controllers.PommesFields._

  def pommesRepo = new PommesRestRepoImpl(reactiveMongoApi)

  /**
  * gives all the pommes in the DB
  */
  def index = Action.async { implicit request =>
    pommesRepo.find().map(pommes => Ok(Json.toJson(pommes)))
  }

  /**
  * reads a pommes into the DB based on ID
  * @param the BSONObject Id
  * 
  */
  def read(id: String) = Action.async { implicit request =>
    pommesRepo.select(BSONDocument(Id -> BSONObjectID(id))).map(pommes => Ok(Json.toJson(pommes)))
  }

  /**
  * updates a pommes into the DB
  * here BSON Document is used for update
  * see insert for JSON
  * @param the BSONObject Id
  */
  def update(id: String) = Action.async(BodyParsers.parse.json) { implicit request =>
    val pindex = (request.body \ PIndex).as[String]
    val userId = (request.body \ UserId).as[String]
    val location = (request.body \ Location).as[GeoLocation]
    pommesRepo.update(BSONDocument(Id -> BSONObjectID(id)),
      BSONDocument("$set" -> BSONDocument(PIndex -> pindex,UserId -> userId, Location -> location))).map(result => Accepted)
  }

  /**
  * deletes a pommes into the DB
  * @param the BSONObject Id
  */
  def delete(id: String) = Action.async {
    pommesRepo.remove(BSONDocument(Id -> BSONObjectID(id))).map(result => Accepted)
  }

  /**
   * The pommes form.  This is separate from the database pommes since the form doesn't have an ID.
   */
  case class PommesForm(pindex: String, userId: String, location: GeoLocation) {
    def toPommes: Pommes = Pommes(BSONObjectID.generate, pindex, userId, location)
  }
  implicit val pommesFormFormat = Json.format[PommesForm]

  /**
  * insert a pommes into the DB
  * here JSON object is inserted
  * see update for BSONDOCUMENT
  */
  def insert = Action.async(BodyParsers.parse.json) { implicit request =>
    Json.fromJson[PommesForm](request.body).fold(
      invalid => Future.successful(BadRequest("Bad message format")),
      form => pommesRepo.create(form.toPommes).map(result => Accepted))
  }

}

object PommesFields {
  val Id = "_id"
  val PIndex = "pindex"
  val UserId = "userId"
  val Location = "location"
}