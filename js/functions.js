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

var urban_tree = [{
    text: '2010',
    myvalue: "urban:10",
    leaf: true
}, {
    text: '2020',
    myvalue: 'urban:20',
    leaf: true
}, {
    text: '2030',
    myvalue: 'urban:30',
    leaf: true
}, {
    text: '2040',
    myvalue: 'urban:40',
    leaf: true
}, {
    text: '2050',
    myvalue: 'urban:50',
    leaf: true

}];

var fire_tree = [{
    text: '2010',
    myvalue: "fire:10",
    leaf: true
}, {
    text: '2020',
    myvalue: 'fire:20',
    leaf: true
}, {
    text: '2030',
    myvalue: 'fire:30',
    leaf: true
}, {
    text: '2040',
    myvalue: 'fire:40',
    leaf: true
}, {
    text: '2050',
    myvalue: 'fire:50',
    leaf: true

}];

var trans_tree = [{
    text: '2010',
    myvalue: "trans:10",
    leaf: true
}, {
    text: '2020',
    myvalue: 'trans:20',
    leaf: true
}, {
    text: '2030',
    myvalue: 'trans:30',
    leaf: true
}, {
    text: '2040',
    myvalue: 'trans:40',
    leaf: true
}, {
    text: '2050',
    myvalue: 'trans:50',
    leaf: true

}];

var habitats = [{
    text: 'Baseline',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            myvalue: "frst:10:x",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'frst:20:x',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'frst:30:x',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'frst:40:x',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'frst:50:x',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            myvalue: "ftwt:10:x",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'ftwt:20:x',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'ftwt:30:x',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'ftwt:40:x',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'ftwt:50:x',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            myvalue: "hbwt:10:x",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'hbwt:20:x',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'hbwt:30:x',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'hbwt:40:x',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'hbwt:50:x',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            myvalue: "open:10:x",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'open:20:x',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'open:30:x',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'open:40:x',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'open:50:x',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            myvalue: "shrb:10:x",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'shrb:20:x',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'shrb:30:x',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'shrb:40:x',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'shrb:50:x',
            leaf: true
        }]

    }]
}, {
    text: 'Biofuel Production A',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            myvalue: "frst:10:a",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'frst:20:a',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'frst:30:a',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'frst:40:a',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'frst:50:a',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            myvalue: "ftwt:10:a",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'ftwt:20:a',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'ftwt:30:a',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'ftwt:40:a',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'ftwt:50:a',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            myvalue: "hbwt:10:a",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'hbwt:20:a',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'hbwt:30:a',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'hbwt:40:a',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'hbwt:50:a',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            myvalue: "open:10:a",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'open:20:a',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'open:30:a',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'open:40:a',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'open:50:a',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            myvalue: "shrb:10:a",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'shrb:20:a',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'shrb:30:a',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'shrb:40:a',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'shrb:50:a',
            leaf: true
        }]

    }]
}, {
    text: 'Biofuel Production B',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            myvalue: "frst:10:b",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'frst:20:b',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'frst:30:b',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'frst:40:b',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'frst:50:b',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            myvalue: "ftwt:10:b",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'ftwt:20:b',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'ftwt:30:b',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'ftwt:40:b',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'ftwt:50:b',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            myvalue: "hbwt:10:b",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'hbwt:20:b',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'hbwt:30:b',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'hbwt:40:b',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'hbwt:50:b',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            myvalue: "open:10:b",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'open:20:b',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'open:30:b',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'open:40:b',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'open:50:b',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            myvalue: "shrb:10:b",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'shrb:20:b',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'shrb:30:b',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'shrb:40:b',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'shrb:50:b',
            leaf: true
        }]

    }]
}, {
    text: 'Biofuel Production C',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            myvalue: "frst:10:c",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'frst:20:c',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'frst:30:c',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'frst:40:c',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'frst:50:c',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            myvalue: "ftwt:10:c",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'ftwt:20:c',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'ftwt:30:c',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'ftwt:40:c',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'ftwt:50:c',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            myvalue: "hbwt:10:c",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'hbwt:20:c',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'hbwt:30:c',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'hbwt:40:c',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'hbwt:50:c',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            myvalue: "open:10:c",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'open:20:c',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'open:30:c',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'open:40:c',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'open:50:c',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            myvalue: "shrb:10:c",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'shrb:20:c',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'shrb:30:c',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'shrb:40:c',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'shrb:50:c',
            leaf: true
        }]

    }]
}, {
    text: 'Biofuel Production D',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            myvalue: "frst:10:d",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'frst:20:d',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'frst:30:d',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'frst:40:d',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'frst:50:d',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            myvalue: "ftwt:10:d",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'ftwt:20:d',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'ftwt:30:d',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'ftwt:40:d',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'ftwt:50:d',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            myvalue: "hbwt:10:d",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'hbwt:20:d',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'hbwt:30:d',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'hbwt:40:d',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'hbwt:50:d',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            myvalue: "open:10:d",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'open:20:d',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'open:30:d',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'open:40:d',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'open:50:d',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            myvalue: "shrb:10:d",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'shrb:20:d',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'shrb:30:d',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'shrb:40:d',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'shrb:50:d',
            leaf: true
        }]

    }]
}, {
    text: 'Biofuel Production E',
    children: [{
        text: 'Forest',
        children: [{
            text: '2010',
            myvalue: "frst:10:e",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'frst:20:e',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'frst:30:e',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'frst:40:e',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'frst:50:e',
            leaf: true
        }]

    }, {
        text: 'Wet Forest',
        children: [{
            text: '2010',
            myvalue: "ftwt:10:e",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'ftwt:20:e',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'ftwt:30:e',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'ftwt:40:e',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'ftwt:50:e',
            leaf: true
        }]

    }, {
        text: 'Wet Herbaceous',
        children: [{
            text: '2010',
            myvalue: "hbwt:10:e",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'hbwt:20:e',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'hbwt:30:e',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'hbwt:40:e',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'hbwt:50:e',
            leaf: true
        }]

    }, {
        text: 'Open',
        children: [{
            text: '2010',
            myvalue: "open:10:e",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'open:20:e',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'open:30:e',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'open:40:e',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'open:50:e',
            leaf: true
        }]

    }, {
        text: 'Scrub/Shrub',
        children: [{
            text: '2010',
            myvalue: "shrb:10:e",
            leaf: true
        }, {
            text: '2020',
            myvalue: 'shrb:20:e',
            leaf: true
        }, {
            text: '2030',
            myvalue: 'shrb:30:e',
            leaf: true
        }, {
            text: '2040',
            myvalue: 'shrb:40:e',
            leaf: true
        }, {
            text: '2050',
            myvalue: 'shrb:50:e',
            leaf: true
        }]

    }]
}];