// Your code here
let createEmployeeRecord = (info) =>{
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (employees) => {
    return employees.map((info) => {
        return createEmployeeRecord(info)
    })
}

let createTimeInEvent = (employee, stamp) => {
    let [date, hour] = stamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = (employee, stamp) => {
    let [date, hour] = stamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = (employee, date) => {
    let inEvent = employee.timeInEvents.find((e) => {
        return e.date === date
    })

    let outEvent = employee.timeOutEvents.find((e) => {
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, date){
    let rawWage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(array, firstName) {
  return array.find((employee) => {
    return employee.firstName === firstName
  })
}

let calculatePayroll = (array) => {
    return array.reduce((increase, employee) => {
        return increase + allWagesFor(employee)
    }, 0)
}