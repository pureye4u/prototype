
var selectedPanelIndex = 0;
var panelContentInitializer = [
	// CK Editor
	function() {
		CKEDITOR.replace('editorAreaCK');
	},
	// Tiny MCE
	function() {
		tinymce.init({
			selector: '#editorAreaTinyMCE',
			inline: true
		});
	},
	// Naver Smart Editor
	function() {
		var oEditors = [];
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "editorAreaSmartEditor",
			sSkinURI: "SmartEditor2Skin.html",
			fCreator: "createSEditor2"
		});
	},
	// CL Editor
	function() {
		$("#editorAreaCLEditor").cleditor();
	},
	// Froala Editor
	function() {
		$('#editorAreaFroala').froalaEditor();
	},
	// Redactor Editor
	function() {
		$('#editorAreaRedactor').redactor();
	},
	// Summernote Editor
	function() {
		$('#editorAreaSummernote').summernote();
	},
	// Alloy Editor
	function() {
		AlloyEditor.editable('editorAreaAlloy');
	},
	// Trumbowyg
	function() {
		$('#editorArreaTrumbowyg').trumbowyg({
			fullscreenable: false,
			closable: true,
			btns: ['bold', 'italic', '|', 'insertImage']
		});
	},
	// Nic Edit
	function() {
		new nicEditor({fullPanel : true}).panelInstance('editorAreaNic');
	},
	// Textbox
	function() {
		var editor = textboxio.replace('#editorAreaTextbox');
	},
	// Kendo
	function() {
		$("#editorAreaKendo").kendoEditor({ resizable: {
			content: true,
			toolbar: true
		}});
	},
	// Content tools
	function() {
		var editor;
		editor = ContentTools.EditorApp.get();
		editor.init('*[data-editable]', 'data-name');
		editor.bind('save', function (regions) {
			this.busy(true);
			
			setTimeout(function(){
				editor.busy(false);
				new ContentTools.FlashUI('ok');
			}, 1000);
		});
	},
	// SC Editor
	function() {
		$("#editorAreaSC").sceditor({
			plugins: "bbcode",
			style: "http://www.sceditor.com/minified/jquery.sceditor.default.min.css"
		});
	}
];
$(function(){
	var selectPanel = function(el) {
		var panels = $(".panel > .panel-item");
		var l = panels.length;
		if(!l) {
			return;
		}
		
		selectedPanelIndex = panels.index(el);
		for(var i = 0; i < l; i++) {
			var panel = $(panels[i]);
			
			if(i == selectedPanelIndex) {
				if(!panel.hasClass("selected")) {
					panel.addClass("selected");
					if(!panel.prop("initialized") && i < panelContentInitializer.length) {
						panelContentInitializer[i].call();
					}
					continue;
				}
			}
			panel.removeClass("selected");
			// Exception for content tools fixed menu
			if(i == 12) {
				if(panel.hasClass("selected")) {
					$(".ct-app").fadeIn();
				} else {
					$(".ct-app").fadeOut();
				}
			}
		}
	};
	
	var panelHeaders = $(".panel-heading");
	panelHeaders.click(function(){
		selectPanel(this.parentElement);
	});
	
	selectPanel(panelHeaders[0].parentElement);
});