/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
// day1 下面还有对这个对象做操作
export const arrayMethods = Object.create(arrayProto)

// day1 所有能监听到变化的 api
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        /**
         * day1 slice 的第三个参数是要插入的元素，如果为 truly 则可以理解本次操作插入了新的元素
         * 可是如果插入的是 "" 0 false 呢？不会有 bug 么
         */
        debugger;
        inserted = args.slice(2)
        break
    }
    debugger;
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
