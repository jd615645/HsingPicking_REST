const _ = require('lodash')
const json2csv = require('json2csv')
const fs = require('fs')
const generalCourseData = require('./data/generalCourseData')

const careerN_1042 = require('./data/1042/career_N').course
const careerU_1042 = require('./data/1042/career_U').course
const careerO_1042 = require('./data/1042/career_O').course

const careerN_1051 = require('./data/1052/career_N').course
const careerU_1051 = require('./data/1052/career_U').course
const careerO_1051 = require('./data/1052/career_O').course

const careerN_1052 = require('./data/1052/career_N').course
const careerU_1052 = require('./data/1052/career_U').course
const careerO_1052 = require('./data/1052/career_O').course

const careerN_1061 = require('./data/1061/career_N').course
const careerU_1061 = require('./data/1061/career_U').course
const careerO_1061 = require('./data/1061/career_O').course

let courseCode = {}

let codeData = []

let courseCollection = {
  '1042': [careerN_1042, careerU_1042, careerO_1042],
  '1051': [careerN_1051, careerU_1051, careerO_1051],
  '1052': [careerN_1052, careerU_1052, careerO_1052],
  '1061': [careerN_1061, careerU_1061, careerO_1061]
}

_.forEach(courseCollection, (iv, year) => {
  _.forEach(courseCollection[year], (courseList, jk) => {
    _.forEach(courseList, (course, lk) => {
      _.setWith(courseCode, [year, course.code], _.assign(course, {'term': year}), Object)
      let time = ''
      _.forEach(course.time_parsed, (iv, ik) => {
        if (ik >= 1) {
          time += ','
        }
        time += iv.day
        _.forEach(iv.time, (jv, jk) => {
          let day = String(jv)
          if (day.length === 1) {
            day = '0' + day
          }
          time += '.' + day
        })
      })
      time = time.split(',')

      let code = course.code
      let insertData = {
        'id': year + code,
        'term': year,
        'intern_location': course.intern_location[0],
        'title_zhTW': course.title_parsed.zh_TW,
        'title_enUS': course.title_parsed.en_US,
        'location_1': course.location[0],
        'location_2': _.isUndefined(course.location[1]) ? '' : course.location[1],
        'time_1': time[0],
        'time_2': _.isUndefined(time[1]) ? '' : time[1],
        'obligatory': course.obligatory_tf === 'true' ? 1 : 0,
        'category': courseType(course)
      }

      codeData.push(_.assign(course, insertData))
    })
  })
})

let fields = ['id', 'term', 'code', 'title_zhTW', 'title_enUS', 'for_dept', 'intern_location', 'department', 'class', 'prerequisite', 'professor', 'time_1', 'time_2', 'discipline', 'category', 'url', 'credits', 'obligatory', 'number', 'note']

var csv = json2csv({ data: codeData, fields: fields })

fs.writeFile('file.csv', csv, (err) => {
  if (err) throw err
  console.log('file saved')
})

function courseType (course) {
  let sol = ''

  if (course.discipline != '') {
    sol = generalCourseData[course.discipline]
  }
  else if (course.department == '通識教育中心' || course.department == '夜中文') {
    sol = '大學國文'
  }
  else if (course.obligatory == '必修' &&
    (course.department == '語言中心' || course.department == '夜外文' || (course.department == '夜共同科' && ((course['title_parsed']['zh_TW']).substr(0, 1) == '英文')))) {
    sol = '大一英文'
  }
  else if (course.department == '體育室' || course.department == '夜共同科') {
    sol = '體育'
  }
  else if (course.department == '師資培育中心') {
    sol = '教育學程'
  }
  else if (course.department == '教官室') {
    sol = '國防教育'
  }
  else if (course.department == '語言中心') {
    sol = '全校英外語'
  }else {
    let title = course.title_parsed.zh_TW
    _.forEach(['高爾夫', '羽球', '彼拉提斯', '運動與體重控制', '運動塑身', '籃球', '重量訓練', '桌球', '現代舞'], (val) => {
      if (title.search(val) > -1) {
        sol = '體育'
      }
    })
  }
  return sol
}
