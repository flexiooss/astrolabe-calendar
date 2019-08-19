import {ComponentCalendar} from './component/ComponentCalendar'
import {ComponentCalendarPublic} from './component/ComponentCalendarPublic'

export class ComponentCalendarBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @return {ComponentCalendarPublic}
   */
  static build(APP) {
    return new ComponentCalendarPublic(
      new ComponentCalendar(
        APP.addComponentContext()
      )
    )
  }
}
