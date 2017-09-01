const Sequelize = require('sequelize')
const config = require('./data/config')
const deptData = require('./data/deptData')
const express = require('express')
const Promise = require('bluebird')
const _ = require('lodash')
var app = express()

let sequelize = new Sequelize('courses', config.username, config.password, {
  host: config.host,
  dialect: config.database
})
let Courses = sequelize.define('courses', {
  term: Sequelize.STRING,
  code: Sequelize.STRING,
  title_zhTW: Sequelize.STRING,
  title_enUS: Sequelize.STRING,
  for_dept: Sequelize.STRING,
  location_1: Sequelize.STRING,
  location_2: Sequelize.STRING,
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
  queryFun({
    year: req.params.year,
    code: req.params.code
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/professor/:professor', (req, res) => {
  queryFun({
    year: req.params.year,
    professor: req.params.professor
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/professor/:professor/week/:week', (req, res) => {
  queryFun({
    year: req.params.year,
    professor: req.params.professor,
    week: req.params.week
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/professor/:professor/week/:week/time/:time', (req, res) => {
  queryFun({
    year: req.params.year,
    professor: req.params.professor,
    week: req.params.week,
    time: req.params.time
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/title/:title', (req, res) => {
  queryFun({
    year: req.params.year,
    title: req.params.title
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/title/:title/week/:week', (req, res) => {
  queryFun({
    year: req.params.year,
    title: req.params.title,
    week: req.params.week
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/title/:title/week/:week/time/:time', (req, res) => {
  queryFun({
    year: req.params.year,
    title: req.params.title,
    week: req.params.week,
    time: req.params.time
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/dept/:dept', (req, res) => {
  queryFun({
    year: req.params.year,
    dept: req.params.dept
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/dept/:dept/week/:week', (req, res) => {
  queryFun({
    year: req.params.year,
    dept: req.params.dept,
    week: req.params.week
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/dept/:dept/week/:week/time/:time', (req, res) => {
  queryFun({
    year: req.params.year,
    dept: req.params.dept,
    week: req.params.week,
    time: req.params.time
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/dept/:dept/level/:level', (req, res) => {
  queryFun({
    year: req.params.year,
    dept: req.params.dept,
    level: req.params.level
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/dept/:dept/level/:level/week/:week', (req, res) => {
  queryFun({
    year: req.params.year,
    dept: req.params.dept,
    level: req.params.level,
    week: req.params.week
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})
app.get('/year/:year/dept/:dept/level/:level/week/:week/time/:time', (req, res) => {
  queryFun({
    year: req.params.year,
    dept: req.params.dept,
    level: req.params.level,
    week: req.params.week,
    time: req.params.time
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/week/:week', (req, res) => {
  queryFun({
    year: req.params.year,
    week: req.params.week
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/week/:week/time/:time', (req, res) => {
  queryFun({
    year: req.params.year,
    week: req.params.week,
    time: req.params.time
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/general/:general', (req, res) => {
  queryFun({
    year: req.params.year,
    general: req.params.general
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/general/:general/week/:week', (req, res) => {
  queryFun({
    year: req.params.year,
    general: req.params.general,
    week: req.params.week
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/general/:general/week/:week/time/:time', (req, res) => {
  queryFun({
    year: req.params.year,
    general: req.params.general,
    week: req.params.week,
    time: req.params.time
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/common/:common', (req, res) => {
  queryFun({
    year: req.params.year,
    common: req.params.common
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/common/:common/week/:week', (req, res) => {
  queryFun({
    year: req.params.year,
    common: req.params.common,
    week: req.params.week
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.get('/year/:year/common/:common/week/:week/time/:time', (req, res) => {
  queryFun({
    year: req.params.year,
    common: req.params.common,
    week: req.params.week,
    time: req.params.time
  }).then((courses) => {
    res.end(courses)
  }).catch((error) => {
    res.end(JSON.stringify(errorMsg(error.message)))
  })
})

app.use((req, res) => {
  res.end(JSON.stringify(errorMsg('404 Not Found (´;ω;`)')))
})

function queryFun (queryData) {
  return Promise.try(() => {
    let queryObj = {}
    _.each(queryData, (val, key) => {
      switch (key) {
        case 'year':
          if (val.length !== 4 && _.isNaN(_.parseInt(val))) throw new Error('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')
          queryObj.term = val
          break
        case 'code':
          if (val.length !== 4 && !_.isNaN(_.parseInt(val))) throw new Error('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')
          queryObj.code = val
          break
        case 'professor':
          if (val >= 10) throw new Error('Illegal input format இдஇ')
          queryObj.professor = { $like: '%' + val + '%' }
          break
        case 'title':
          if (val.length < 2) throw new Error('Title keyword must have more than 2 characters ΩДΩ')
          queryObj['$or'] = [
            { 'title_zhTW': { $like: '%' + val + '%' } },
            { 'title_enUS': { $like: '%' + val + '%' } }
          ]
          break
        case 'dept':
          if (_.isUndefined(deptData[val])) throw new Error('Illegal input format இдஇ')
          queryObj.for_dept = deptData[val]
          break
        case 'level':
          console.log(val)
          if (val.length > 2) throw new Error('Illegal year format ｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡')
          queryObj.class = { $like: val + '%' }
          break
        case 'general':
          if (_.isUndefined(generalList[val])) throw new Error('Illegal input format இдஇ')
          queryObj.category = generalList[val]
          break
        case 'common':
          if (_.isUndefined(commonList[val])) throw new Error('Illegal input format இдஇ')
          queryObj.category = commonList[val]
          break
        case 'week':
          let week = _.parseInt(val)
          if (!_.inRange(week, 1, 6)) throw new Error('Illegal week format ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')
          if (!_.isUndefined(queryData.title)) {
            _.assign(queryObj['$or'], { 'time_1': { $like: week + '%' } }, { 'time_2': { $like: week + '%' } })
          }else {
            queryObj['$or'] = [
              { 'time_1': { $like: week + '%' } },
              { 'time_2': { $like: week + '%' } }
            ]
          }
          break
        case 'time':
          let time = _.parseInt(val)
          if (!_.inRange(time, 1, 14)) throw new Error('Illegal time format ｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡')

          let timeStr = val
          if (val.length === 1) {
            timeStr = '0' + val
          }
          queryObj.$or = [
            {
              $and: [
                { 'time_1': { $like: queryData.week + '%' } },
                { 'time_1': { $like: '%.' + timeStr + '%' } }
              ]
            },
            {
              $and: [
                { 'time_2': { $like: queryData.week + '%' } },
                { 'time_2': { $like: '%.' + timeStr + '%' } }
              ]
            }
          ]
          break
        default:
          throw new Error('Internal error ・゜・(PД`q｡)・゜・')
      }
    })

    return Courses
      .findAll({
        where: queryObj,
        raw: true
      })
      .then((courses) => {
        return JSON.stringify(_.uniqBy(courses, 'url'))
      })
  })
}

function yearFormatCheck (year) {
  if (year.length === 4 && !_.isNaN(_.parseInt(year))) {
    return true
  }else {
    return false
  }
}

let server = app.listen(config.servicePort, () => {
  console.log('listen ' + config.servicePort)
})
