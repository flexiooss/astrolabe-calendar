import {ComponentCalendar} from './ComponentCalendar'
import {ComponentCalendarPublic} from './ComponentCalendarPublic'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {ViewMounter} from './ViewMounter/ViewMounter'
import {ActionDateChangedPublic} from './ActionDateChangedPublic'
import {StateList} from '../state/StateList'
import {StateSelected} from '../state/StateSelected/StateSelected'
import {DaysEnum} from '@flexio-oss/astrolabe/src/js/types/DaysEnum'
import {StateFiller} from '../state/StateFiller/StateFiller'

export class ComponentCalendarBuilder {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__firstDay = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return {ComponentCalendarBuilder}
   */
  componentContext(componentContext) {
    assertType(
      TypeCheck.isComponentContext(componentContext),
      'CalendarBuilder:constructor: `componentContext` argument should be an instanceof ComponentContext, %s given',
      typeof componentContext)
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return {ComponentCalendarBuilder}
   */
  parentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {DaysEnum} firstDay
   * @return {ComponentCalendarBuilder}
   */
  firstDay(firstDay) {
    this.__firstDay = firstDay
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @return {ComponentCalendarBuilder}
   */
  styles(styles) {
    this.__styles = styles
    return this
  }

  /**
   *
   * @param {StateList} states
   * @return {ComponentCalendarBuilder}
   */
  states(states) {
    this.__states = states
    return this
  }

  /**
   *
   * @param {ActionDispatcher<PickedDate, PickedDateBuilder>} actionDateChangedPublic
   * @return {ComponentCalendarBuilder}
   */
  actionDateChanged(actionDateChangedPublic) {
    this.__actionDateChangedPublic = actionDateChangedPublic
    return this
  }
  
  /**
   *
   * @return {ComponentCalendarPublic}
   */
  build() {
    return new ComponentCalendarPublic(
      new ComponentCalendar(
        this.__componentContext,
        new ViewMounter(),
        this.__styles,
        this.__parentNode,
        this.__firstDay,
        this.__states,
        this.__actionDateChangedPublic
      )
    )
  }
}

export class CalendarBuilder {
  constructor(application, parentNode, styles) {
    assertType(
      TypeCheck.isHotballoonApplication(application),
      'CalendarBuilder:constructor: `componentContext` argument should be an instanceof ComponentContext, %s given',
      typeof application)
    this.__application = application
    this.__parentNode = parentNode
    this.__styles = styles
    this.__firstDay = null
  }

  /**
   * 
   * @returns {CalendarStateBuilder}
   */
  withMondayFirstDayOfWeek() {
    this.__firstDay = DaysEnum.MON
    return this.__build()
  }

  /**
   *
   * @returns {CalendarStateBuilder}
   */
  withSundayFirstDayOfWeek() {
    this.__firstDay = DaysEnum.SUN
    return this.__build()
  }

  /**
   * 
   * @param firstDay
   * @returns {CalendarStateBuilder}
   */
  withFirstDayOfWeek(firstDay) {
    this.__firstDay = firstDay
    return this.__build()
  }

  /**
   * 
   * @returns {CalendarStateBuilder}
   * @private
   */
  __build() {
    let componentContext = this.__application.addComponentContext()
    return new CalendarStateBuilder(
      this.__application,
      this.__parentNode,
      this.__styles,
      this.__firstDay,
      componentContext,
      ActionDateChangedPublic.create(componentContext.dispatcher()).action(),
      new StateList()
    )
  }
}

class CalendarStateBuilder {
  constructor(application, parentNode, styles, firstDay, componentContext, actionDateChanged, states) {
    this.__application = application
    this.__parentNode = parentNode
    this.__styles = styles
    this.__firstDay = firstDay
    this.__componentContext = componentContext
    this.__actionDateChanged = actionDateChanged
    this.__states = states
  }

  /**
   * 
   * @returns {CalendarStateBuilder}
   */
  withSelectionRadio() {
    let stateSelected = new StateSelected(this.__componentContext).withSelectionRadio(this.__actionDateChanged)
    this.__states.push(stateSelected)
    return this
  }

  /**
   * 
   * @returns {CalendarStateSelectionToggleBuilder}
   */
  withSelectionToggle() {
    return new CalendarStateSelectionToggleBuilder(this.__application, this.__parentNode, this.__styles, this.__firstDay, this.__componentContext, this.__actionDateChanged, this.__states)
  }
  
  withDatesMutedBefore(date) {
    return this
  }

  withDatesMutedAfter(date) {
    return this
  }

  withDatesMutedBetween(dateStart, dateEnd) {
    return this
  }

  build() {
    return new ComponentCalendarBuilder()
      .actionDateChanged(this.__actionDateChanged)
      .componentContext(this.__componentContext)
      .firstDay(this.__firstDay)
      .parentNode(this.__parentNode)
      .states(this.__states)
      .styles(this.__styles)
      .build()
  }
}

class CalendarStateSelectionToggleBuilder {
  constructor(application, parentNode, styles, firstDay, componentContext, actionDateChanged, states) {
    this.__application = application
    this.__parentNode = parentNode
    this.__styles = styles
    this.__firstDay = firstDay
    this.__componentContext = componentContext
    this.__actionDateChanged = actionDateChanged
    this.__states = states
  }

  /**
   *
   * @returns {CalendarStateBuilder}
   */
  withMultiplePeriods() {
    let stateSelected = new StateSelected(this.__componentContext).withSelectionToggle(this.__actionDateChanged)
    this.__states.push(stateSelected)
    this.__states.push(new StateFiller(this.__componentContext, stateSelected.store()).build())
    return new CalendarStateBuilder(this.__application, this.__parentNode, this.__styles, this.__firstDay, this.__componentContext, this.__actionDateChanged, this.__states)
  }

  /**
   *
   * @returns {CalendarStateBuilder}
   */
  withPeriod() {
    let stateSelected = new StateSelected(this.__componentContext).withSelectionToggle(this.__actionDateChanged, 2)
    this.__states.push(stateSelected)
    this.__states.push(new StateFiller(this.__componentContext, stateSelected.store()).build())
    return new CalendarStateBuilder(this.__application, this.__parentNode, this.__styles, this.__firstDay, this.__componentContext, this.__actionDateChanged, this.__states)
  }

  /**
   *
   * @returns {CalendarStateBuilder}
   */
  withoutLimit() {
    this.__states.push(new StateSelected(this.__componentContext).withSelectionToggle(this.__actionDateChanged))
    return new CalendarStateBuilder(this.__application, this.__parentNode, this.__styles, this.__firstDay, this.__componentContext, this.__actionDateChanged, this.__states)
  }

  /**
   * 
   * @param {int} limit
   * @returns {CalendarStateBuilder}
   */
  withLimit(limit) {
    this.__states.push(new StateSelected(this.__componentContext).withSelectionToggle(this.__actionDateChanged, limit))
    return new CalendarStateBuilder(this.__application, this.__parentNode, this.__styles, this.__firstDay, this.__componentContext, this.__actionDateChanged, this.__states)
  }
}
