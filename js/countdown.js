(function ( $, window, document, undefined ) {
        var methods = {
            init: function( ele, options ) {
                for (var i in options) {
                    if ($(ele).css(i))
                        $(ele).css(i,options[i]);
                }
                var precision_levels = {
                    "years"     : [3, function (x, y) { return Math.floor((y-x)/(1000*60*60*24*365)); } ],
                    "days"      : [3, function (x, y) { return Math.floor((y-x)/(1000*60*60*24)%365); } ],
                    "hours"     : [2, function (x, y) { return Math.floor((y-x)/(1000*60*60)%24); } ],
                    "minutes"   : [2, function (x, y) { return Math.floor((y-x)/(1000*60)%60); } ],
                    "seconds"   : [2, function (x, y) { return Math.floor((y-x)/(1000)%60); } ],
                    "mseconds"  : [4, function (x, y) { return (y-x)%1000; } ],
                };
                $.extend(options, {"precision_levels" : precision_levels});
                this.addSpans(ele,options);
            },

            addSpans: function(ele, options) {
                for ( var t in options.precision_levels ) {
                    for ( var i=0;i<options.precision_levels[t][0];i++)
                        ele.append("<span id='"+t+""+(i+1)+"' class='"+t+"'></span>");
                    if (options.precision == t ) 
                        break;
                }
                this.initTime(ele,options)
                var that = this;
                setInterval( function(){that.refresh( ele, options );}, (options.precision=="mseconds") ? 1 : 1000 );
            },

            initFormat: function(ele, options) {
                for (var key in options.precision_levels) {
                    var string = "<span id='"+$('.'+key).last().attr('class')+"_format'>";
                    if ((options.format == "words") && ($('.'+key).last().attr('class') != null))
                        string += " "+$('.'+key).last().attr('class').split(' ')[0]+" ";
                    else if ((options.format == "colon") && (key != options.precision))
                        stirng += " : ";
                    else if ((options.format == "short") && ($('.'+key).last().attr('class') != null))
                        string += " "+$('.'+key).last().attr('class')[0]+" ";
                    else if ((options.format == "custom") && (options.custom != null))
                        string += options.custom;
                    else if (options.format == "spaces")
                        string += " ";
                    string = string+"</span>";
                    $('.'+key).last().after(string);
                }
            },

            initTime: function(ele, options) {
                ele.children().each(function () {
                    $(this).css('position','relative');
                    $(this).css('top',0);
                    var key = $(this).attr('class').split(' ')[0];
                    var diff = options.precision_levels[key][1](options.start_date.getTime(), options.end_date.getTime());
                    var len = options.precision_levels[key][0];
                    for (var i=0;i<len;i++)
                        $("#"+key+(i+1)  ).html(diff.toString()[i]);
                });

                this.initFormat(ele,options);
                this.cleanTime(ele,options);
            },

            cleanTime: function(ele,options) {
                ele.children().each(function () {
                    var time = options.end_date.getTime() - options.start_date.getTime();
                    if (time < 1000*60*60*24*365) {
                      $('.years').remove();
                      $('#years_format').remove();
                    } else if (time < 1000*60*60*24) {
                      $('.days').remove();
                      $('#days_format').remove();
                    } else if (time < 1000*60*60) {
                      $('.hours').remove();
                      $('#hours_format').remove();
                    } else if (time < 1000*60) {
                      $('.minutes').remove();
                      $('#minutes_format').remove();
                    } else if (time < 1000) {
                      $('.seconds').remove();
                      $('#seconds_format').remove();
                    }
                });
            },

            refreshTime: function(ele,options,key) {
                 $("."+key).each(function () {
                    var key = $(this).attr('class').split(' ')[0];
                    var diff = options.precision_levels[key][1](options.start_date.getTime(), options.end_date.getTime());
                    var len = options.precision_levels[key][0];
                    var dstring = diff.toString();
                    if (dstring.length==1) {
                        for (var i=0;i<len-1;i++) {
                            if ($("#"+key+(i+1)).html() != '') 
                                $("#"+key+(i+1)).html('');
                        }
                        if ($("#"+key+len).html() !=  dstring) {
                            $("#"+key+len).html(dstring);
                        }
                    } else if (diff !=0) {
                        for (var i=0;i<len;i++) {
                            if ($("#"+key+(i+1)).html() != dstring[i]) {
                                // ANIMATIONS CAN GO HERE MAYBE IDK
                                // for each animation property
                                // store original
                                // update on switch
                                
                                $("#"+key+(i+1)).html(dstring[i]);
                                if (typeof options.animations !== 'undefined') {
                                    if ( Object.keys(options.animations).length > 0) {
                                        $("#"+key+(i+1)).animate(options.animations, 200 );
                                    }
                                }
                            }
                        }
                    }
                });
                this.cleanTime(ele,options);
            },

            refresh: function(ele,options) {
                options.start_date = new Date();
                for (var i in options.precision_levels) {
                    this.refreshTime(ele,options,i);
                    if (i==options.precision)
                        break;
                }
            },

        };

        function Init(ele, settings) {
            var options = $.extend( {}, $.fn.aTime.defaults, settings);
            methods.init(ele, options);
            ele.data('aTime', settings);
        }

        $.fn['aTime'] = function (options) {
            return this.each(function () {
                Init( $( this ), options);
            });
        }

        $.fn.aTime.defaults = {
            // "width" : 500,
            "font-size" : 20,
            //"animations" : { "font-size" : 20, "opacity" : 0.5, },
            "format" : "words",
            "start_date": new Date(),
            "end_date": new Date("Monday December 15 2014"),
            "precision": 'seconds',
        };

}( jQuery ));
