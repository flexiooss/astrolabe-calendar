import {
  RECONCILIATION_RULES,
  e,
  View,
  ViewPublicEventHandler,
  UIEventBuilder
} from '@flexio-oss/hotballoon'
import {DayList} from '@flexio-oss/astrolabe/src/js/types/week/DayList'
import style from '../../../assets/style.css'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {isNull} from '@flexio-oss/assert'

export class ViewCalendar extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {StoreContainerCalendar} calendarStoreManager
   * @param {ComponentAstrolabePublic} dateGenerator
   * @param {DaysEnum} firstDay
   * @param {ThemeStyle} styles
   * @param {StateList} states
   */
  constructor(container, calendarStoreManager, dateGenerator, firstDay, styles, states) {
    super(container)
    this.__stores = calendarStoreManager
    this.__dateGenerator = dateGenerator
    this.__firstDay = firstDay
    this.__styles = styles
    this.__states = states

    this.__selectedMonth = DateExtended.fromFlexDate(this.__stores.publicStoreSelectedMonth().data().month())

    this.__states.forEach((/**State*/state) => {
      this.subscribeToStore(state.store())
    })

    this.subscribeToStore(this.__stores.publicStoreSelectedMonth(), (e) => {
      this.__selectedMonth = DateExtended.fromFlexDate(this.__stores.publicStoreSelectedMonth().data().month())
      return true
    })
  }

  /**
   * @Override
   * @return {EventRegisterCalendar}
   */
  on() {
    return new EventRegisterCalendar((a) => {
      return this._on(a)
    })
  }


  template() {
    return this.html(
      e('div#calendar-main')
        .className(style.calendar)
        .childNodes(
          this.html(
            e('div#navigator')
              .className(style.calendarHeader)
              .childNodes(
                this.html(
                  e('button#previousMonth')
                    .text('<')
                    .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
                    .listenEvent(
                      UIEventBuilder.mouseEvent().click((e) => {
                        this.dispatch(PREVIOUS_MONTH, null)
                      })
                    )
                ),
                this.html(
                  e('label#actualMonth.calendarTitle')
                    .text(
                      this.__selectedMonth.toLocaleDateString(window.navigator.language, {month: 'long'}) + ' ' + this.__selectedMonth.getFullYear())
                ),
                this.html(
                  e('button#nextMonth')
                    .text('>')
                    .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
                    .listenEvent(
                      UIEventBuilder.mouseEvent().click((e) => {
                        this.dispatch(NEXT_MONTH, null)
                      })
                    )
                )
              )
          ),

          this.html(
            e('div#calendar-calendar')
              .childNodes(
                this.html(
                  e('div#DayHeaders')
                    .className(style.DayHeaders)
                    .childNodes(...this.__dayHeaders())
                    .reconciliationRules(RECONCILIATION_RULES.BYPASS)
                ),
                this.html(
                  e('div#weekList')
                    .childNodes(...this.__weeks())
                    .reconciliationRules(RECONCILIATION_RULES.REPLACE)
                )
              )
          )
        )
    )
  }

  __dayHeaders() {
    let days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    let res = []
    let daysWithFirstDay = days.splice(this.__firstDay)
    daysWithFirstDay.push(...days)
    daysWithFirstDay.forEach((day) => {
      res.push(
        this.html(
          e('label#' + day + '.labelDaysHeader')
            .text(day.substr(0, 1))
        )
      )
    })
    return res
  }

  __weeks() {
    let res = []
    let actualMonth = this.__dateGenerator.getMonth(this.__selectedMonth.getFullYear(), this.__selectedMonth.getMonth())
    let previousMonth = this.__dateGenerator.getMonth(this.__selectedMonth.getFullYear(), this.__selectedMonth.getMonth() - 1)
    let nextMonth = this.__dateGenerator.getMonth(this.__selectedMonth.getFullYear(), this.__selectedMonth.getMonth() + 1)
    let currentMonth = previousMonth
    let currentWeekId = currentMonth.weeks().size - 1
    let currentWeek = currentMonth.weeks().get(currentWeekId).days()

    for (let i = 0; i < 6; i++) {
      let id = '' + currentMonth.month() + '-' + currentWeekId
      if (i === 0) {
        currentWeekId = 0
        currentMonth = actualMonth
        if (currentWeek.size !== 7) {
          currentWeek = new DayList([...currentWeek, ...currentMonth.weeks().get(currentWeekId).days()])
          currentWeekId++
        }
      } else {
        if (currentWeekId > currentMonth.weeks().size - 1) {
          currentWeekId = 0
          currentMonth = nextMonth
        }
        currentWeek = currentMonth.weeks().get(currentWeekId).days()
        if (currentWeek.size !== 7) {
          currentWeekId = 0
          currentMonth = nextMonth
          currentWeek = new DayList([...currentWeek, ...currentMonth.weeks().get(currentWeekId).days()])
        }
        currentWeekId++
      }
      res.push(
        this.html(
          e(`div#${id}`)
            .className(style.calendarWeek)
            .childNodes(...this.__days(currentWeek, id))
        )
      )
      currentWeek = null
    }
    return res
  }

  __days(currentWeek, id) {
    let dayNow = new DateExtended().toLocaleFlexDate()
    let res = []
    currentWeek.forEach((day) => {
      let currentDay = DateExtended.fromFlexDate(day)

      /**
       * 
       * @type {FlexArray<?State>}
       */
      let dayState = this.__states.filter(
        (/**State*/state) => {
          let BreakException = {}
          if (isNull(state.store().data().dates())) {
            return false
          }
          try {
            state.store().data().dates().forEach((date) => {
              if (date.toJSON() === day.toJSON()) throw BreakException
            })
          } catch (e) {
            return true
          }
          return false
        }
      )
      res.push(
        this.html(
          e(`label#${id}-${currentDay.getDate()}`)
            .text(currentDay.getDate().toString())
            .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
            .className(style.calendarDay)
            .bindClassName(currentDay.getMonth() !== this.__selectedMonth.getMonth(), style.calendarDayOutside)
            .bindClassName(dayState.length !== 0, style.calendarDaySelected)
            .bindClassName(day.toJSON() === dayNow.toJSON(), style.calendarDayNow)
            .listenEvent(UIEventBuilder.mouseEvent().click((e) => {
              this.dispatch(UPDATE_DATE_PICKED, {date: day})
            }))
        )
      )
    })
    return res
  }
}

export const NEXT_MONTH = 'NEXT_MONTH'
export const PREVIOUS_MONTH = 'PREVIOUS_MONTH'
export const UPDATE_DATE_PICKED = 'UPDATE_DATE_PICKED'

export class EventRegisterCalendar extends ViewPublicEventHandler {
  /**
   *
   * @param {function} clb
   * @return {String}
   */
  nextMonth(clb) {
    return this._subscribeTo(NEXT_MONTH, clb)
  }

  /**
   *
   * @param {function} clb
   * @return {String}
   */
  previousMonth(clb) {
    return this._subscribeTo(PREVIOUS_MONTH, clb)
  }

  /**
   *
   * @param {function} clb
   * @return {String}
   */
  updateDatePicked(clb) {
    return this._subscribeTo(UPDATE_DATE_PICKED, clb)
  }
}
