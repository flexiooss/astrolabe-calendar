import {Dispatcher, HotBalloonApplication} from '@flexio-oss/hotballoon'
import {ConsoleLogger} from '@flexio-oss/js-logger'
import {ComponentCalendarBuilder} from './js/ComponentCalendarBuilder'

export const APP = new HotBalloonApplication('calendar', new Dispatcher(), new ConsoleLogger().debug())
const HTML_NODE = document.body
;(function (app) {
  ComponentCalendarBuilder
    .build(
      app
    ).mountView(HTML_NODE)
})(APP)
