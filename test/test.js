import test from 'ava';
//import DomTouchListener from "../src/DomTouchListener.js";
//import DomDispatcher from "../src/DomDispatcher.js";
import gestures from "../gestures.js";
//import FlickRecogonizer from "../src/FlickRecogonizer.js";
//import PressRecogonizer from "../src/PressRecogonizer.js";
//import DualRecogonizer from "../src/DualRecogonizer.js";

test('Event', t => {
	var event = new Event("touch");
	t.is(typeof event, "object");
});


test('Insert to DOM', t => {
	const div = document.createElement('div');
	document.body.appendChild(div);

	t.is(document.querySelector('div'), div);
	var handler = (event) =>
		console.log(event);

	//t.is(gestures, 'object');
	let {DomTouchListener, FlickRecogonizer, TapRecogonizer, PanRecogonizer, PressRecogonizer} = gestures;

	t.is(typeof TapRecogonizer, 'function');

	var recogonizers = [
		TapRecogonizer, FlickRecogonizer, PanRecogonizer, PressRecogonizer
	].map( Class => new Class(handler, 1));


	var listener = new DomTouchListener(document.body, recogonizers);
	t.is(typeof listener, 'object');

/*
	window.addEventListener("load", event => {
		new DomTouchListener(div, [ new DualRecogonizer( event => 
			document.getElementById("square").style.transform = `matrix(
				${event.transform[0][0].toFixed(3)}, ${event.transform[1][0].toFixed(3)},
				${event.transform[0][1].toFixed(3)}, ${event.transform[1][1].toFixed(3)},
				${event.transform[0][2].toFixed(3)}, ${event.transform[1][2].toFixed(3)})`)]);
	})
*/
});


