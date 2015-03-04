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

var blah = [{
    text: 'Forest',
    myvalue: "frst",
    leaf: true
}, {
    text: 'Wet Forest',
    myvalue: 'ftwt',
    leaf: true
}, {
    text: 'Wet Herbaceous',
    myvalue: 'hbwt',
    leaf: true
}, {
    text: 'Open',
    myvalue: 'open',
    leaf: true
}, {
    text: 'Scrub/Shrub',
    myvalue: 'shrb',
    leaf: true
}];

console.log(habitats);

var habitats = [{
    text: 'Baseline',
    children: [{
        text: '2010',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]

    }, {
        text: '2020',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2030',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2040',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2050',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }]
}, {
    text: 'Biofuel Production A',
    children: [{
        text: '2010',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]

    }, {
        text: '2020',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2030',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2040',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2050',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }]
}, {
    text: 'Biofuel Production B',
    children: [{
        text: '2010',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]

    }, {
        text: '2020',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2030',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2040',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2050',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }]
}, {
    text: 'Biofuel Production C',
    children: [{
        text: '2010',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]

    }, {
        text: '2020',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2030',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2040',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2050',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }]
}, {
    text: 'Biofuel Production C',
    children: [{
        text: '2010',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]

    }, {
        text: '2020',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2030',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2040',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2050',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }]
}, {
    text: 'Biofuel Production E',
    children: [{
        text: '2010',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]

    }, {
        text: '2020',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2030',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2040',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }, {
        text: '2050',
        children: [{
            text: 'Forest',
            myvalue: "frst",
            leaf: true
        }, {
            text: 'Wet Forest',
            myvalue: 'ftwt',
            leaf: true
        }, {
            text: 'Wet Herbaceous',
            myvalue: 'hbwt',
            leaf: true
        }, {
            text: 'Open',
            myvalue: 'open',
            leaf: true
        }, {
            text: 'Scrub/Shrub',
            myvalue: 'shrb',
            leaf: true
        }]
    }]
}];