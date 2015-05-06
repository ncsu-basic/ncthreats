// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



// console.log(habitats);

var slr_up = [{
    text: '2000-2010',
    qtip: 'view data',
    myvalue: "slr_up:10",
    leaf: true
}, {
    text: '2000-2020',
    qtip: 'view data',
    myvalue: 'slr_up:20',
    leaf: true
}, {
    text: '2000-2030',
    qtip: 'view data',
    myvalue: 'slr_up:30',
    leaf: true
}, {
    text: '2000-2040',
    qtip: 'view data',
    myvalue: 'slr_up:40',
    leaf: true
}, {
    text: '2000-2050',
    qtip: 'view data',
    myvalue: 'slr_up:50',
    leaf: true

}];

var slr_lc = [{
    text: '2000-2010',
    qtip: 'view data',
    myvalue: "slr_lc:10",
    leaf: true
}, {
    text: '2000-2020',
    qtip: 'view data',
    myvalue: 'slr_lc:20',
    leaf: true
}, {
    text: '2000-2030',
    qtip: 'view data',
    myvalue: 'slr_lc:30',
    leaf: true
}, {
    text: '2000-2040',
    qtip: 'view data',
    myvalue: 'slr_lc:40',
    leaf: true
}, {
    text: '2000-2050',
    qtip: 'view data',
    myvalue: 'slr_lc:50',
    leaf: true

}];

var urban_tree = [{
    text: '2010',
    qtip: 'view data',
    myvalue: "urban:10",
    leaf: true
}, {
    text: '2020',
    qtip: 'view data',
    myvalue: 'urban:20',
    leaf: true
}, {
    text: '2030',
    qtip: 'view data',
    myvalue: 'urban:30',
    leaf: true
}, {
    text: '2040',
    qtip: 'view data',
    myvalue: 'urban:40',
    leaf: true
}, {
    text: '2050',
    qtip: 'view data',
    myvalue: 'urban:50',
    leaf: true

}];

var fire_tree = [{
    text: '2010',
    qtip: 'view data',
    myvalue: "fire:10",
    leaf: true
}, {
    text: '2020',
    qtip: 'view data',
    myvalue: 'fire:20',
    leaf: true
}, {
    text: '2030',
    qtip: 'view data',
    myvalue: 'fire:30',
    leaf: true
}, {
    text: '2040',
    qtip: 'view data',
    myvalue: 'fire:40',
    leaf: true
}, {
    text: '2050',
    qtip: 'view data',
    myvalue: 'fire:50',
    leaf: true

}];

var trans_tree = [{
    text: '2010 Divided Highways',
    qtip: 'view data',
    myvalue: "trans:10",
    leaf: true
}, {
    text: '2020 Divided Highways',
    qtip: 'view data',
    myvalue: 'trans:20',
    leaf: true
}, {
    text: '2030 Divided Highways',
    qtip: 'view data',
    myvalue: 'trans:30',
    leaf: true
}, {
    text: '2040 Divided Highways',
    qtip: 'view data',
    myvalue: 'trans:40',
    leaf: true
}, {
    text: '2050 Divided Highways',
    qtip: 'view data',
    myvalue: 'trans:50',
    leaf: true

}];

var habitats = [{
    text: 'No Bioenergy Production',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "frst:10:x",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'frst:20:x',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'frst:30:x',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'frst:40:x',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'frst:50:x',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "ftwt:10:x",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'ftwt:20:x',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'ftwt:30:x',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'ftwt:40:x',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'ftwt:50:x',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "hbwt:10:x",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'hbwt:20:x',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'hbwt:30:x',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'hbwt:40:x',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'hbwt:50:x',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "open:10:x",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'open:20:x',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'open:30:x',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'open:40:x',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'open:50:x',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "shrb:10:x",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'shrb:20:x',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'shrb:30:x',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'shrb:40:x',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'shrb:50:x',
            leaf: true
        }]

    }]
}, {
    text: 'Conventional Bioenergy',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "frst:10:a",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'frst:20:a',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'frst:30:a',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'frst:40:a',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'frst:50:a',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "ftwt:10:a",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'ftwt:20:a',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'ftwt:30:a',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'ftwt:40:a',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'ftwt:50:a',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "hbwt:10:a",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'hbwt:20:a',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'hbwt:30:a',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'hbwt:40:a',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'hbwt:50:a',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "open:10:a",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'open:20:a',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'open:30:a',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'open:40:a',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'open:50:a',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "shrb:10:a",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'shrb:20:a',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'shrb:30:a',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'shrb:40:a',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'shrb:50:a',
            leaf: true
        }]

    }]
}, {
    text: 'Conv. + Marginal Agriculture',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "frst:10:b",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'frst:20:b',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'frst:30:b',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'frst:40:b',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'frst:50:b',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "ftwt:10:b",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'ftwt:20:b',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'ftwt:30:b',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'ftwt:40:b',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'ftwt:50:b',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "hbwt:10:b",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'hbwt:20:b',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'hbwt:30:b',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'hbwt:40:b',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'hbwt:50:b',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "open:10:b",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'open:20:b',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'open:30:b',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'open:40:b',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'open:50:b',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "shrb:10:b",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'shrb:20:b',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'shrb:30:b',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'shrb:40:b',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'shrb:50:b',
            leaf: true
        }]

    }]
}, {
    text: 'Conv. + Marg. Agri. & Forests',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "frst:10:c",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'frst:20:c',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'frst:30:c',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'frst:40:c',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'frst:50:c',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "ftwt:10:c",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'ftwt:20:c',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'ftwt:30:c',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'ftwt:40:c',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'ftwt:50:c',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "hbwt:10:c",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'hbwt:20:c',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'hbwt:30:c',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'hbwt:40:c',
            leaf: true
        }, {
            text: '2050',
            mqtip: 'view data',
            yvalue: 'hbwt:50:c',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "open:10:c",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'open:20:c',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'open:30:c',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'open:40:c',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'open:50:c',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "shrb:10:c",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'shrb:20:c',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'shrb:30:c',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'shrb:40:c',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'shrb:50:c',
            leaf: true
        }]

    }]
}, {
    text: 'Marginal Agriculture Only',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "frst:10:d",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'frst:20:d',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'frst:30:d',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'frst:40:d',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'frst:50:d',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "ftwt:10:d",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'ftwt:20:d',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'ftwt:30:d',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'ftwt:40:d',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'ftwt:50:d',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "hbwt:10:d",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'hbwt:20:d',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'hbwt:30:d',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'hbwt:40:d',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'hbwt:50:d',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "open:10:d",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'open:20:d',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'open:30:d',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'open:40:d',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'open:50:d',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "shrb:10:d",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'shrb:20:d',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'shrb:30:d',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'shrb:40:d',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'shrb:50:d',
            leaf: true
        }]

    }]
}, {
    text: 'Marginal Agri. & Forests Only',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "frst:10:e",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'frst:20:e',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'frst:30:e',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'frst:40:e',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'frst:50:e',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "ftwt:10:e",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'ftwt:20:e',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'ftwt:30:e',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'ftwt:40:e',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'ftwt:50:e',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "hbwt:10:e",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'hbwt:20:e',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'hbwt:30:e',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'hbwt:40:e',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'hbwt:50:e',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "open:10:e",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'open:20:e',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'open:30:e',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'open:40:e',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'open:50:e',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            qtip: 'view data',
            myvalue: "shrb:10:e",
            leaf: true
        }, {
            text: '2020',
            qtip: 'view data',
            myvalue: 'shrb:20:e',
            leaf: true
        }, {
            text: '2030',
            qtip: 'view data',
            myvalue: 'shrb:30:e',
            leaf: true
        }, {
            text: '2040',
            qtip: 'view data',
            myvalue: 'shrb:40:e',
            leaf: true
        }, {
            text: '2050',
            qtip: 'view data',
            myvalue: 'shrb:50:e',
            leaf: true
        }]

    }]
}];
