const temperatureGauge = {
    id: 1,
    title: 'Temperature (deg. C)',
    units: 'degrees C',
    range: [0, 200],
    segments: 20,
    sub_ranges: [
        { range: '0~50', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Cold' },
        { range: '50~100', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Mild' },
        { range: '100~150', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Hot' },
        { range: '150~200', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Very hot' }
    ]
}

const volumeGauge = {
    id: 2,
    title: 'Volume (litres)',
    units: 'litres',
    range: [0, 300],
    segments: 50,
    sub_ranges: [
        { range: '0~50', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Low fluid' },
        { range: '50~100', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Medium fluid' },
        { range: '100~150', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'High fluid' },
        { range: '150~200', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Very high fluid' },
        { range: '200~300', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'Excessive' }
    ]
}

const pressureGauge = {
    id: 3,
    title: 'Pressure (Pascal)',
    units: 'litres',
    range: [0, 300],
    segments: 150,
    sub_ranges: [
        { range: '0~150', color: '#bacbb', label: 'Low' },
        { range: '150~300', color: '#'+Math.floor(Math.random()*16777215).toString(16),label: 'High' }
    ]
}

const machine1 = {
    id: 1,
    title: 'Machine 1',
    diagram: 'dist/images/diagram1.png',
    width: 700,
    height: 400,
    grid: [100, 100]
}

const machine2 = {
    id: 2,
    title: 'Machine 2',
    diagram:
        'https://cdndata.co/cdn/3ebbc4ad095d2e7f70b4d8b54a523d62194ea4d0/diagram2.PNG',
    width: 700,
    height: 400,
    grid: [100, 100]
}

const machine3 = {
    id: 3,
    title: 'Machine 3',
    diagram: 'dist/images/diagram3.png',
    width: 700,
    height: 400,
    grid: [100, 100]
}

const sensor = [
    {
        id: 1,
        data: [
            {
                id: 1,
                label: 'LCR Sensor',
                position_x_axis: 300,
                position_y_axis: 150,
                tooltip: 'Sensor 1',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 15000,
                url: 'machine/sensor/data/1'
            },
            {
                id: 2,
                label: 'Capacitor Sensor',
                position_x_axis: 370,
                position_y_axis: 200,
                tooltip: 'Sensor 1',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 6000,
                url: 'machine/sensor/data/2'
            },
            {
                id: 3,
                label: 'Resistance Sensor',
                position_x_axis: 450,
                position_y_axis: 150,
                tooltip: 'Sensor 1',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 13000,
                url: 'machine/sensor/data/3'
            }
        ]
    },
    {
        id: 2,
        data: [
            {
                id: 4,
                label: 'LCR Sensor',
                position_x_axis: 150,
                position_y_axis: 150,
                tooltip: 'Sensor 1',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 14000,
                url: 'machine/sensor/data/4'
            },
            {
                id: 5,
                label: 'Capacitor Sensor',
                position_x_axis: 400,
                position_y_axis: 260,
                tooltip: 'Sensor 2',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 40000,
                url: 'machine/sensor/data/5'
            },
            {
                id: 6,
                label: 'Resistance Sensor',
                position_x_axis: 570,
                position_y_axis: 100,
                tooltip: 'Sensor 3',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 16000,
                url: 'machine/sensor/data/6'
            },
            {
                id: 7,
                label: 'XYZ Sensor',
                position_x_axis: 250,
                position_y_axis: 150,
                tooltip: 'Sensor 4',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 24000,
                url: 'machine/sensor/data/7'
            }
        ]
    },
    {
        id: 3,
        data: [
            {
                id: 8,
                label: 'India',
                position_x_axis: 480,
                position_y_axis: 200,
                tooltip: 'Sensor 1',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 14000,
                url: 'machine/sensor/data/8'
            },
            {
                id: 9,
                label: 'Africa',
                position_x_axis: 380,
                position_y_axis: 230,
                tooltip: 'Sensor 2',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 40000,
                url: 'machine/sensor/data/9'
            },
            {
                id: 10,
                label: 'Asia',
                position_x_axis: 500,
                position_y_axis: 120,
                tooltip: 'Sensor 3',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 16000,
                url: 'machine/sensor/data/10'
            },
            {
                id: 11,
                label: 'America',
                position_x_axis: 130,
                position_y_axis: 150,
                tooltip: 'Sensor 4',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 24000,
                url: 'machine/sensor/data/11'
            },
            {
                id: 12,
                label: 'Australia',
                position_x_axis: 600,
                position_y_axis: 310,
                tooltip: 'Sensor 5',
                default_color: '#'+Math.floor(Math.random()*16777215).toString(16), 
                polling_frequency: 24000,
                url: 'machine/sensor/data/12'
            }
        ]
    }
]

var generateColor = function() {
    var colorcode = [700, 800, 900]
    var colorsName = [
        'amber',
        'red',
        'purple',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'orange',
        'brown',
        'grey'
    ]
    var random1 = Math.random() * colorcode.length
    var code = colorcode[Math.floor(random1)]
    var random2 = Math.random() * colorsName.length
    var color = colorsName[Math.floor(random2)]
    return colors[color + code]
}


export {
    temperatureGauge,
    volumeGauge,
    pressureGauge,
    machine1,
    machine2,
    machine3,
    sensor,
    generateColor
}
