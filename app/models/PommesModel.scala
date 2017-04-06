package models

import play.api.libs.json.Json
import reactivemongo.bson.BSONObjectID
import play.modules.reactivemongo.json.BSONFormats._
import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat
import play.extras.geojson._

/**
 * A pommes class
 *
 * @param _id The BSON object id of the pommesindex
 * @param pindex of the pommes
 * @param userId Id of the User
 * @param location of the pommesindex as geojson point
 *
 */
case class Pommes(_id: BSONObjectID, pindex: String, userId: String, location: Point[LatLng])

object Pommes {
  /**
   * Format for the pommes.
   *
   * Used both by JSON library and reactive mongo to serialise/deserialise a pommes.
   */
  implicit val pommesFormat = Json.format[Pommes]
}