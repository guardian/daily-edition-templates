window.buildRefsCalled = false;

Date.prototype.setISO8601 = function(a) {
    var a = a.match(RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?")),
        b = 0,
        c = new Date(a[1], 0, 1);
    a[3] && c.setMonth(a[3] - 1), a[5] && c.setDate(a[5]), a[7] && c.setHours(a[7]), a[8] && c.setMinutes(a[8]), a[10] && c.setSeconds(a[10]), a[12] && c.setMilliseconds(1e3 * Number("0." + a[12])), a[14] && (b = 60 * Number(a[16]) + Number(a[17]), b *= "-" == a[15] ? 1 : -1), b -= c.getTimezoneOffset(), time = Number(c) + 6e4 * b, this.setTime(Number(time))
}, window.GUoffScreen = function() {
    $("video").each(function() {
        this.pause()
    })
}, window.GuIpad = window.GuIpad || {}, GuIpad.Article = {
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
        return this.ready = !0, this.$doc = $(".CrossRefs"), 0 === this.$doc.size() ? (console.log("HTML has no .CrossRefs"), !1) : (this.checkFancy(), this.checkWeather(), this.buildCopyright(), this.buildShare(), this.buildWebFrame(), this.buildWeb(), void this.buildRefs())
    },
    buildShare: function() {
    
    	// The iPad application should treat this as a normal article
    	// However we do need to swap some fancy icons in
    
    	var octFancy = document.body.getElementsByClassName("content--fancy");
    	octFancy.length > 0 ? octFancy = true : octFancy = false;
    	
        this.weather || (this.$body.prepend('<a  id="share" href="#"><img src="' + this.url_base + (octFancy ? this.share_url.fancy : this.share_url.normal) + '" ></a>'), this.$share = $("#share"), this.$share.css({
            opacity: 0,
            zIndex: 3000,
            position: 'absolute',
            top: '20px',
            right: '30px',
            display: 'block'
        }), share_url = "gceshare://article/" + this.$share.offset().left + "/" + this.$share.offset().top, this.$share.attr("href", share_url))
    },
    shareLocation: function() {
        return this.$share.offset().left + "/" + (this.$share.offset().top + 15)
    },
    showShare: function() {
        return !!this.$share && void this.$share.anim({
            opacity: 1
        }, .5)
    },
    hideShare: function() {
        return !!this.$share && void this.$share.css("display", "none")
    },
    buildResize: function() {
        $text_size = $('<img src="' + this.url_base + (this.fancy ? this.resize_url.fancy : this.resize_url.normal) + '" id="text-size">');
        var a = this,
            b = function(b, c) {
                var d = $(c),
                    e = parseInt(d.css("font-size")),
                    d = $(c),
                    f = parseInt(d.css("line-height"));
                d.data("base-size", e), d.data("base-lh", f), d.css({
                    "font-size": e * a.multiplier + "px",
                    "line-height": f * a.multiplier + "px"
                })
            },
            c = function(a, b) {
                var c = $(b);
                c.css({
                    "font-size": c.data("base-size") + "px",
                    "line-height": c.data("base-lh") + "px"
                })
            };
        $text_size.bind("click", function() {
            var d = null;
            a.resized ? (a.resized = !1, d = c) : (a.resized = !0, d = b), a.$doc.find("p").each(d)
        }), this.$body.append($text_size)
    },
    checkFancy: function() {
    	// In Octopus Digital we don't declare ourselves to the app as 'fancy' since the html is now responsive
    	this.$body.addClass("normal")
        //$('meta[name="article-meta"]')[0] ? (this.fancy = !0, this.$body.addClass("fancy")) : (this.fancy = !1, this.$body.addClass("normal"))
    },
    checkWeather: function() {
        return this.weather = void 0 !== $("#weather")[0]
    },
    setupWeatherMetadata: function() {
        var a = $("body").hasClass("observer");
        this.metadata || (this.metadata = {}), this.metadata.packageName = this.weather_pkgname, this.metadata.packageStories = a ? this.observer_weather_links : this.weather_links, this.metadata.currentId = "weather-forecast", this.storyUrl = function(a) {
            return "<a href='#' data-panel='" + a.id + "'>" + a.title + "</a>"
        }, this.storyHolder = function(a) {
            return "<a href='#' data-panel='" + a.id + "'>" + a.title + "</a>"
        }
    },
    buildWeb: function(a) {
        return !this.webdata && a && (this.webdata = a), !!this.$weblinks && (!(this.$weblinks.find("ol li").length > 0) && (!(!this.$body || !this.webdata) && (this.$weblinks.removeClass("empty").find("ol").append(this.webContent()), void this.$weblinks.anim({
            opacity: 1
        }, .5))))
    },
    webContent: function() {
        data = this.webdata.slice(0, this.web_article_count);
        for (var a = 0, b = data.length; a < b; ++a) {
            var c = data[a],
                d = new Date;
            d.setISO8601(c.webPublicationDate), c.date = [d.getDate(), " ", this.short_months[d.getMonth()], " ", d.getFullYear()].join(""), data[a] = ["<li><span class='date'>", c.date, "</span><p><a href='", c.webUrl, "'>", c.webTitle, "</a></p></li>"].join("")
        }
        return data.join("")
    },
    buildWebFrame: function() {
        this.$frame.append("<div class='weblinks empty'>    <h3>On the website</h3>  <ol>  </ol></div>"), this.$weblinks = $(".weblinks")
    },
    buildRefs: function(a) {
    	
    	if (window.buildRefsCalled){
    	return false;
    	};
    	
		if (a){
			window.buildRefsCalled = true;
		}

        if (!this.metadata && a && (this.metadata = a, this.metadata.buildNumber) && (this.metadata.buildNumber = parseInt(this.metadata.buildNumber)), this.ready) {
            if (this.$refs && this.$refs.find("ol li").length > 0) return !1;
            if (!this.$frame || !this.metadata) return !1;
            this.functionalityByVersion(), this.trackVideo(), this.buildNextPrev(), this.weather && this.setupWeatherMetadata(), this.buildPackage()
        }
    },
    functionalityByVersion: function() {
        var a = this.metadata.buildNumber;
        (void 0 === a || a < 204) && $('a[href*="gcegallery"]').attr("href", "#").bind("click", function() {
            alert("To enable galleries please update your application")
        })
    },
    buildNextPrev: function() {
        var a = ["<ol class='next-previous'>"];
        if (this.metadata.previous) {
            var b = this.metadata.previous;
            b.name = "Previous", a = a.concat(this.nextPrevBuilder(b))
        }
        this.metadata.next && (b = this.metadata.next, b.name = "Next", a = a.concat(this.nextPrevBuilder(b))), a.push("</ol>"), this.$frame.prepend(a.join(""))
    },
    nextPrevBuilder: function(a) {
        var b = [];
        return b.push("<li class='" + a.name.toLowerCase() + "'><h3>" + a.name + "</h3>"), b.push("<span class='count'>" + a.position + "/" + a.count + "</span>"), b.push("<p>" + this.storyUrl(a) + "</p></li>"), b
    },
    buildPackage: function() {
        if (!this.metadata.packageName) return !1;
        var a = [],
            a = a.concat(this.buildPackageHeader(this.metadata.packageName)),
            a = a.concat(this.buildPackageList(this.metadata.packageStories, this.metadata.currentId));
        this.$frame.find(".next-previous").after(a.join("")), this.$frame.find(".package-header").anim({
            opacity: 1
        }, .5), this.$frame.find(".story-package").anim({
            opacity: 1
        }, .5), this.weather && GuIpad.Weather.init()
    },
    buildPackageHeader: function(a) {
        return "<h3 class='package-header'><span class='package-name'>" + a + "</span>More in this issue</h3>"
    },
    buildPackageList: function(a, b) {
        for (var c = ["<ol class='story-package'>"], d = 0, e = a.length; d < e; ++d) {
            var f = a[d],
                g = "";
            f.id === b ? (c.push("<li class='current'>"), g = this.storyHolder(f)) : (c.push("<li>"), g = this.storyUrl(f)), 0 !== d && f.section === a[d - 1].section || this.weather || c.push("<span class='section'>" + f.section + "</span>"), c.push(g), c.push("</li>")
        }
        return c.push("</ol>"), c
    },
    storyUrl: function(a) {
        return "<a href='gceArticle://" + a.id + "'>" + a.title + "</a>"
    },
    storyHolder: function(a) {
        return "<p>" + a.title + "</p>"
    },
    buildRefsContent: function(a, b) {
        console.log("Build Refs Content");
        b = ["<div id='cross-refs' class='empty'>  <div class='title'>", "    <h2><span class='topic'>" + a + "</span></h2>", "    <img src='" + this.url_base + "this-issue-33x33.png'>", "  </div>  <ol>", b, "  </ol></div>"].join(""), this.$frame.prepend(b), this.$refs = $("#cross-refs")
    },
    buildCopyright: function() {
    	// In Octopus digital, we're responsive so we don't need to set the height explicitly, we'll just follow the body.
    	console.log("Build Copyright");
        this.weather || (this.$body.append("<div class='copyright-notice'><span>&copy; " + (new Date).getFullYear() + " Guardian News and Media Limited or its affiliated companies.<br>  All rights reserved.</span></div>"), this.$copyright = this.$body.find("div.copyright-notice"), this.$copyright.css({
            paddingTop:"30px",
            opacity: 1
        }))
    },
    trackVideo: function() {
        var a = this.metadata.currentId;
        $("video").bind("play", function() {
            try {
                var b = new XMLHttpRequest;
                b.open("GET", "gcevideoplay://" + a + "/", !0), b.send(null)
            } catch (a) {}
        })
    }
}, $(document).ready(function() {
    GuIpad.Article.$body = $("body"), GuIpad.Article.$frame = $(".CrossRefs"), GuIpad.Article.init()
})