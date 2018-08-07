Date.prototype.setISO8601 = function(a) {
    var a = a.match(RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?")),
        c = 0,
        b = new Date(a[1], 0, 1);
    a[3] && b.setMonth(a[3] - 1);
    a[5] && b.setDate(a[5]);
    a[7] && b.setHours(a[7]);
    a[8] && b.setMinutes(a[8]);
    a[10] && b.setSeconds(a[10]);
    a[12] && b.setMilliseconds(Number("0." + a[12]) * 1E3);
    a[14] && (c = Number(a[16]) * 60 + Number(a[17]), c *= a[15] == "-" ? 1 : -1);
    c -= b.getTimezoneOffset();
    time = Number(b) + c * 6E4;
    this.setTime(Number(time))
};
window.GUoffScreen = function() {
    $("video").each(function() {
        this.pause()
    })
};
window.GuIpad = window.GuIpad || {};
GuIpad.Article = {
    short_months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    resized: !1,
    multiplier: 1.3,
    web_article_count: 3,
    url_base: "../../../_Static/Content/_images/",
    share_url: {
        normal: "share-30.png",
        fancy: "share-30-fancy.png"
    },
    weather_links: [{
        section: "weather",
        title: "Five day forecast",
        id: "weather-forecast"
    }, {
        section: "weather",
        title: "Summary",
        id: "summary"
    }, {
        section: "weather",
        title: "Weather report",
        id: "weather-report"
    }, {
        section: "weather",
        title: "Around the world temperatures",
        id: "around-world"
    }, {
        section: "weather",
        title: "Moon and tides",
        id: "moon-tides"
    }],
    observer_weather_links: [{
        section: "weather",
        title: "UK today",
        id: "uk-today"
    }, {
        section: "weather",
        title: "Europe today",
        id: "europe-today"
    }, {
        section: "weather",
        title: "Six day forecast",
        id: "six-day-forecast"
    }, {
        section: "weather",
        title: "Statistics",
        id: "statistics"
    }],
    weather_pkgname: "Weather",
    init: function() {
        this.ready = !0;
        this.$doc = $(".CrossRefs");
        if (this.$doc.size() === 0) return console.log("HTML has no .CrossRefs"), !1;
        this.checkFancy();
        this.checkWeather();
        this.buildCopyright();
        this.buildShare();
        this.buildWebFrame();
        this.buildWeb();
        this.buildRefs()
    },
    buildShare: function() {
        if (!this.weather) this.$body.append('<a  id="share" href="#"><img src="' + this.url_base + (this.fancy ? this.share_url.fancy : this.share_url.normal) + '" ></a>'), this.$share = $("#share"), this.$share.css({
            opacity: 0,
            display: "block"
        }), share_url = "gceshare://article/" + this.$share.offset().left + "/" + this.$share.offset().top, this.$share.attr("href", share_url)
    },
    shareLocation: function() {
        return this.$share.offset().left +
            "/" + (this.$share.offset().top + 15)
    },
    showShare: function() {
        if (!this.$share) return !1;
        this.$share.anim({
            opacity: 1
        }, 0.5)
    },
    hideShare: function() {
        if (!this.$share) return !1;
        this.$share.css("display", "none")
    },
    buildResize: function() {
        $text_size = $('<img src="' + this.url_base + (this.fancy ? this.resize_url.fancy : this.resize_url.normal) + '" id="text-size">');
        var a = this,
            c = function(c, b) {
                var e = $(b),
                    f = parseInt(e.css("font-size")),
                    e = $(b),
                    g = parseInt(e.css("line-height"));
                e.data("base-size", f);
                e.data("base-lh", g);
                e.css({
                    "font-size": f *
                        a.multiplier + "px",
                    "line-height": g * a.multiplier + "px"
                })
            },
            b = function(a, c) {
                var b = $(c);
                b.css({
                    "font-size": b.data("base-size") + "px",
                    "line-height": b.data("base-lh") + "px"
                })
            };
        $text_size.bind("click", function() {
            var d = null;
            a.resized ? (a.resized = !1, d = b) : (a.resized = !0, d = c);
            a.$doc.find("p").each(d)
        });
        this.$body.append($text_size)
    },
    checkFancy: function() {
        $('meta[name="article-meta"]')[0] ? (this.fancy = !0, this.$body.addClass("fancy")) : (this.fancy = !1, this.$body.addClass("normal"))
    },
    checkWeather: function() {
        return this.weather =
            $("#weather")[0] !== void 0
    },
    setupWeatherMetadata: function() {
        var a = $("body").hasClass("observer");
        if (!this.metadata) this.metadata = {};
        this.metadata.packageName = this.weather_pkgname;
        this.metadata.packageStories = a ? this.observer_weather_links : this.weather_links;
        this.metadata.currentId = "weather-forecast";
        this.storyUrl = function(a) {
            return "<a href='#' data-panel='" + a.id + "'>" + a.title + "</a>"
        };
        this.storyHolder = function(a) {
            return "<a href='#' data-panel='" + a.id + "'>" + a.title + "</a>"
        }
    },
    buildWeb: function(a) {
        if (!this.webdata &&
            a) this.webdata = a;
        if (!this.$weblinks) return !1;
        if (this.$weblinks.find("ol li").length > 0) return !1;
        if (!this.$body || !this.webdata) return !1;
        this.$weblinks.removeClass("empty").find("ol").append(this.webContent());
        this.$weblinks.anim({
            opacity: 1
        }, 0.5)
    },
    webContent: function() {
        data = this.webdata.slice(0, this.web_article_count);
        for (var a = 0, c = data.length; a < c; ++a) {
            var b = data[a],
                d = new Date;
            d.setISO8601(b.webPublicationDate);
            b.date = [d.getDate(), " ", this.short_months[d.getMonth()], " ", d.getFullYear()].join("");
            data[a] = ["<li><span class='date'>", b.date, "</span><p><a href='", b.webUrl, "'>", b.webTitle, "</a></p></li>"].join("")
        }
        return data.join("")
    },
    buildWebFrame: function() {
        this.$frame.append("<div class='weblinks empty'>    <h3>On the website</h3>  <ol>  </ol></div>");
        this.$weblinks = $(".weblinks")
    },
    buildRefs: function(a) {
        if (!this.metadata && a && (this.metadata = a, this.metadata.buildNumber)) this.metadata.buildNumber = parseInt(this.metadata.buildNumber);
        if (this.ready) {
            if (this.$refs && this.$refs.find("ol li").length > 0) return !1;
            if (!this.$frame || !this.metadata) return !1;
            this.functionalityByVersion();
            this.trackVideo();
            this.buildNextPrev();
            this.weather && this.setupWeatherMetadata();
            this.buildPackage()
        }
    },
    functionalityByVersion: function() {
        var a = this.metadata.buildNumber;
        (a === void 0 || a < 204) && $('a[href*="gcegallery"]').attr("href", "#").bind("click", function() {
            alert("To enable galleries please update your application")
        })
    },
    buildNextPrev: function() {
        var a = ["<ol class='next-previous'>"];
        if (this.metadata.previous) {
            var c = this.metadata.previous;
            c.name = "Previous";
            a = a.concat(this.nextPrevBuilder(c))
        }
        if (this.metadata.next) c = this.metadata.next, c.name = "Next", a = a.concat(this.nextPrevBuilder(c));
        a.push("</ol>");
        this.$frame.prepend(a.join(""))
    },
    nextPrevBuilder: function(a) {
        var c = [];
        c.push("<li class='" + a.name.toLowerCase() + "'><h3>" + a.name + "</h3>");
        c.push("<span class='count'>" + a.position + "/" + a.count + "</span>");
        c.push("<p>" + this.storyUrl(a) + "</p></li>");
        return c
    },
    buildPackage: function() {
        if (!this.metadata.packageName) return !1;
        var a = [],
            a = a.concat(this.buildPackageHeader(this.metadata.packageName)),
            a = a.concat(this.buildPackageList(this.metadata.packageStories, this.metadata.currentId));
        this.$frame.find(".next-previous").after(a.join(""));
        this.$frame.find(".package-header").anim({
            opacity: 1
        }, 0.5);
        this.$frame.find(".story-package").anim({
            opacity: 1
        }, 0.5);
        this.weather && GuIpad.Weather.init()
    },
    buildPackageHeader: function(a) {
        return "<h3 class='package-header'><span class='package-name'>" + a + "</span>More in this issue</h3>"
    },
    buildPackageList: function(a, c) {
        for (var b = ["<ol class='story-package'>"], d = 0, h =
                a.length; d < h; ++d) {
            var e = a[d],
                f = "";
            e.id === c ? (b.push("<li class='current'>"), f = this.storyHolder(e)) : (b.push("<li>"), f = this.storyUrl(e));
            if (d === 0 || e.section !== a[d - 1].section) this.weather || b.push("<span class='section'>" + e.section + "</span>");
            b.push(f);
            b.push("</li>")
        }
        b.push("</ol>");
        return b
    },
    storyUrl: function(a) {
        return "<a href='gceArticle://" + a.id + "'>" + a.title + "</a>"
    },
    storyHolder: function(a) {
        return "<p>" + a.title + "</p>"
    },
    buildRefsContent: function(a, c) {
        c = ["<div id='cross-refs' class='empty'>  <div class='title'>",
            "    <h2><span class='topic'>" + a + "</span></h2>", "    <img src='" + this.url_base + "this-issue-33x33.png'>", "  </div>  <ol>", c, "  </ol></div>"
        ].join("");
        this.$frame.prepend(c);
        this.$refs = $("#cross-refs")
    },
    buildCopyright: function() {
        if (!this.weather) this.$body.append("<div class='copyright-notice'><span>&copy; " + (new Date).getFullYear() + " Guardian News and Media Limited or its affiliated companies.<br>  All rights reserved.</span></div>"), this.$copyright = this.$body.find("div.copyright-notice"), this.$copyright.css({
            top: document.height +
                "px",
            opacity: 1
        })
    },
    trackVideo: function() {
        var a = this.metadata.currentId;
        $("video").bind("play", function() {
            try {
                var c = new XMLHttpRequest;
                c.open("GET", "gcevideoplay://" + a + "/", !0);
                c.send(null)
            } catch (b) {}
        })
    }
};
$(document).ready(function() {
    GuIpad.Article.$body = $("body");
    GuIpad.Article.$frame = $(".CrossRefs");
    GuIpad.Article.init()
});