$(document).ready(function(){
	$('[data-toggle=summernote]').addClass('summernote');
	tinymce.init({
		selector: '.summernote',
		browser_spellcheck: true,
		language: tinymce_language,
		theme: 'modern',
		menubar: 'edit insert view format table tools',
		fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 36px",
		plugins: [
			'advlist autolink lists link image charmap preview hr anchor pagebreak',
			'searchreplace wordcount visualblocks visualchars code fullscreen',
			'insertdatetime media nonbreaking save table contextmenu directionality',
			'template paste textcolor colorpicker textpattern imagetools codesample codemirror'
		],
		toolbar1: 'undo redo | styleselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | image2',
		height: 200,
		toolbar2: 'preview media | forecolor backcolor | sizeselect | bold italic | fontselect |  fontsizeselect | codesample',
		image_advtab: true,
		codemirror: {
			indentOnInit: true, // Whether or not to indent code on init.
			fullscreen: false,  
			path: 'CodeMirror', // Path to CodeMirror distribution
			config: {           // CodeMirror config object
				mode: 'application/x-httpd-php',
				lineNumbers: true,
				width:600,
				height:300,
			theme: 'erlang-dark'
			},
			cssFiles: [
				'theme/erlang-dark.css'
			],
			jsFiles: [          // Additional JS files to load
				'mode/clike/clike.js',
				'mode/php/php.js'
			]
		},		
		setup: function (editor) {
			editor.addButton('image2', {
				text: 'Image',
				icon: 'image',
				onclick: function () {
					$('#modal-image').remove();
					$.ajax({
						url: 'index.php?route=common/filemanager&user_token=' + getURLVar('user_token'),
						dataType: 'html',
						beforeSend: function() {
							$('#button-image i').replaceWith('<i class="fa fa-circle-o-notch fa-spin"></i>');
							$('#button-image').prop('disabled', true);
						},
						complete: function() {
							$('#button-image i').replaceWith('<i class="fa fa-upload"></i>');
							$('#button-image').prop('disabled', false);
						},
						success: function(html) {
							$('body').append('<div id="modal-image" class="modal">' + html + '</div>');
							$('#modal-image').modal('show');
							$('#modal-image').delegate('a.thumbnail', 'click', function(e) {
								e.preventDefault();
								editor.insertContent('<img alt="Imagem" src="' + $(this).attr('href') + '" />');
								$('#modal-image').modal('hide');
							});
						}
					});			
				}
			});
		}
	});
});
