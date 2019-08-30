import {RECONCILIATION_RULES, e, View, ElementEventListenerBuilder} from '@flexio-oss/hotballoon'
import {EventRegister, NEXT_MONTH, PREVIOUS_MONTH, UPDATE_DATE_PICKED} from './EventRegister'
import {DayList} from '@flexio-oss/astrolabe/src/js/types/week/DayList'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import style from '../../../assets/style.css'
import {UpdatePickedDateBuilder} from '../../../../generated/io/flexio/astrolabe_calendar/actions/UpdatePickedDate'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ViewCalendar extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {CalendarStoreManager} calendarStoreManager
   * @param {CalendarActionManager} calendarActionManager
   * @param {ComponentAstrolabePublic} dateGenerator
   */
  constructor(container, calendarStoreManager, calendarActionManager, dateGenerator) {
    super(container)
    this.__stores = calendarStoreManager
    this.__actions = calendarActionManager
    this.__dateGenerator = dateGenerator
    this.__selectedMonth = DateExtended.fromFlexDate(this.__stores.publicStoreSelectedMonth().state().data.month())
    this.__flexDatePicked = this.__stores.publicStoreDatePicked().state().data.date()
    this.subscribeToStore(this.__stores.publicStoreDatePicked(), (e) => {
      this.__flexDatePicked = this.__stores.publicStoreDatePicked().state().data.date()
      return true
    })
    this.subscribeToStore(this.__stores.publicStoreSelectedMonth(), (e) => {
      this.__selectedMonth = DateExtended.fromFlexDate(this.__stores.publicStoreSelectedMonth().state().data.month())
      return true
    })
    this.__handleEvents()
  }

  /**
   * @Override
   * @return {EventRegister}
   */
  on() {
    return new EventRegister((a) => {
      return this._on(a)
    })
  }

  /**
   *
   * @private
   */
  __handleEvents() {
    this.on()
      .nextMonth((payload) => {
        this.__actions.actionNextMonth().dispatch(
          new globalFlexioImport.io.flexio.astrolabe_calendar.actions.NextMonthBuilder().build()
        )
      })
    this.on()
      .previousMonth((payload) => {
        this.__actions.actionPreviousMonth().dispatch(
          new globalFlexioImport.io.flexio.astrolabe_calendar.actions.PreviousMonthBuilder().build()
        )
      })
    this.on()
      .updateDatePicked((payload) => {
        this.__actions.actionUpdatePickedDate().dispatch(
          new UpdatePickedDateBuilder().date(payload.date).build()
        )
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
                      ElementEventListenerBuilder
                        .listen('click')
                        .callback((e) => {
                          this.dispatch(PREVIOUS_MONTH, null)
                        })
                        .build()
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
                      ElementEventListenerBuilder
                        .listen('click')
                        .callback((e) => {
                          this.dispatch(NEXT_MONTH, null)
                        })
                        .build()
                    )
                )
              )
          ),

          this.html(
            e('div#calendar-calendar')
              .className(style.calendarCalendar)
              .childNodes(
                this.html(
                  e('div#DayHeaders')
                    .className(style.DayHeaders)
                    .childNodes(...this.__dayHeaders())
                    .reconciliationRules(RECONCILIATION_RULES.BYPASS)
                ),
                this.html(
                  e('div#weekList')
                    .className(style.weekList)
                    .childNodes(...this.__weeks())
                    .reconciliationRules(RECONCILIATION_RULES.REPLACE)
                )
              )
          )
        )
    )
  }

  __dayHeaders() {
    let days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    let res = []
    days.forEach((day) => {
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
          e('div#' + id)
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
      res.push(
        this.html(
          e('label#' + id + '-' + currentDay.getDate())
            .text(currentDay.getDate().toString())
            .className(style.calendarDay)
            .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
            .bindClassName(style.calendarDayOutside, currentDay.getMonth() !== this.__selectedMonth.getMonth())
            .bindClassName(style.calendarDaySelected, this.__flexDatePicked.toJSON() === day.toJSON())
            .bindClassName(style.calendarDayNow, day.toJSON() === dayNow.toJSON())

            .listenEvent(
              ElementEventListenerBuilder
                .listen('click')
                .callback((e) => {
                  this.dispatch(UPDATE_DATE_PICKED, {date: day})
                })
                .build()
            )
        )
      )
    })
    return res
  }
}
