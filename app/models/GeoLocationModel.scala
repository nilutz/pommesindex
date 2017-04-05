package models

import play.api.libs.json.Json

/**
 * A GeoLocation class
 *
 * @param latitude
 * @param longitude
 * @param address
 * @param city
 * @param country
 *
 */
case class GeoLocation(latitude: Double, longitude: Double, address: Option[String], city: Option[String], county: Option[String])

object GeoLocation {
  /**
   * Format for the GeoLocation.
   *
   * Used both by JSON library and reactive mongo to serialise/deserialise a GeoLocation.
   */
  implicit val geoLocationFormat = Json.format[GeoLocation]
}