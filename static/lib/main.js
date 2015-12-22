"use strict";



$('document').ready(function() {

	$(window).on('action:composer.loaded', function(err, data) {
		if (data.hasOwnProperty('composerData') && !data.composerData.isMain) {
			return;
		}

		var item = $('<li><a href="#" data-switch-action="post"><i class="fa fa-fw fa-ticket"></i> Reply and refresh the page to see this content.</a></li>');
		$('#cmp-uuid-' + data.post_uuid + ' .action-bar .dropdown-menu').append(item);

		item.on('click', function() {

			$(window).one('action:composer.topics.post', function(ev, data) {
				callToggleQuestion(data.data.tid);
			});
		});

	});

	function callToggleQuestion(tid) {
		socket.emit('plugins.RtoS.setRtoS', {tid: tid}, function(err, data) {
			app.alertSuccess('Topic is set as reply-to-see.');
			ajaxify.refresh();
		});
	}

});
