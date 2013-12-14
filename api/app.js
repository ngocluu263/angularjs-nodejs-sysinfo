var express = require('express')
    , app = express()
    , os = require('os')
    , diskspace = require('diskspace');


app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'af5d8ltLowdfDic24aQsPrfl1ds78dkjf5szSDdzge5' }));


app.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

app.get('/sysinfos', function(req, res) {
    res.json(200, getSysInfos());
});

app.get('/diskinfos', function(req, res) {
    diskspace.check('/', function(total, free, status) {
        disk = {};
        disk.free = Math.round((free / (1024*1024*1024)) * 100) / 100;
        disk.total = Math.round((total / (1024*1024*1024)) * 100) / 100;
        disk.use = Math.round((disk.total - disk.free) * 100) / 100;
        disk.unit = "Go";

        return res.json(200, disk);
    });
});

function getSysInfos() {
    var sysinfos = {};

    sysinfos.hostname = os.hostname();
    sysinfos.osName = os.type();

    sysinfos.uptime = {};
    var uptime = os.uptime();
    sysinfos.uptime.hours = Math.floor(uptime / (60*60));
    sysinfos.uptime.minutes = Math.floor((uptime % (60*60)) / 60);
    sysinfos.uptime.seconds = Math.ceil((uptime % (60*60)) % 60);

    sysinfos.loadAvg = os.loadavg();
    sysinfos.loadAvg[0] = sysinfos.loadAvg[0].toFixed(2);
    sysinfos.loadAvg[1] = sysinfos.loadAvg[1].toFixed(2);
    sysinfos.loadAvg[2] = sysinfos.loadAvg[2].toFixed(2);

    sysinfos.memory = {};
    sysinfos.memory.free = Math.round((os.freemem() / (1024*1024)) * 100) / 100;
    sysinfos.memory.total = Math.round((os.totalmem() / (1024*1024)) * 100) / 100;
    sysinfos.memory.use = Math.round((sysinfos.memory.total - sysinfos.memory.free) * 100) / 100;
    sysinfos.memory.unit = "Mo";

    sysinfos.cpus = computeCpuInfo();    

    return sysinfos;
}

/* CPUs */
var firstCpuMeasures = getCpuInfo();

function getCpuInfo() {
    var cpus = os.cpus();
    var cpuArr = [];

    for (var i=0, len=cpus.length; i<len; i++) {
        var cpu = {};
        cpu.ticks = 0;
        cpu.idle = 0;
        cpu.model = cpus[i].model;
        cpu.speed = cpus[i].speed;

        for (timeType in cpus[i].times) {
            cpu.ticks += cpus[i].times[timeType];
        }

        cpu.idle = cpus[i].times.idle;

        cpuArr.push(cpu);
    }

    return cpuArr;
}

function computeCpuInfo() {
    currentCpuMeasures = getCpuInfo();

    for (var i=0, len=currentCpuMeasures.length; i<len; i++) {

        var idleDifference = currentCpuMeasures[i].idle - firstCpuMeasures[i].idle;
        var totalDifference = currentCpuMeasures[i].ticks - firstCpuMeasures[i].ticks;

        currentCpuMeasures[i].usage = 100 - ~~(100 * idleDifference / totalDifference);
    }

    return currentCpuMeasures;
}

console.log('[SYSDIAG] Starting... OK');
app.listen(3000);