// JavaScript Document

var addNote = {
	
	init: function() {
		
		addNote.div = $('recNotes');
		addNote.notes = $('notes');
		addNote.submit = $('submit');
		addNote.print = $('printBtn');
		addNote.tracker = 1;
		Core.addEventListener(addNote.submit, 'click', addNote.createNote);
		Core.addEventListener(addNote.print, 'click', function() { window.print(); });
	},
	
	createNote: function() {
		
		if(addNote.notes.value == '') return;
		var note = addNote.tracker + '- ' + addNote.notes.value;
		var text = document.createTextNode(note);
		var p = document.createElement('p');
		p.appendChild(text);
		addNote.div.appendChild(p);
		addNote.notes.value = '';
		addNote.tracker++;
	}
	
	
}

Core.start(addNote);