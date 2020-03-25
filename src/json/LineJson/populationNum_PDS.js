let populationNum_PDS ={
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
            "新华区":true,
            "汝州市":false,
            "湛河区":false,
        }
    },
    series: [
        {
            name: "新华区",
            type: "line",
            data: [0, 60, 0, 80, 1, 0, 1],
            color: "#6dcc37"
        },
        {
            name: "汝州市",
            type: "line",
            data: [0, 200, 0, 80, 90, 0, 0],
            color: "#cc2e19"
        },
        {
            name: "湛河区",
            type: "line",
            data: [260, 200, 0, 0, 70, 0, 0],
            color: "#51ccc7"
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

export default populationNum_PDS;