# timeout-planner
## Plans and manage yours setTimeout

timeout-planner is a library for manage yours setTimeout. It brings an easy API to schedule new jobs, delete it, flush all ...

## Usage

Install it through npm:

`npm install timeout-planner`

### schedule(Function, delayInMilliseconds)

Schedule a task in the time an add it to the planner.

```javascript
const delayedFn = () => console.log('🐐')
planner.schedule(delayedFn, 1000)
```

Returns an object with the info related to the task to execute:
```
{
  pid: task pid
  fn: Function to execute,
  releaseTime: Date when the task will be executed
}
```

### exec(pid)

Inmmediatly execs the task by Id and cleans it from the planner

```javascript
planner.exec(44)
```

Returns a *boolean* with the result of the execution, if it is *false* means that the PID doesn't exists.

### has(Function)

Returns *true* or *false* depending if the parameter's functions is planned or not.

```javascript
const delayedFn = () => console.log('🐐')
planner.schedule(delayedFn, 1000)
planner.has(delayedFn) // => true
```

### flushAll()

Inmmediatly execs every scheduled and cleans all from the planner

```javascript
planner.flushAll()
```

### deleteAll()

Deletes all scheduled tasks

```javascript
planner.deleteAll()
```

### delete(pid)

Deletes a scheduled task by PID number.

```javascript
planner.delete(44)
```

Returns a *boolean* with the result of delete, if it is *false* means that the PID doesn't exists.

### deleteByFunction(Function)

Deletes a scheduled task by function

```javascript
const delayedFn = () => console.log('🐐')
planner.schedule(delayedFn, 1000)
planner.deleteByFunction(delayedFn)
```

Returns a *boolean* with the result of delete, if it is *false* means that the PID doesn't exists.

### size()

Returns current tasks scheduled number

```javascript
planner.size()
```

