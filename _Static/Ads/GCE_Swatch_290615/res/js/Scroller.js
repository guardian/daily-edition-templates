function Scroller( wrapper ) {
    this.wrapper = wrapper;
    this.container = this.wrapper.querySelector( '.scroll-container' );
    this.items = Array.prototype.slice.call( this.container.querySelectorAll( '.scroll-item' ) );

    this.arrowLeft = this.wrapper.querySelector( '.arrow.left' );
    this.arrowRight = this.wrapper.querySelector( '.arrow.right' );

    this.transitionDuration = 500;
    this.index = this.items.length * 5;
    this.canScroll = true;
    this.isScrolling = false;

    this.startX = 0;
    this.dx = 0;

    this.addEvents();
    this.positionItems();
    this.positionScroller( 0 );
}


Scroller.prototype.addEvents = function() {
    var self = this;

    this.arrowLeft.addEventListener( 'touchend', function( e ) {
        e.preventDefault();
        e.stopPropagation();
        self.prev( e );
    }, false );

    this.arrowRight.addEventListener( 'touchend', function( e ) {
        e.preventDefault();
        e.stopPropagation();
        self.next( e );
    }, false );

    this.container.addEventListener( 'transitionend', function() {
        self.canScroll = true;
    }, false );

    this.container.addEventListener( 'webkitTransitionEnd', function() {
        self.canScroll = true;
    }, false );


    this.container.addEventListener( 'touchstart', function( e ) {
        e.preventDefault();
        e.stopPropagation();
        self.onTouchStart( e );
    }, false );

    document.addEventListener( 'touchmove', function( e ) {
        self.onTouchMove( e );
    }, false );

    document.addEventListener( 'touchend', function( e ) {
        self.onTouchEnd( e );
    }, false );
};


Scroller.prototype.positionItems = function() {
    var index = this.index,
        items = this.items,
        numItems = items.length,
        relativeIndex = index % numItems,
        cycle = ( index / numItems ) | 0;

    for ( var i = 0; i < numItems; ++i ) {
        if (
            i === relativeIndex ||
            i === relativeIndex - 1 ||
            i === relativeIndex + 1
        ) {
            var left = ( cycle * numItems ) * 100;
            items[ i ].style.left = left + ( i * 100 ) + '%';
        }
        else if ( i === numItems - 1 && relativeIndex === 0 ) {
            var left = ( ( cycle > 0 ? cycle - 1 : cycle ) * numItems ) * 100;
            items[ i ].style.left = left + ( i * 100 ) + '%';
        }
        else if ( i === 0 && relativeIndex === numItems - 1 ) {
            continue;
        }

        else {
            items[ i ].style.left = '-100%';
        }
    }
};

Scroller.prototype.positionScroller = function( duration ) {
    var container = this.container.style,
        duration = typeof duration === 'number' ? duration : this.transitionDuration,
        transformString = 'translate3d(-' + ( this.index * 100 ) + '%, 0, 0)';


    if ( duration !== 0 ) {
        this.canScroll = false;
    }

    this.setTransitionDuration( duration );
    this.setTransform( -this.index * 100 );
};

Scroller.prototype.setTransitionDuration = function( duration ) {
    var container = this.container.style;

    container.transitionDuration =
        container.webkitTransitionDuration =
        container.MozTransitionDuration = duration + 'ms';
}

Scroller.prototype.setTransform = function( x ) {
    var container = this.container.style,
        transformString = 'translate3d(' + ( x | 0 ) + '%, 0, 0)';

    container.transform =
        container.webkitTransform =
        container.MozTransform = transformString;
};

Scroller.prototype.onTouchStart = function( e ) {
    this.startX = e.touches[ 0 ].pageX;
    this.setTransitionDuration( 0 );
    this.isScrolling = true;
};

Scroller.prototype.onTouchMove = function( e ) {
    if ( !this.isScrolling ) return;

    e.preventDefault();
    e.stopPropagation();

    var x = this.startX - e.touches[ 0 ].pageX;

    this.dx = ( x / this.wrapper.offsetWidth ) * 100;

    if ( Math.abs( this.dx ) > 100 ) {
        this.dx = this.dx < 0 ? -100 : 100;
    }

    this.setTransform( -( this.dx + ( this.index * 100 ) ) );
};

Scroller.prototype.onTouchEnd = function( e ) {
    if ( !this.isScrolling ) return;

    var self = this;

    e.preventDefault();
    e.stopPropagation();


    this.setTransitionDuration( this.transitionDuration );

    if ( Math.abs( this.dx ) > 30 ) {
        this.index += this.dx < 0 ? -1 : 1;
    }

    if ( this.index === -1 ) {
        this.index = this.items.length;
        this.positionScroller( 0 );
        this.positionItems();

        setTimeout( function() {
            --self.index;
            self.positionItems();
            self.positionScroller();
        }, 15 );
    }
    else {
        this.positionItems();
        this.positionScroller();
    }
    this.isScrolling = false;
};

Scroller.prototype.prev = function( e ) {
    var self = this;

    if ( this.canScroll === false ) {
        return;
    }

    --this.index;

    if ( this.index === -1 ) {
        this.index = this.items.length;
        this.positionScroller( 0 );
        this.positionItems();

        setTimeout( function() {
            --self.index;
            self.positionItems();
            self.positionScroller();
        }, 15 );
    }
    else {
        self.positionItems();
        self.positionScroller();
    }
};

Scroller.prototype.next = function( e ) {
    if ( this.canScroll === false ) {
        return;
    }

    ++this.index;

    this.positionItems();
    this.positionScroller();
};

Scroller.prototype.scrollTo = function( index, duration ) {
    this.index = index + ( this.items.length * 5 );

    this.positionScroller( duration );
    this.positionItems();
};