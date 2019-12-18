import {ComponentCalendar} from './ComponentCalendar'
import {ComponentCalendarPublic} from './ComponentCalendarPublic'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {ViewMounter} from './ViewMounter/ViewMounter'

export class CalendarBuilder {
  constructor() {
    this.__application = null
    this.__parentNode = null
    this.__firstDay = null
  }

  /**
   *
   * @param {HotBalloonApplication} application
   * @return {CalendarBuilder}
   */
  application(application) {
    assertType(
      TypeCheck.isHotballoonApplication(application),
      'AstrolabeBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof application)
    this.__application = application
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return {CalendarBuilder}
   */
  parentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {DaysEnum} firstDay
   * @return {CalendarBuilder}
   */
  firstDay(firstDay) {
    this.__firstDay = firstDay
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @return {CalendarBuilder}
   */
  styles(styles) {
    this.__styles = styles
    return this
  }
  
  
  /**
   *
   * @return {ComponentCalendarPublic}
   */
  build() {
    return new ComponentCalendarPublic(
      new ComponentCalendar(
        this.__application.addComponentContext(),
        new ViewMounter(),
        this.__styles,
        this.__parentNode,
        this.__firstDay
      )
    )
  }
}
