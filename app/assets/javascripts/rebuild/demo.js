/*jslint browser: true, evil: false, plusplus: true, white: true, indent: 2 */
/*global moj, $, Handlebars */

moj.Modules.demo = (function() {
  "use strict";

  var //functions
      init,
      cacheEls,
      bindEvents,
      getRandomAddresses,
      joinAddress,
      pickAddress,
      manualAddressFields,
      initTemplates,
      changeTenants,
      tenantAddressRadioClick,
      jsDependClick,
      jsDisableClick,
      ntqClick,
      removeFile,
      attachMiscFile,
      addRentTableRow,
      formatNumber,
      fixThousands,
      titleChange,

      //elements
      postcodeButtons,
      manualAddressLinks,
      tenantAddressRadios,
      jsDepends,
      ntqButton,
      jsDisable,
      titleSelects,

      //vars
      currTenants = 1,

      //data
      fakeAddresses = [
        {
          street:     '2 Newburgh St',
          town:       'London',
          postcode:   'W1F 7RD'
        },
        {
          street:     '31 Sloane St',
          town:       'London',
          postcode:   'SW1X 9NR'
        },
        {
          street:     '29B High Street',
          town:       'Alness',
          postcode:   'IV17 0PT'
        },
        {
          street:     '19 Tweed Place',
          town:       'Johnstone',
          postcode:   'PA5 0PL'
        },
        {
          street:     '5 Shireland Road',
          town:       'Smethwick',
          postcode:   'B66 4RD'
        },
        {
          street:     '35A Dowanhill Road',
          town:       'London',
          postcode:   'SE6 1SU'
        },
        {
          street:     '9 New Close',
          town:       'Holmrook',
          postcode:   'CA19 1UB'
        }
      ];

  init = function() {
    initTemplates();

    cacheEls();
    bindEvents();

    $( 'html' ).addClass( $.fn.details.support ? 'details' : 'no-details' );

    $( jsDepends ).filter( ':checked' ).each( function() {
      jsDependClick( $( this ) );
    } );
    $( jsDisable ).filter( ':checked' ).each( function() {
      jsDisableClick( $( this ) );
    } );

    $( '.number' ).each( function() {
      fixThousands( $( this ) );
    } );
  };

  cacheEls = function() {
    postcodeButtons = $( '.js-find-address' );
    manualAddressLinks = $( '.js-manual-address' );
    tenantAddressRadios = $( '.options.js-tenant-address input[type="radio"]' );
    jsDepends = $( '.js-depend' );
    jsDisable = $( '.js-disable' );
    ntqButton = $( '.js-noticetoquit' );
    titleSelects = $( 'select.title' );
  };

  bindEvents = function() {
    $( postcodeButtons ).unbind( 'click' ).on( 'click', function( e ) {
      e.preventDefault();
      getRandomAddresses( $( e.target ) );
    } );

    $( manualAddressLinks ).unbind( 'click' ).on( 'click', function( e ) {
      e.preventDefault();
      manualAddressFields( $( e.target ) );
    } );

    $( tenantAddressRadios ).unbind( 'click' ).on( 'click', function( e ) {
      tenantAddressRadioClick( $( e.target ) );
    } );

    $( jsDepends ).change( function( e ) {
      jsDependClick( $( e.target ) );
    } );

    $( jsDisable ).change( function( e ) {
      jsDisableClick( $( e.target ) );
    } );

    $( titleSelects ).change( function( e ) {
      titleChange( $( this ) );
    } );

    $( '.addressDropdown' ).unbind('change').on( 'change', function( e ) {
      pickAddress( $( e.target ) );
    } );

    $( '#numtenants' ).on( 'change', function() {
      changeTenants( $( this ) );
    } );

    $( ntqButton ).on( 'click', function( e ) {
      ntqClick( $( e.target ) );
    } );

    $( document ).on( 'click', '.files li a.x', function( e ) {
      e.preventDefault();
      removeFile( $( e.target ) );
    } );

    $( '.js-unpaid-rent-attachfiles, .js-tenancyagreement-attachfiles, .js-additional-attachfiles' ).on( 'click', function( e ) {
      attachMiscFile( $( e.target ) );
    } );

    $( '.js-add-unpaid-rent-row' ).on( 'click', function( e ) {
      addRentTableRow( $( e.target ) );
    } );
  };

  getRandomAddresses = function( $el ) {
    var html,
        x;

    html = '<div class="row rel highlight"><select class="addressDropdown"><option value="">Select address...</option>';
    for( x = 0; x < fakeAddresses.length; x++ ) {
      html += '<option value="' + x + '">' + joinAddress( fakeAddresses[ x ] ) + '</option>';
    }
    html += '</select></div>';

    $el.closest( '.row' ).after( html );
    bindEvents();

    moj.Modules.effects.highlights();
  };

  joinAddress = function( address ) {
    return address.street + ', ' + address.town + ', ' + address.postcode;
  };

  pickAddress = function( $el ) {
    var address = fakeAddresses[ $el.val() ],
        $panel = $el.closest( '.sub-panel' ),
        $ddRow = $el.closest( '.row' ),
        $pcRow = $ddRow.prev(),
        $manualRow = $ddRow.next('.js-manual-address-row'),
        html;

    $pcRow.find( 'input[type="text"]' ).val( address.postcode );

    html = '<div class="row rel street highlight"><label>Street</label><textarea>' + address.street + '</textarea></div>';
    html += '<div class="row rel town highlight"><label>Town</label><input type="text" value="' + address.town + '"></div>';

    $panel.find( '.row.street, .row.town' ).remove();
    $pcRow.addClass( 'rel highlight' ).before( html );
    $ddRow.remove();
    $manualRow.remove();

    moj.Modules.effects.highlights();
  };

  manualAddressFields = function( $el ) {
    var $panel = $el.closest( '.sub-panel' ),
        $pcRow = $el.closest( '.row' ).prev(),
        html;

    html = '<div class="row rel street highlight"><label>Street</label><textarea></textarea></div>';
    html += '<div class="row rel town highlight"><label>Town</label><input type="text"></div>';

    $panel.find( '.row.street, .row.town' ).remove();
    $pcRow.addClass( 'rel' ).before( html );
    $pcRow.addClass( 'highlight' ).find( 'input[type="text"]' ).val( '' );
    $el.closest( '.row' ).remove();

    moj.Modules.effects.highlights();
  };

  changeTenants = function( $el ) {
    var tenants = $el.val(),
        x,
        source,
        template,
        context;
    if( tenants < currTenants ) {
      // remove tenants
      $( '.tenant-form' ).each( function( n ) {
        var $this = $( this );
        if( ( n + 1 ) > tenants ) {
          $this.prev( '.divider' ).remove();
          $this.remove();
        }
      } );
    } else if( tenants > currTenants ) {
      // add tenants
      for( x = parseInt( currTenants, 10 ); x < tenants; x++ ) {
        source = $( '#tenant-template' ).html();
        template = Handlebars.compile( source );
        context = { grouping: 'tenant' + ( x + 1 ), additional: true, num: x + 1 };

        $( '.tenants-wrapper' ).append( template( context ) );
      }
    }

    currTenants = tenants;

    cacheEls();
    bindEvents();
  };

  initTemplates = function() {
    var lsource,
        ltemplate,
        lcontext,
        tsource,
        ttemplate,
        tcontext;

    if( $( '.landlords-wrapper' ).length ) {
      lsource = $( '#landlord-template' ).html();
      ltemplate = Handlebars.compile( lsource );
      lcontext = { grouping: 'landlord1' };

      $( '.landlords-wrapper' ).append( ltemplate( lcontext ) );
    }

    if( $( '.tenants-wrapper' ).length ) {
      tsource = $( '#tenant-template' ).html();
      ttemplate = Handlebars.compile( tsource );
      tcontext = { grouping: 'tenant1', num: 1 };

      $( '.tenants-wrapper' ).append( ttemplate( tcontext ) );
    }
  };

  tenantAddressRadioClick = function( $el ) {
    var source,
        template,
        context,
        $fieldset = $el.closest( 'fieldset' ),
        $panel = $el.closest( '.sub-panel' );

    $panel.find( '.postcode-fragment-wrapper' ).remove();

    if( $el.closest( '.row' ).hasClass( 'js-different' ) ) {
      source = $( '#postcode-fragment' ).html();
      template = Handlebars.compile( source );
      context = { grouping: $panel .attr( 'id' ) };


      $fieldset.after( template( context ) );

      cacheEls();
      bindEvents();
    }
  };

  jsDependClick = function( $el ) {
    var groupname,
        els,
        x,
        hidename,
        showname;

    if( $el.attr( 'type' ) === 'radio' ) {
      groupname = $el.attr( 'name' );
      els = $( 'input[name="' + groupname + '"]' );

      for( x = 0; x < els.length; x++ ) {
        hidename = $( els[ x ] ).data( 'depend' );
        $( '.js-' + hidename ).hide();
      }

      showname = $el.data( 'depend' );
      $( '.js-' + showname ).show();
    } else {// checkbox
      showname = $el.data( 'depend' );
      if( $el.is( ':checked' ) ) {
        $( '.js-' + showname ).show();
      } else {
        $( '.js-' + showname ).hide();
      }
    }
  };

  jsDisableClick = function( $el ) {
    var disableName = $el.data( 'disable' );

    if( $el.is( ':checked' ) ) {
      $( '#' + disableName ).addClass( 'disabled' ).attr( 'disabled', true );
    } else {
      $( '#' + disableName ).removeClass( 'disabled' ).attr( 'disabled', false );
    }
  };

  ntqClick = function( $el ) {
    var $list = $el.closest( '.row' ).siblings( '.files' ).find( 'ul' ).eq( 0 ),
        els = $list.find( 'li' );

    if( $list.data( 'show' ) !== true ) {
      $( els[ 0 ] ).show();
      $list.data( 'show', true );
    } else {
      $( els[ 0 ] ).clone().appendTo( $list );
    }
  };

  removeFile = function( $el ) {
    var $list = $el.closest( 'ul' );
    $el.closest( 'li' ).hide();
    if( $list.find( 'li' ).length === 0 ) {
      $list.remove();
    }
  };

  attachMiscFile = function( $el ) {
    var $filesPanel = $el.closest( '.sub-panel' ).find( '.sub-panel' );

    $filesPanel.show();
    if( $filesPanel.data( 'show' ) === true ) {
      $filesPanel.find( 'li:hidden' ).eq( 0 ).show();
    } else {
      $filesPanel.data( 'show', true );
    }
  };

  addRentTableRow = function( $el ) {
    var $tablePanel = $el.closest( '.sub-panel' ).find( '.sub-panel' );

    $tablePanel.show();
    if( $tablePanel.data( 'show' ) === true ) {
      $tablePanel.find( 'tr:hidden' ).eq( 0 ).show();
    } else {
      $tablePanel.data( 'show', true );
    }
  };

  fixThousands = function( $el ) {
    var v = $el.text();
    $el.text( formatNumber( v ) );
  };

  formatNumber = function( num ) {
    var x, x1, x2, rgx;
    num += '';
    x = num.split( '.' );
    x1 = x[ 0 ];
    x2 = x.length > 1 ? '.' + x[ 1 ] : '';
    rgx = /(\d+)(\d{3})/;
    while ( rgx.test( x1 ) ) {
      x1 = x1.replace( rgx, '$1' + ',' + '$2' );
    }
    return x1 + x2;
  };

  titleChange = function( $el ) {
    var html, id;
    if( $el.val().toLowerCase() === 'other' ) {
      id = $el.attr( 'id' );
      html = '<input type="text" id="' + id + '" placeholder="Other">';
      $el.after( html ).remove();
    } else {

    }
  };

  titleChange = function( $el ) {
    console.log( $el.val() );
  };

  // public

  return {
    init: init
  };
}());
