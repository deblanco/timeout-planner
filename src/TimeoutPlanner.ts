type TimeoutRegister = {
  pid: number,
  fn: () => void,
  releaseTime: Date
}

export default class TimeoutPlanner {

  private timeouts: TimeoutRegister[] = []

  schedule (fn: () => void, delay: number): TimeoutRegister {
    const fnEnhanced = setTimeout(() => {
      fn()
      this.deleteByFunction(fn)
    }, delay)

    const executionPlanned = {
      pid: fnEnhanced,
      fn,
      releaseTime: new Date(Date.now() + delay)
    }

    this.timeouts.push(executionPlanned)
    return executionPlanned
  }

  exec (pid: number): boolean {
    const fnIndex = this.timeouts.findIndex(tr => tr.pid === pid)
    if (fnIndex >= 0) {
      const timeoutRegister = this.timeouts[fnIndex]
      timeoutRegister.fn()
      this.delete(timeoutRegister.pid)
      return true
    } else {
      return false
    }
  }

  has (fnc: () => void): boolean {
    return this.timeouts.some(tr => tr.fn === fnc)
  }

  flushAll (): void {
    this.timeouts.forEach(tr => {
      clearTimeout(tr.pid)
      tr.fn()
    })
    this.timeouts = []
  }

  deleteAll (): void {
    this.timeouts.forEach(tr => {
      clearTimeout(tr.pid)
    })
    this.timeouts = []
  }

  delete (pid: number): boolean {
    const fnIndex = this.timeouts.findIndex(tr => tr.pid === pid)
    if (fnIndex >= 0) {
      clearTimeout(this.timeouts[fnIndex].pid)
      this.timeouts.splice(fnIndex, 1)
      return true
    } else {
      return false
    }
  }

  deleteByFunction (fnc: Function): boolean {
    const fnIndex = this.timeouts.findIndex(tr => tr.fn === fnc)
    if (fnIndex >= 0) {
      clearTimeout(this.timeouts[fnIndex].pid)
      this.timeouts.splice(fnIndex, 1)
      return true
    } else {
      return false
    }
  }

  size (): number {
    return this.timeouts.length
  }

}
