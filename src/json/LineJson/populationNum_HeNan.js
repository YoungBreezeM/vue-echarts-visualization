let populationNum_HeNan ={
    title:"统计我校师生每天各省人数情况",
    defaultSelected:[0],
    selectedOption:[
        {
            label: "学生",
            value: 0
        },
        {
            label: "教师",
            value: 1
        }
    ],
    legend:{
        selected:{
            "平顶山":true,
            "洛阳市":false,
            "郑州市":false,
        }
    },
    series: [
        {
            name: "平顶山市",
            type: "line",
            data: [10, 0, 0, 10, 12, 0, 1],
            color: "#6dcc37"
        },
        {
            name: "洛阳市",
            type: "line",
            data: [0, 20, 0, 50, 120, 0, 0],
            color: "#cc2e19"
        },
        {
            name: "郑州市",
            type: "line",
            data: [0, 100, 15, 0, 20, 0, 0],
            color: "#cc2e19"
        }
    ],
    xAxis:{
        name:"日期",
        data:["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7"]
    },
    yAxis:{
        name:"人数"
    }
};

export default populationNum_HeNan;