var app = app || {};

app.elements = {
    intro: {},
    explore: {}
};

app.scroller = null;
app.scrollerTimer = null;
app.watchTimer = null;

app.init = function() {
    app.setElements();
    app.onResize();
    app.makeScroller();
    app.addEvents();

    setTimeout( app.showIntro, 500 );
};


app.makeScroller = function() {
    app.scroller = new Scroller( document.querySelector( '.scroll-wrapper' ) );
};

app.setElements = function() {
    app.elements.intro.watch = document.querySelector( '.main > .watch' );
    app.elements.intro.copy = document.querySelector( '.main > .copy' );
    app.elements.intro.logo = document.querySelector( '.main > .logo' );

    app.elements.explore.page = document.querySelector( '.explore' );
    app.elements.explore.title = document.querySelector( '.explore > .title' );
    app.elements.explore.watchContainer = document.querySelector( '.explore > .watch-container' );
    app.elements.explore.scrollWrapper = document.querySelector( '.explore > .scroll-wrapper' );
    app.elements.explore.hotspots = Array.prototype.slice.call(
        app.elements.explore.watchContainer.querySelectorAll( '.hotspot' )
    );
    app.elements.explore.exploreWatch = document.querySelector( '.explore .explore-watch' );
};

app.addEvents = function() {
    var hotspots = app.elements.explore.hotspots;

    for ( var i = 0; i < hotspots.length; ++i ) {
        hotspots[ i ].addEventListener( 'click', ( function( index ) {
            return function( e ) {
                app.showScroller();
                app.scroller.scrollTo( index, 0 );
            };
        }( i ) ), false );
    }


    app.elements.explore.exploreWatch.addEventListener( 'touchend', app.hideScroller, false );

    document.querySelector( '.explore-watch' ).addEventListener( 'touchend', app.showExplore, false );
    document.querySelector( '.watch-video' ).addEventListener( 'touchend', app.doVideo, false );

    document.querySelector( '.explore > .back-button' ).addEventListener( 'touchend', app.hideExplore, false );

    document.querySelector( '.rado-tennis' ).addEventListener( 'touchend', function( e ) {
        window.open( 'http://tennis.rado.com/', '_blank' );
    }, false );

    document.querySelector( '.store-locator' ).addEventListener( 'touchend', function( e ) {
        window.open( 'http://www.rado.com/en/watch-shop.html#!-gb', '_blank' );
    }, false );


    document.addEventListener( "fullscreenchange", app.videoChangeHandler, false );
    document.addEventListener( "webkitfullscreenchange", app.videoChangeHandler, false );
};

app.onResize = function() {
    var watchContainer = app.elements.explore.watchContainer,
        watchContainerHeight = window.innerHeight * 0.6,
        watchContainerRatio = 349 / 549,
        watchContainerWidth = watchContainerHeight * watchContainerRatio;

    if ( watchContainerWidth > window.innerWidth ) {
        watchContainerWidth = window.innerWidth;
        watchContainerHeight = watchContainerWidth / watchContainerRatio;
    }

    watchContainer.style.width = watchContainerWidth + 'px';
    watchContainer.style.height = watchContainerHeight + 'px';
};

app.exploreTimer = null;
app.showExplore = function() {
    var explore = app.elements.explore.page.style;

    clearTimeout( app.exploreTimer );

    explore.display = 'block';

    app.exploreTimer = setTimeout( function() {
        explore.opacity = 1;
    }, 15 );
};

app.hideExplore = function() {
    var explore = app.elements.explore.page.style;

    clearTimeout( app.exploreTimer );

    explore.opacity = 0;

    app.exploreTimer = setTimeout( function() {
        explore.display = 'none';
    }, 350 );
};


app.showScroller = function() {
    var wrapper = app.elements.explore.scrollWrapper,
        watchContainer = app.elements.explore.watchContainer;

    clearTimeout( app.scrollerTimer );
    clearTimeout( app.watchTimer );

    watchContainer.style.opacity = 0;
    app.elements.explore.title.style.opacity = 0;

    app.watchTimer = setTimeout( function() {
        wrapper.style.display = 'block';

        app.scrollerTimer = setTimeout( function() {
            wrapper.style.opacity = 1;
        }, 15 );
    }, 350 );
};

app.hideScroller = function() {
    var wrapper = app.elements.explore.scrollWrapper,
        watchContainer = app.elements.explore.watchContainer;

    clearTimeout( app.scrollerTimer );
    clearTimeout( app.watchTimer );

    wrapper.style.opacity = 0;

    app.scrollerTimer = setTimeout( function() {
        wrapper.style.display = 'none';

        watchContainer.style.opacity = 1;
    }, 350 );
};

app.showIntro = function() {
    var el;

    for ( var elementName in app.elements.intro ) {
        el = app.elements.intro[ elementName ].style;

        el.transform = el.webkitTransform = el.MozTransform = 'translate3d(0, 0, 0)';
        el.opacity = 1;
    }
};


app.doVideo = function() {
    var vid = document.querySelector( 'video' );

    if ( !navigator.onLine ) {
        alert( 'Sorry, you need a network connection to watch this video.' );
        return;
    }

    vid.play();

    var fs =
        vid.requestFullscreen ||
        vid.webkitRequestFullscreen ||
        vid.msRequestFullscreen ||
        vid.MozRequestFullscreen ||
        vid.ORequestFullscreen ||
        vid.enterFullscreen ||
        vid.webkitEnterFullscreen ||
        vid.msEnterFullscreen ||
        vid.MozEnterFullscreen ||
        vid.OEnterFullscreen;

    if ( typeof fs === 'function' ) {
        try {
            fs.call( vid );
        }
        catch ( e ) {
            vid.width = window.innerWidth;
            vid.height = window.innerHeight;
        }
    }
};

app.videoChangeHandler = function() {
    var fs = document.webkitIsFullScreen;

    if ( !fs ) {
        document.querySelector( 'video' ).pause();
    }
};

window.addEventListener( 'resize', app.onResize, false );
window.addEventListener( 'orientationchange', app.onResize, false );

app.init();