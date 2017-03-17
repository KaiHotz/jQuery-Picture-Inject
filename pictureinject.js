(function($){
    $.fn.pictureInject = function(settings)
    {
        var that = this;

        var config =
        {
            'foo': 'bar',
            'breakPoint':'980px'
        };

        if (settings){$.extend(config, settings);}

        that.pictureHtml = function(element)
        {
            desktop = $(element).data('file-image-desktop');
            desktop_alt = desktop.split('/');

            mobile = $(element).data('file-image-mobile');
            mobile_alt = mobile.split('/');

            html ='<picture>';
				html +='<!--[if IE 9]><video style="display: none;"><![endif]-->';
				html +='<source srcset="'+$(element).data('file-image-mobile')+'" media="(max-width:'+config.breakPoint+')" alt="'+mobile_alt[mobile_alt.length-1]+'">';
				html +='<!--[if IE 9]></video><![endif]-->';
				html +='<img srcset="'+$(element).data('file-image-desktop')+'" alt="'+desktop_alt[desktop_alt.length-1]+'">';
			html +='</picture>';

			return html;
        }

        that.init = function()
        {
            $('.bg-image').each(function(index, el)
            {
                $(this).append(that.pictureHtml(this))
            });
        }

        that.init();

        return that;
    };

    $(document).ready(function () {
        $(document).pictureInject();

        $('img').each(function() {
            if($(this).attr('srcset') == ""){
                $(this).hide();
            }
        });
    });
})(jQuery);
