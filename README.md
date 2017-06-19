## 可使用API
```
/year/:year/code/:code
/year/:year/professor/:name
/year/:year/title/:title
/year/:year/dept/:dept
/year/:year/dept/:dept/level/:level
/year/:year/week/:week
/year/:year/week/:week/time/:time
/year/:year/general/:general
/year/:year/general/:general/week/:week
/year/:year/general/:general/week/:week/time/:time
/year/:year/common/:common
/year/:year/common/:common/week/:week
/year/:year/common/:common/week/:week/time/:time
```

## API欄位
| Name | Value Type | Description | Example |
| --- | --- | --- | --- |
| year | string | 學年 | 1042, 1061 |
| code | string | 課程代碼 | 6008, 0301 |
| dept | string | 科系代碼（詳細見下表） | U56 |
| professor | string | 教授姓名 | 林仁昱 |
| title | string | 課程名稱（可只有部份關鍵字） | 兒童與青少年文學研究 |
| week | int | 取得該星期上課的課程 |3, 4 |
| time | int | 取得該節上課的課程 | 5 |

## 科系代碼
```
{
  "C10": "文學院",
  "C20": "管理學院",
  "C30": "農業暨自然資源學院",
  "U11": "中國文學系學士班",
  "U12": "外國語文學系學士班",
  "U13": "歷史學系學士班",
  "U21": "財務金融學系學士班",
  "U23": "企業管理學系學士班",
  "U24": "法律學系學士班",
  "U28": "會計學系學士班",
  "U29": "資訊管理學系學士班",
  "U30F": "景觀與遊憩學士學位學程",
  "U30G": "生物科技學士學位學程",
  "U30H": "國際農企業學士學位學程",
  "U31": "農藝學系學士班",
  "U32": "園藝學系學士班",
  "U33A": "森林學系林學組學士班",
  "U33B": "森林學系木材科學組學士班",
  "U34": "應用經濟學系學士班",
  "U35": "植物病理學系學士班",
  "U36": "昆蟲學系學士班",
  "U37": "動物科學系學士班",
  "U38A": "獸醫學系學士班",
  "U38B": "獸醫學系學士班",
  "U39": "土壤環境科學系學士班",
  "U40": "生物產業機電工程學系學士班",
  "U42": "水土保持學系學士班",
  "U43": "食品暨應用生物科技學系學士班",
  "U44": "行銷學系學士班",
  "U51": "化學系學士班",
  "U52": "生命科學系學士班",
  "U53B": "應用數學系學士班",
  "U53A": "應用數學系學士班",
  "U54A": "物理學系一般物理組學士班",
  "U54B": "物理學系光電物理組學士班",
  "U56": "資訊科學與工程學系學士班",
  "U61B": "機械工程學系學士班",
  "U61A": "機械工程學系學士班",
  "U62B": "土木工程學系學士班",
  "U62A": "土木工程學系學士班",
  "U63": "環境工程學系學士班",
  "U64B": "電機工程學系學士班",
  "U64A": "電機工程學系學士班",
  "U65": "化學工程學系學士班",
  "U66": "材料科學與工程學系學士班"
}
```

## 透過API取得之JSON欄位解釋
```
{
  "id": "開課學年+課程代號",
  "term": "開課學年",
  "code": "課程代號",
  "title_zhTW": "中文科目名稱",
  "title_enUS": "英文科目名稱",
  "for_dept": "上這門課的系所",
  "intern_location": "實習教室",
  "department": "開課單位",
  "class": "班級",
  "prerequisite": "先修課程",
  "professor": "授課教授",
  "time_1": "第一組上課時間",
  "time_2": "第二組上課時間",
  "discipline": "通識課程學群",
  "category": "課程類別",
  "url": "課程資訊網站代碼",
  "credits": "學分數",
  "obligatory": "是否必修",
  "number": "可修課人數",
  "note": "備註"
}
```