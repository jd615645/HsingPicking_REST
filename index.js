const Sequelize = require('sequelize')
const config = require('./data/config')
const deptData = require('./data/deptData')
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const http = require('http')
var app = express()

let sequelize = new Sequelize('test', config.username, config.password, {
  host: config.host,
  dialect: config.database
})
let Courses = sequelize.define('courses', {
  term: Sequelize.STRING,
  code: Sequelize.STRING,
  title_zhTW: Sequelize.STRING,
  title_enUS: Sequelize.STRING,
  for_dept: Sequelize.STRING,
  intern_location: Sequelize.STRING,
  department: Sequelize.STRING,
  class: Sequelize.STRING,
  prerequisite: Sequelize.STRING,
  professor: Sequelize.STRING,
  time_1: Sequelize.STRING,
  time_2: Sequelize.STRING,
  discipline: Sequelize.STRING,
  category: Sequelize.STRING,
  url: Sequelize.STRING,
  credits: Sequelize.INTEGER,
  obligatory: Sequelize.INTEGER,
  number: Sequelize.INTEGER,
  note: Sequelize.STRING
}, {
  timestamps: false
})

let generalList = {
  'H': '人文學群',
  'S': '社會學群',
  'N': '自然學群'
}
let commonList = {
  'CC': '大學國文',
  'CE': '大一英文',
  'PE': '體育',
  'EP': '教育學程',
  'DE': '國防教育',
  'OL': '全校英外語'
}

function errorMsg (msg) {
  return {
    'message': msg
  }
}

app.get('/year/:year/code/:code', (req, res) => {
  try {
    res.end(queryFun({
      year: req.params.year,
      code: req.params.code
    }))
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

// app.get('/year/:year/code/:code', (req, res) => {
//   try {
//     let year = req.params.year
//     let code = req.params.code

//     if (yearFormatCheck(year)) {
//     }else {
//       res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
//     }
//     if (code.length === 4 && !_.isNaN(_.parseInt(code))) {
//       let test = {
//         term: year,
//         code: code
//       }
//       Courses
//         .findAll({
//           where: test
//         })
//         .then((courses) => {
//           let courseInfo = []
//           for (let course of courses) {
//             courseInfo.push(course)
//           }
//           courseInfo = _.uniqBy(courseInfo, 'url')

//           res.end(JSON.stringify(courseInfo))
//         })
//     }else {
//       res.end(JSON.stringify(errorMsg('Illegal input format இдஇ')))
//     }
//   } catch (error) {
//     res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
//   }
// })

app.get('/year/:year/professor/:name', (req, res) => {
  try {
    let year = req.params.year
    let professor = req.params.name

    if (yearFormatCheck(year)) {
      if (professor.length <= 10) {
        Courses
          .findAll({
            where: {
              term: year,
              professor: {
                $like: '%' + professor + '%'
              }
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format இдஇ')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/title/:title', (req, res) => {
  try {
    let year = req.params.year
    let title = req.params.title

    if (yearFormatCheck(year)) {
      if (title.length >= 2) {
        Courses
          .findAll({
            where: {
              term: year,
              $or: [
                {
                  title_zhTW: {
                    $like: '%' + title + '%'
                  }
                },
                {
                  title_enUS: {
                    $like: '%' + title + '%'
                  }
                }
              ]
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Title keyword must have more than 2 characters')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/dept/:dept', (req, res) => {
  try {
    let year = req.params.year
    let dept = deptData[req.params.dept]

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(dept)) {
        Courses
          .findAll({
            where: {
              term: year,
              for_dept: dept
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format இдஇ')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/dept/:dept/level/:level', (req, res) => {
  try {
    let year = req.params.year
    let dept = deptData[req.params.dept]
    let level = req.params.level

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(dept) && level.length <= 2) {
        Courses
          .findAll({
            where: {
              term: year,
              for_dept: dept,
              class: {
                $like: level + '%'
              }
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format இдஇ')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/week/:week', (req, res) => {
  try {
    let year = req.params.year
    let week = _.parseInt(req.params.week)

    if (yearFormatCheck(year)) {
      if (!_.isNaN(week) && _.inRange(week, 1, 6)) {
        Courses
          .findAll({
            where: {
              term: year,
              $or: [
                {
                  'time_1': {
                    $like: week + '%'
                  }
                },
                {
                  'time_2': {
                    $like: week + '%'
                  }
                }
              ]
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/week/:week/time/:time', (req, res) => {
  try {
    let year = req.params.year
    let week = _.parseInt(req.params.week)
    let time = _.parseInt(req.params.time)

    if (yearFormatCheck(year)) {
      if (!_.isNaN(week) && _.inRange(week, 1, 6) && !_.isNaN(time) && _.inRange(time, 1, 14)) {
        let timeStr = String(time)
        if (timeStr.length === 1) {
          timeStr = '0' + timeStr
        }
        Courses
          .findAll({
            where: {
              term: year,
              $or: [
                {
                  $and: [
                    {
                      'time_1': { $like: week + '%' }
                    },
                    {
                      'time_1': { $like: '%.' + timeStr + '%' }
                    }
                  ]
                },
                {
                  $and: [
                    {
                      'time_2': { $like: week + '%' }
                    },
                    {
                      'time_2': { $like: '%.' + timeStr + '%' }
                    }
                  ]
                }
              ]
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/general/:general', (req, res) => {
  try {
    let year = req.params.year
    let general = generalList[req.params.general]

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(general)) {
        Courses
          .findAll({
            where: {
              term: year,
              category: general
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/general/:general/week/:week', (req, res) => {
  try {
    let year = req.params.year
    let general = generalList[req.params.general]
    let week = _.parseInt(req.params.week)

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(general) && _.inRange(week, 1, 6)) {
        Courses
          .findAll({
            where: {
              term: year,
              category: general,
              $or: [
                {
                  'time_1': {
                    $like: week + '%'
                  }
                },
                {
                  'time_2': {
                    $like: week + '%'
                  }
                }
              ]
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/general/:general/week/:week/time/:time', (req, res) => {
  try {
    let year = req.params.year
    let general = generalList[req.params.general]
    let week = _.parseInt(req.params.week)
    let time = _.parseInt(req.params.time)

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(general) && _.inRange(week, 1, 6) && !_.isNaN(time) && _.inRange(time, 1, 14)) {
        let timeStr = String(time)
        if (timeStr.length === 1) {
          timeStr = '0' + timeStr
        }
        Courses
          .findAll({
            where: {
              term: year,
              category: general,
              $or: [
                {
                  $and: [
                    {
                      'time_1': { $like: week + '%' }
                    },
                    {
                      'time_1': { $like: '%.' + timeStr + '%' }
                    }
                  ]
                },
                {
                  $and: [
                    {
                      'time_2': { $like: week + '%' }
                    },
                    {
                      'time_2': { $like: '%.' + timeStr + '%' }
                    }
                  ]
                }
              ]
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/common/:common', (req, res) => {
  try {
    let year = req.params.year
    let common = commonList[req.params.common]

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(common)) {
        Courses
          .findAll({
            where: {
              term: year,
              category: common
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/common/:common/week/:week', (req, res) => {
  try {
    let year = req.params.year
    let common = commonList[req.params.common]
    let week = _.parseInt(req.params.week)

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(common) && _.inRange(week, 1, 6)) {
        Courses
          .findAll({
            where: {
              term: year,
              category: common,
              $or: [
                {
                  'time_1': {
                    $like: week + '%'
                  }
                },
                {
                  'time_2': {
                    $like: week + '%'
                  }
                }
              ]
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.get('/year/:year/common/:common/week/:week/time/:time', (req, res) => {
  try {
    let year = req.params.year
    let common = commonList[req.params.common]
    let week = _.parseInt(req.params.week)
    let time = _.parseInt(req.params.time)

    if (yearFormatCheck(year)) {
      if (!_.isUndefined(common) && _.inRange(week, 1, 6) && !_.isNaN(time) && _.inRange(time, 1, 14)) {
        let timeStr = String(time)
        if (timeStr.length === 1) {
          timeStr = '0' + timeStr
        }
        Courses
          .findAll({
            where: {
              term: year,
              category: common,
              $or: [
                {
                  $and: [
                    { 'time_1': { $like: week + '%' } },
                    { 'time_1': { $like: '%.' + timeStr + '%' } }
                  ]
                },
                {
                  $and: [
                    { 'time_2': { $like: week + '%' } },
                    { 'time_2': { $like: '%.' + timeStr + '%' } }
                  ]
                }
              ]
            }
          })
          .then((courses) => {
            let courseInfo = []
            for (let course of courses) {
              courseInfo.push(course)
            }
            courseInfo = _.uniqBy(courseInfo, 'url')

            res.end(JSON.stringify(courseInfo))
          })
      }else {
        res.end(JSON.stringify(errorMsg('Illegal input format or range ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')))
      }
    }else {
      res.end(JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')))
    }
  } catch (error) {
    res.end(JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・')))
  }
})

app.use((req, res) => {
  res.end(JSON.stringify(errorMsg('404 Not Found (´;ω;`)')))
})

function queryFun (queryData) {
  try {
    let year = queryData.year
    let code = queryData.code
    let name = queryData.name
    let title = queryData.title
    let dept = queryData.dept
    let level = queryData.level
    let general = queryData.general
    let common = queryData.common
    let week = queryData.week
    let time = queryData.time

    let queryObj = {}

    if (year.length !== 4 && _.isNaN(_.parseInt(year))) {
      return JSON.stringify(errorMsg('404 Not Found (´;ω;`)'))
    }else {
      _.mergeWith(queryObj, { 'term': year })
    }
    if (!_.isUndefined(code)) {
      if (code.length !== 4 && !_.isNaN(_.parseInt(code))) {
        return JSON.stringify(errorMsg('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡'))
      }else {
        _.mergeWith(queryObj, { 'code': code })
      }
    }
    if (!_.isUndefined(name)) {
      if (name >= 10) {
        return JSON.stringify(errorMsg('Illegal input format இдஇ'))
      }else {
        _.mergeWith(queryObj, {
          professor: { $like: '%' + name + '%' }
        })
      }
    }
    if (!_.isUndefined(title)) {
      if (title.length >= 2) {
        return JSON.stringify(errorMsg('Title keyword must have more than 2 characters ΩДΩ'))
      }else {
        _.mergeWith(queryObj, {
          $or: [
            {
              'title_zhTW': { $like: '%' + title + '%' }
            },
            {
              'title_enUS': { $like: '%' + title + '%' }
            }
          ]
        })
      }
    }
    if (!_.isUndefined(dept)) {
      dept = deptData[dept]
      if (!_.isUndefined(dept)) {
        return JSON.stringify(errorMsg('Illegal input format இдஇ'))
      }else {
        _.mergeWith(queryObj, { 'for_dept': dept })
      }
    }
    if (!_.isUndefined(level)) {
      if (level.length <= 2) {
        return JSON.stringify(errorMsg('Illegal input format இдஇ'))
      }else {
        _.mergeWith(queryObj, {
          class: { $like: level + '%' }
        })
      }
    }
    if (!_.isUndefined(general)) {
      general = generalList[general]
      if (_.isUndefined(general)) {
        return JSON.stringify(errorMsg('Illegal input format இдஇ'))
      }else {
        _.mergeWith(queryObj, { 'category': general })
      }
    }
    if (!_.isUndefined(common)) {
      common = commonList[common]
      if (_.isUndefined(common)) {
        return JSON.stringify(errorMsg('Illegal input format இдஇ'))
      }else {
        _.mergeWith(queryObj, { 'category': common })
      }
    }
    if (!_.isUndefined(week)) {
      week = _.parseInt(req.params.week)
      if (_.inRange(week, 1, 6)) {
        return JSON.stringify(errorMsg('Illegal week format ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡'))
      }else {
        if (!_.isUndefined(time)) {
          time = _.parseInt(req.params.time)
          if (_.inRange(time, 1, 14)) {
            return JSON.stringify(errorMsg('Illegal time format ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡'))
          }else {
            _.mergeWith(queryObj, {
              $or: [
                {
                  $and: [
                    { 'time_1': { $like: week + '%' } },
                    { 'time_1': { $like: '%.' + timeStr + '%' } }
                  ]
                },
                {
                  $and: [
                    { 'time_2': { $like: week + '%' } },
                    { 'time_2': { $like: '%.' + timeStr + '%' } }
                  ]
                }
              ]
            })
          }
        }else {
          _.mergeWith(queryObj, {
            $or: [
              { 'time_1': { $like: week + '%' } },
              { 'time_2': { $like: week + '%' } }
            ]
          })
        }
      }
    }

    Courses
      .findAll({
        where: queryObj
      })
      .then((courses) => {
        let courseInfo = []
        for (let course of courses) {
          courseInfo.push(course)
        }
        courseInfo = _.uniqBy(courseInfo, 'url')

        return JSON.stringify(courseInfo)
      })

  } catch (error) {
    return JSON.stringify(errorMsg('Internal error ・゜・(PД`q｡)・゜・'))
  }
}

function yearFormatCheck (year) {
  if (year.length === 4 && !_.isNaN(_.parseInt(year))) {
    return true
  }else {
    return false
  }
}

let server = app.listen(3000)
