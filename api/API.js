const Mock = require("mockjs");
const M = Mock.Random;
module.exports = {
    //###################################
    //成长档案  【全部】
    //###################################
    //自我测评
    seltest: Mock.mock({
        "data|3": [
            {
                "id|+1": 1,
                "name|+1": ["高一2", "高二", "高三"],
                "selected|+1": [0, 0, 0],
                "sub|2": [
                    {
                        "id|+1": 1,
                        "name|1": ["上学期", "下学期", "2下学期"],
                        "selected|+1": [0, 1],
                        "sub|2": [
                            {
                                "id|+1": 1,
                                "name|+1": ["期中", "期末", "2期末"],
                                "selected|+1": [0, 1]
                            }
                        ]
                    }
                ]
            }
        ]
    }),
    //DEMO
    demo: Mock.mock({
        "data|6": [
            {
                "id|+1": 1,
                "name|1": "@cname",
                "date|1": "@date",
                "sex|1": ["男", "女"],
                email: "@email",
                "grade|1": ["高一", "高二", "高三"]
            }
        ]
    }),
    //新设置里的班级列表（表格）
    classList: Mock.mock({
        page_count: 30,
        "data|12": [
            {
                "id|+1": 1,
                "name|+1": [
                    "2017(1)班",
                    "2017(2)班",
                    "2017(3)班",
                    "2017(4)班",
                    "2017(5)班",
                    "2017(6)班",
                    "2017(7)班",
                    "2017(8)班",
                    "2017(9)班",
                    "2017(10)班"
                ],
                "date|1": "@date",
                "school|1": ["位于中学", "天山中学", "上海中学"],
                "fenxiao|1": ["主校", "分校"],
                "grade|1": ["高一", "高二", "高三"],
                "gradeId|1": [1, 2, 3],
                "bzrObj|1": [
                    { label: "胡军[语文]", value: 1 },
                    { label: "胡军[语文]", value: 2 },
                    { label: "胡军[语文]", value: 3 },
                    { label: "胡军[语文]", value: 4 },
                    { label: "胡军[语文]", value: 5 },
                    { label: "胡军[语文]", value: 6 },
                    { label: "胡军[语文]", value: 7 },
                    { label: "胡军[语文]", value: 8 }
                ]
            }
        ]
    }),
    //新设置，班级，筛选中的学校和分校
    schoolData: Mock.mock({
        data: [
            {
                "label|1": ["上海闵行三中", "上海中学", "威海一中", "天一中学"],
                "value|+1": 1,
                "children|2": [
                    {
                        "label|+1": ["主校", "分校"],
                        "value|+1": 1,
                        "children|10": [
                            {
                                "label|1": [
                                    "2017-高一",
                                    "2017-高二",
                                    "2017-高三",
                                    "2016-高一",
                                    "2016-高二",
                                    "2016-高三"
                                ],
                                "value|+1": 1
                            }
                        ]
                    }
                ]
            }
        ]
    }),
    //新设置，班级，筛选中的班主任列表
    teacherList: Mock.mock({
        "data|10": [
            {
                "label|1": [
                    "张山[语文]",
                    "胡巴[体育]",
                    "刘奇[物理]",
                    "赵六[语文]",
                    "王五[语文]",
                    "李四[数学]"
                ],
                "value|+1": 1
            }
        ]
    }),
    //添加新班级
    addClass: Mock.mock({
        "status|10000-20000": 12323
    }),
    editClass: {},
    delClass: {},
    validate: Mock.mock({
        data: {
            status: []
        }
    }),
    batchUp: { status: true },
    kcbatchUp: {},
    //新设置里的班级列表（表格）
    courseList: Mock.mock({
        page_count: 63,
        "data|10": [
            {
                "id|+1": 1,
                "ma|1": "@word",
                "name|+1": [
                    "语文",
                    "体育",
                    "物理",
                    "数学",
                    "外语",
                    "化学",
                    "生物",
                    "政治",
                    "历史",
                    "地理",
                    "劳技"
                ],
                "grade|1": [
                    "2017(1)班",
                    "2017(2)班",
                    "2017(3)班",
                    "2017(4)班",
                    "2017(5)班",
                    "2017(6)班",
                    "2017(7)班",
                    "2017(8)班",
                    "2017(9)班",
                    "2017(10)班"
                ],
                "type|1": ["选修", "必修"],
                "xuefen|1": ["2", "3", "5"],
                "gradeId|+1": 1,
                "schoolId|+1": 1,
                "fenxiaoId|+1": 1,
                "zongfen|1": ["100", "150"],
                "kaohe|1": ["考试", "其他"]
            }
        ]
    }),
    kechengList:Mock.mock({
        'data|10':""
    }),
    //课程套餐列表
    courseGroupData: Mock.mock({
        page_count: 20,
        "data|10": [
            {
                "id|+1": 1,
                "name|+1": ["语文+外语+物理", "历史+地理+劳技"],
                "gid|1": ["1,2,3", "4,5,6", "7,8,9"],
                "grade|1": [
                    "2017(1)班",
                    "2017(2)班",
                    "2017(3)班",
                    "2017(4)班",
                    "2017(5)班",
                    "2017(6)班",
                    "2017(7)班",
                    "2017(8)班",
                    "2017(9)班",
                    "2017(10)班"
                ]
            }
        ]
    }),
    DelCourseGroup: {},
    addCourse: Mock.mock({
        "status|1": [1232]
    }),
    DelCourse: Mock.mock({
        "status|1": [1232]
    }),
    addCourseGroup: Mock.mock({
        "status|1": [1232]
    }),
    classroomList: Mock.mock({
        page_count: 20,
        "data|10": [
            {
                "id|+1": 1,
                "name|+1": ["2014高一10教室", "2014高一10教室"],
                "zuowei|1": ["50", "60"],
                "type|1": ["行政班", "教学班"],
                "address|1": ["2014高一10教室", "2014高一10教室"],
                "gz|1": ["暂无"]
            }
        ]
    }),
    //添加教室
    addClassroom: Mock.mock({
        "status|10000-20000": 12323
    })
};
