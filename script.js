$(document).ready(function(){                                       

	$('body').prepend("<div id='responsive-link-button' style='background-color: rgba(255,255,255,.5); border: 1px solid #000; padding: 10px; z-index: 9999;'>x</div>");

	$('#responsive-link-button').hover(function(){
		$(this).css('cursor','pointer');
	});

	// window.localStorage.setItem('responsiveLinks', 0);

	
	var rewriteLinks = function(){
		if(parseInt(window.localStorage.getItem('responsiveLinks'), 10) === 1){
			var articles = $("a[href*='wsj.com/article']");

			$("a[href*='wsj.com/article']").each(function(index, item) { 
				this.href = this.href.replace(/^http:\/\/online\.wsj\.com\/article\//, 
				"http://online.wsj.com/news/articles/");

				this.href = this.href.replace('.html', '');
			});

			$("a[href*='/article/']").each(function(index, item) { 
				this.href = this.href.replace(/\/article\//, 
				"/news/articles/");

				this.href = this.href.replace('.html', '');
			});

			console.log('rewrite links on');

			$('#responsive-link-button').html('Turn off responsive links');		
		}

		else if(parseInt(window.localStorage.getItem('responsiveLinks'), 10) === 0){

			$("a[href*='wsj.com/news/articles/']").each(function(index, item) { 
				this.href = this.href.replace('http://online.wsj.com/news/articles/', 
				"http://online.wsj.com/article/");

				this.href = this.href.replace('?mod', '.html?mod');
				this.href = this.href.replace('.html.html?mod', '.html?mod');
			});

			$("a[href*='/article/']").each(function(index, item) { 
				this.href = this.href.replace('/news/articles/', 
				"/article/");

				this.href = this.href.replace('?mod', '.html?mod');
				this.href = this.href.replace('.html.html?mod', '.html?mod');
			});

			$('#responsive-link-button').html('Turn on responsive links');

			console.log('rewrite links off');
		}
	};



	$('#responsive-link-button').click(function(){
		//console.log('click');
		window.localStorage.setItem('clicks', parseInt(window.localStorage.getItem('clicks') || 0, 10) + 1);
		var responsiveLinksToggle =  parseInt(window.localStorage.getItem('responsiveLinks'), 10);
		console.log(responsiveLinksToggle);
		if(responsiveLinksToggle === 1){
			window.localStorage.setItem('responsiveLinks', parseInt(0, 10));
			responsiveLinksToggle = parseInt(window.localStorage.getItem('responsiveLinks'), 10);
			console.log(responsiveLinksToggle);
			rewriteLinks();
		}
		else if(responsiveLinksToggle === 0){
			window.localStorage.setItem('responsiveLinks', parseInt(1, 10));
			responsiveLinksToggle = parseInt(window.localStorage.getItem('responsiveLinks'), 10);
			console.log(responsiveLinksToggle);
			rewriteLinks();
		}
		/*
		if (window.localStorage.getItem('responsiveLinks') === 0 || '0'){
			window.localStorage.setItem('responsiveLinks', parseInt(1, 10));
			console.log('rewrite links activated');
		}
		else if (window.localStorage.getItem('responsiveLinks') === 1 || '1'){
			window.localStorage.setItem('responsiveLinks', parseInt(0, 10));
			console.log('rewrite links deactivated');
		};
		*/
	});

	rewriteLinks();

});