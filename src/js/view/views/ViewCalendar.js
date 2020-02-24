import {
  RECONCILIATION_RULES,
  e,
  View,
  ViewPublicEventHandler,
  UIEventBuilder
} from '@flexio-oss/hotballoon'
import {DayList} from '@flexio-oss/astrolabe/src/js/types/week/DayList'
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
        .childNodes(
          this.__navigation(),
          this.__calendar()
        )
    )
  }

  __navigation() {
    return this.html(
      e('div#navigator')
        .className(
          this.__styles.layout().row(),
          this.__styles.layout().rowAlignCenter()
        )
        .childNodes(
          this.__styles.icons().applyTo(this.html(
            e('span#previousMonth')
              .className(
                this.__styles.layout().columnJustifyLeft(),
                this.__styles.layout().mobileWidth().w1(),
                this.__styles.elements().clickable()
              )
              .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
              .listenEvent(
                UIEventBuilder.pointerEvent().up((e) => {
                  this.dispatch(PREVIOUS_MONTH, null)
                })
              )
            )
          ).chevronLeft().medium().primary(),
          this.html(
            e('label#actualMonth.calendarTitle')
              .className(
                this.__styles.layout().columnJustifyCenter(),
                this.__styles.layout().mobileWidth().w22()
              )
              .text(
                this.__selectedMonth.toLocaleDateString(window.navigator.language, {month: 'long'}) + ' ' + this.__selectedMonth.getFullYear())
          ),
          this.__styles.icons().applyTo(this.html(
            e('span#nextMonth')
              .className(
                this.__styles.layout().columnJustifyRight(),
                this.__styles.layout().mobileWidth().w1(),
                this.__styles.elements().clickable()
              )
              .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
              .listenEvent(
                UIEventBuilder.pointerEvent().up((e) => {
                  this.dispatch(NEXT_MONTH, null)
                })
              )
            )
          ).chevronRight().medium().primary()
        )
    )
  }

  __calendar() {
    return this.html(
      e('div#calendar-calendar')
        .className(
          this.__styles.layout().column(),
          this.__styles.layout().columnJustifyCenter()
        )
        .childNodes(
          this.html(
            e('div#DayHeaders')
              .className(this.__styles.layout().row())
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
            .className(
              this.__styles.layout().mobileWidth().w3(),
              this.__styles.layout().columnJustifyCenter()
            )
            .styles({lineHeight: '12vw'})
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
            .className(this.__styles.layout().row())
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
          e(`div#container-${id}-${currentDay.getDate()}`)
            .className(
              this.__styles.layout().columnJustifyCenter(),
              this.__styles.layout().mobileWidth().w3(),
              this.__styles.elements().clickable()
            )
            .styles({lineHeight: '12vw'})
            .bindClassName(day.toJSON() === dayNow.toJSON(), this.__styles.color().primaryBg())
            .bindClassName(day.toJSON() === dayNow.toJSON(), this.__styles.color().white())
            .bindClassName(currentDay.getMonth() !== this.__selectedMonth.getMonth(), this.__styles.color().muted())
            .bindClassName(dayState.length !== 0, this.__styles.color().focusBg())
            .listenEvent(UIEventBuilder.pointerEvent().up((e) => {
              this.dispatch(UPDATE_DATE_PICKED, {date: day})
            }))
            .childNodes(
              this.html(
                e(`label#${id}-${currentDay.getDate()}`)
                  .text(currentDay.getDate().toString())
                  .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
                  .className(
                    this.__styles.fontSize().h5(),
                    this.__styles.fontStyle().bold()
                  )
              )
            )
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
