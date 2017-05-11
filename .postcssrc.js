// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        // to edit target browsers: use "browserlist" field in package.json
        "autoprefixer": {
            "browsers": [
                "> 0.1%",
                "not ie<100",
                "not ie_mob<100",
                "not edge<100",
                "not firefox<100",
                "not opera<100"
            ]
        },
        "postcss-px2rem": {
            baseDpr: 2,             // base device pixel ratio (default: 2)
            threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
            remVersion: true,       // whether to generate rem version (default: true)
            remUnit: 10,            // rem unit value (default: 75)>0.1%,not ie<100,not edge<100,not firefox<100,not opera<100
            remPrecision: 6         // rem precision (default: 6){browsers: ['last 2 versions']}
        },
        "cssnano": {
            safe: true
        }
    }
}
